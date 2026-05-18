"use client";

import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { IMAGES } from "../constant/theme";

type AppointmentModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function AppointmentModal({
  show,
  onClose,
}: AppointmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);
    const payload = {
      dzName: formData.get("dzName")?.toString().trim(),
      dzEmail: formData.get("dzEmail")?.toString().trim(),
      dzPhoneNumber: formData.get("dzPhoneNumber")?.toString().trim(),
      dzService: "Đặt lịch khám", // Standard default value for backend validator
      dzMessage: formData.get("dzMessage")?.toString().trim(),
    };

    // Custom validation check
    const newErrors: Record<string, string> = {};

    // 1. Họ và tên (Bắt buộc, Giới hạn 100 ký tự)
    if (!payload.dzName) {
      newErrors.dzName = "Vui lòng nhập họ và tên.";
    } else if (payload.dzName.length < 3) {
      newErrors.dzName = "Họ và tên phải có ít nhất 3 ký tự.";
    } else if (payload.dzName.length > 100) {
      newErrors.dzName = "Họ và tên không được vượt quá 100 ký tự.";
    }

    // 2. Số điện thoại (Bắt buộc, Giới hạn 10 hoặc 11 số)
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8,9}$/;
    if (!payload.dzPhoneNumber) {
      newErrors.dzPhoneNumber = "Vui lòng nhập số điện thoại.";
    } else if (
      payload.dzPhoneNumber.length < 10 ||
      payload.dzPhoneNumber.length > 11
    ) {
      newErrors.dzPhoneNumber = "Số điện thoại không hợp lệ.";
    } else if (!phoneRegex.test(payload.dzPhoneNumber)) {
      newErrors.dzPhoneNumber = "Số điện thoại không đúng định dạng Việt Nam.";
    }

    // 3. Email (Bắt buộc, Giới hạn 100 ký tự)
    if (!payload.dzEmail) {
      newErrors.dzEmail = "Vui lòng nhập địa chỉ email.";
    } else if (payload.dzEmail.length > 100) {
      newErrors.dzEmail = "Email không được vượt quá 100 ký tự.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.dzEmail)) {
        newErrors.dzEmail = "Địa chỉ email không hợp lệ.";
      }
    }

    // 4. Nội dung tin nhắn (Bắt buộc, Giới hạn 300 ký tự)
    if (!payload.dzMessage) {
      newErrors.dzMessage =
        "Vui lòng nhập nội dung triệu chứng hoặc yêu cầu tư vấn.";
    } else if (payload.dzMessage.length < 5) {
      newErrors.dzMessage =
        "Nội dung triệu chứng hoặc yêu cầu tư vấn quá ngắn.";
    } else if (payload.dzMessage.length > 300) {
      newErrors.dzMessage = "Nội dung không được vượt quá 300 ký tự.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const apiBaseUrl =
      (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
        /^https?:\/\//,
        (match) => match + "api.",
      ) || "http://api.localhost:8000";

    try {
      const response = await fetch(`${apiBaseUrl}/appointments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Đăng ký đặt lịch hẹn thành công!");
        formRef.current?.reset();
        setErrors({});
        onClose();
      } else if (response.status === 422 && result.errors) {
        const backendErrors: Record<string, string> = {};
        Object.keys(result.errors).forEach((key) => {
          if (result.errors[key] && result.errors[key].length > 0) {
            backendErrors[key] = result.errors[key][0];
          }
        });
        setErrors(backendErrors);
      } else {
        toast.error(result.message || "Không thể gửi dữ liệu.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px" }}
      >
        <div
          className="modal-content border-0 form-wrapper style-1 text-vr-wrapper"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            background: "transparent",
            boxShadow: "none",
          }}
        >
          {/* Vertical Side Title */}
          <div
            className="text-vertical"
            style={{ color: "#ffffff", opacity: 0.9 }}
          >
            ĐẶT LỊCH KHÁM
          </div>

          {/* Main Form Body */}
          <div
            className="form-body bg-primary background-blend-burn p-4 p-sm-5 position-relative text-start"
            style={{
              backgroundImage: `url(${IMAGES.bg2png.src})`,
              backgroundSize: "cover",
              borderRadius: "20px",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="btn-close btn-close-white position-absolute"
              style={{
                top: "25px",
                right: "25px",
                fontSize: "16px",
                zIndex: 10,
              }}
              aria-label="Close"
            ></button>

            <div className="title-head m-b30">
              <h2
                className="form-title m-b0 text-white"
                style={{ fontSize: "28px" }}
              >
                Đăng Ký Lịch Hẹn
              </h2>
              <p className="text-white mb-0 opacity-75 small mt-2">
                Điền thông tin bên dưới để bác sĩ liên hệ hỗ trợ bạn sớm nhất{" "}
                <span style={{ color: "#000" }}>(* là bắt buộc nhập)</span>
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="dzForm">
              <div className="row">
                <div className="col-sm-12 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzName"
                      type="text"
                      className="form-control text-white"
                      id="modalInputYourName"
                      placeholder="Họ và tên *"
                      maxLength={100}
                      onChange={() => {
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.dzName;
                          return updated;
                        });
                      }}
                      style={
                        errors.dzName
                          ? { borderColor: "#930000", color: "#930000" }
                          : undefined
                      }
                    />
                    <label
                      htmlFor="modalInputYourName"
                      style={errors.dzName ? { color: "#930000" } : undefined}
                    >
                      Họ và tên *
                    </label>
                  </div>
                  {errors.dzName && (
                    <span
                      className="mt-1 d-block"
                      style={{
                        color: "#FAFF17",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {errors.dzName}
                    </span>
                  )}
                </div>

                <div className="col-sm-6 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzPhoneNumber"
                      type="tel"
                      className="form-control text-white"
                      id="modalInputPhoneNumber"
                      placeholder="Số điện thoại *"
                      maxLength={11}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.dzPhoneNumber;
                          return updated;
                        });
                      }}
                      style={
                        errors.dzPhoneNumber
                          ? { borderColor: "#930000", color: "#930000" }
                          : undefined
                      }
                    />
                    <label
                      htmlFor="modalInputPhoneNumber"
                      style={
                        errors.dzPhoneNumber ? { color: "#930000" } : undefined
                      }
                    >
                      Số điện thoại *
                    </label>
                  </div>
                  {errors.dzPhoneNumber && (
                    <span
                      className="mt-1 d-block"
                      style={{
                        color: "#FAFF17",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {errors.dzPhoneNumber}
                    </span>
                  )}
                </div>

                <div className="col-sm-6 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <input
                      name="dzEmail"
                      type="email"
                      className="form-control text-white"
                      id="modalInputYourEmail"
                      placeholder="Email *"
                      maxLength={100}
                      onChange={() => {
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.dzEmail;
                          return updated;
                        });
                      }}
                      style={
                        errors.dzEmail
                          ? { borderColor: "#930000", color: "#930000" }
                          : undefined
                      }
                    />
                    <label
                      htmlFor="modalInputYourEmail"
                      style={errors.dzEmail ? { color: "#930000" } : undefined}
                    >
                      Email *
                    </label>
                  </div>
                  {errors.dzEmail && (
                    <span
                      className="mt-1 d-block"
                      style={{
                        color: "#FAFF17",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {errors.dzEmail}
                    </span>
                  )}
                </div>

                <div className="col-sm-12 m-b30">
                  <div className="form-floating floating-underline input-light">
                    <textarea
                      name="dzMessage"
                      className="form-control text-white"
                      id="modalInputMessage"
                      rows={5}
                      placeholder="Nội dung triệu chứng hoặc yêu cầu tư vấn *..."
                      maxLength={300}
                      onChange={() => {
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.dzMessage;
                          return updated;
                        });
                      }}
                      style={{
                        height: "auto",
                        minHeight: "100px",
                        ...(errors.dzMessage
                          ? { borderColor: "#930000", color: "#930000" }
                          : {}),
                      }}
                    ></textarea>
                    <label
                      htmlFor="modalInputMessage"
                      style={
                        errors.dzMessage ? { color: "#930000" } : undefined
                      }
                    >
                      Nội dung triệu chứng hoặc yêu cầu tư vấn *
                    </label>
                  </div>
                  {errors.dzMessage && (
                    <span
                      className="mt-1 d-block"
                      style={{
                        color: "#FAFF17",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {errors.dzMessage}
                    </span>
                  )}
                </div>

                <div className="col-sm-12 text-start">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg btn-icon btn-white hover-secondary d-inline-flex align-items-center gap-2"
                    style={{ boxShadow: "none" }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        Đăng ký ngay
                        <span className="right-icon">
                          <i className="feather icon-arrow-right" />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
