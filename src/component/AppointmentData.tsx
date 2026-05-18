"use client";

import { useRef, useState } from "react";
import { IMAGES } from "../constant/theme";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import toast from "react-hot-toast";

type AppointmentSectionData = {
  title?: string;
  subtitle?: string;
  appointment_now_text?: string;
  button_text?: string;
  button_link?: string;
  image?: string;
};

type AppointmentDataProps = {
  data?: AppointmentSectionData;
};

function AppointmentData({ data }: AppointmentDataProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const appointmentImage = normalizeImageUrl(data?.image);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(form.current!);
    const payload = {
      dzName: formData.get("dzName")?.toString().trim(),
      dzEmail: formData.get("dzEmail")?.toString().trim(),
      dzPhoneNumber: formData.get("dzPhoneNumber")?.toString().trim(),
      dzService: "Đặt lịch khám", // Set default service as in AppointmentModal
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
    } else if (payload.dzPhoneNumber.length < 10 || payload.dzPhoneNumber.length > 11) {
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
      newErrors.dzMessage = "Vui lòng nhập nội dung triệu chứng hoặc yêu cầu tư vấn.";
    } else if (payload.dzMessage.length < 5) {
      newErrors.dzMessage = "Nội dung triệu chứng hoặc yêu cầu tư vấn quá ngắn.";
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
        setSuccessMsg(
          "Đăng ký đặt lịch hẹn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        );
        form.current?.reset();
        setErrors({});
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

  return (
    <section
      className="content-inner-2 bg-light z-2"
      style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}
    >
      <div className="container">
        <div className="row align-items-end content-wrapper style-8">
          <div
            className="col-lg-6 text-center wow fadeInUp"
            data-wow-delay="0.2s"
            data-wow-duration="0.8s"
          >
            <Image
              src={appointmentImage || IMAGES.about3png}
              alt={data?.title || "Đăng ký lịch hẹn"}
              width={600}
              height={600}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
              unoptimized={typeof appointmentImage === "string"}
            />
          </div>

          <div
            className="col-lg-6"
            data-bottom-top="transform: translateY(100px)"
            data-top-bottom="transform: translateY(-10px)"
          >
            <div className="form-wrapper style-1 text-vr-wrapper">
              <div className="text-vertical">
                {data?.appointment_now_text || "ĐẶT LỊCH KHÁM"}
              </div>

              <div
                className="form-body bg-primary background-blend-burn"
                style={{
                  backgroundImage: `url(${IMAGES.bg2png.src})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="title-head m-b30">
                  <h2 className="form-title m-b0 text-white" style={{ fontSize: "28px" }}>
                    {data?.title || "Đăng Ký Lịch Hẹn"}
                  </h2>
                  <p className="text-white mb-0 opacity-75 small mt-2">
                    Điền thông tin bên dưới để bác sĩ liên hệ hỗ trợ bạn sớm nhất <span style={{ color: "#000" }}>(* là bắt buộc nhập)</span>
                  </p>
                </div>

                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="dzForm"
                  method="POST"
                >
                  <input
                    type="hidden"
                    className="form-control"
                    name="dzToDo"
                    value={data?.button_text || "Gửi đăng ký"}
                  />
                  <input
                    type="hidden"
                    className="form-control"
                    name="reCaptchaEnable"
                    value="0"
                  />
                  <input
                    type="hidden"
                    className="form-control"
                    name="dzService"
                    value="Đặt lịch khám"
                  />

                  <div className="dzFormMsg"></div>

                  <div className="row">
                    <div className="col-sm-12 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <input
                          name="dzName"
                          type="text"
                          className="form-control text-white"
                          id="inputYourName"
                          placeholder="Họ và tên *"
                          maxLength={100}
                          onChange={() => {
                            setErrors(prev => {
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
                          htmlFor="inputYourName"
                          style={
                            errors.dzName
                              ? { color: "#930000" }
                              : undefined
                          }
                        >
                          Họ và tên *
                        </label>
                      </div>
                      {errors.dzName && (
                        <span className="mt-1 d-block" style={{ color: "#FAFF17", fontSize: "12px", fontWeight: 500 }}>
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
                          id="inputPhoneNumber"
                          placeholder="Số điện thoại *"
                          maxLength={11}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                            setErrors(prev => {
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
                          htmlFor="inputPhoneNumber"
                          style={
                            errors.dzPhoneNumber
                              ? { color: "#930000" }
                              : undefined
                          }
                        >
                          Số điện thoại *
                        </label>
                      </div>
                      {errors.dzPhoneNumber && (
                        <span className="mt-1 d-block" style={{ color: "#FAFF17", fontSize: "12px", fontWeight: 500 }}>
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
                          id="inputYourEmail"
                          placeholder="Email *"
                          maxLength={100}
                          onChange={() => {
                            setErrors(prev => {
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
                          htmlFor="inputYourEmail"
                          style={
                            errors.dzEmail
                              ? { color: "#930000" }
                              : undefined
                          }
                        >
                          Email *
                        </label>
                      </div>
                      {errors.dzEmail && (
                        <span className="mt-1 d-block" style={{ color: "#FAFF17", fontSize: "12px", fontWeight: 500 }}>
                          {errors.dzEmail}
                        </span>
                      )}
                    </div>

                    <div className="col-sm-12 m-b30">
                      <div className="form-floating floating-underline input-light">
                        <textarea
                          name="dzMessage"
                          className="form-control text-white"
                          id="inputMessage"
                          rows={6}
                          placeholder="Nội dung triệu chứng hoặc yêu cầu tư vấn *..."
                          maxLength={300}
                          onChange={() => {
                            setErrors(prev => {
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
                              : {})
                          }}
                        ></textarea>
                        <label
                          htmlFor="inputMessage"
                          style={
                            errors.dzMessage
                              ? { color: "#930000" }
                              : undefined
                          }
                        >
                          Nội dung triệu chứng hoặc yêu cầu tư vấn *
                        </label>
                      </div>
                      {errors.dzMessage && (
                        <span className="mt-1 d-block" style={{ color: "#FAFF17", fontSize: "12px", fontWeight: 500 }}>
                          {errors.dzMessage}
                        </span>
                      )}
                    </div>

                    <div className="col-sm-12">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-lg btn-icon btn-white hover-secondary d-inline-flex align-items-center gap-2"
                        style={{ boxShadow: "none" }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Đang xử lý...
                          </>
                        ) : (
                          <>
                            {data?.button_text || "Đăng ký ngay"}
                            <span className="right-icon">
                              <i className="feather icon-arrow-right" />
                            </span>
                          </>
                        )}
                      </button>
                      {successMsg && (
                        <div className="text-white mt-3 text-start fw-medium">
                          {successMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppointmentData;
