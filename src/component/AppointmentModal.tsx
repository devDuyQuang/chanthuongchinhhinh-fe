"use client";

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

type AppointmentModalProps = {
    show: boolean;
    onClose: () => void;
};

export default function AppointmentModal({ show, onClose }: AppointmentModalProps) {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const payload = {
            dzName: formData.get("dzName")?.toString().trim(),
            dzEmail: formData.get("dzEmail")?.toString().trim(),
            dzPhoneNumber: formData.get("dzPhoneNumber")?.toString().trim(),
            dzService: "Đặt lịch khám", // Default value to prevent Laravel backend validation failure
            dzMessage: formData.get("dzMessage")?.toString().trim(),
        };

        // Validation
        const newErrors: string[] = [];
        if (!payload.dzName || payload.dzName.length < 3) {
            newErrors.push("Vui lòng nhập họ tên đầy đủ (ít nhất 3 ký tự).");
        }
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if (!payload.dzPhoneNumber || !phoneRegex.test(payload.dzPhoneNumber)) {
            newErrors.push("Số điện thoại không đúng định dạng Việt Nam.");
        }
        if (!payload.dzEmail) {
            newErrors.push("Vui lòng nhập email để chúng tôi liên hệ.");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(payload.dzEmail)) {
                newErrors.push("Email không hợp lệ.");
            }
        }

        if (newErrors.length > 0) {
            newErrors.forEach((msg) => toast.error(msg));
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
                onClose();
            } else if (response.status === 422 && result.errors) {
                Object.keys(result.errors).forEach((key) => {
                    result.errors[key].forEach((msg: string) => toast.error(msg));
                });
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
                style={{ maxWidth: "550px" }}
            >
                <div
                    className="modal-content border-0 shadow-lg"
                    style={{
                        borderRadius: "20px",
                        background: "#ffffff",
                        overflow: "hidden",
                    }}
                >
                    {/* Modal Header */}
                    <div
                        className="p-4 text-center text-white position-relative"
                        style={{
                            background: "linear-gradient(135deg, #031b4e 0%, #0d3b66 100%)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-close btn-close-white position-absolute"
                            style={{ top: "20px", right: "20px", fontSize: "16px" }}
                            aria-label="Close"
                        ></button>
                        <h3 className="m-b5 text-white fw-bold" style={{ fontSize: "24px" }}>
                            Đặt Lịch Hẹn Khám
                        </h3>
                        <p className="mb-0 text-white-50 small">
                            Vui lòng điền thông tin để bác sĩ liên hệ tư vấn sớm nhất
                        </p>
                    </div>

                    {/* Modal Body Form */}
                    <div className="p-4">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-secondary small">Họ và tên</label>
                                <input
                                    name="dzName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    style={{
                                        borderRadius: "10px",
                                        padding: "12px",
                                        border: "1px solid #ced4da",
                                    }}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-secondary small">Số điện thoại</label>
                                    <input
                                        name="dzPhoneNumber"
                                        type="tel"
                                        className="form-control"
                                        placeholder="Nhập số điện thoại"
                                        style={{
                                            borderRadius: "10px",
                                            padding: "12px",
                                            border: "1px solid #ced4da",
                                        }}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-secondary small">Email</label>
                                    <input
                                        name="dzEmail"
                                        type="email"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ email"
                                        style={{
                                            borderRadius: "10px",
                                            padding: "12px",
                                            border: "1px solid #ced4da",
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold text-secondary small">Nội dung tin nhắn</label>
                                <textarea
                                    name="dzMessage"
                                    className="form-control"
                                    rows={4}
                                    placeholder="Nhập triệu chứng hoặc nội dung bạn cần tư vấn..."
                                    style={{
                                        borderRadius: "10px",
                                        padding: "12px",
                                        border: "1px solid #ced4da",
                                    }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                                style={{
                                    background: "linear-gradient(135deg, #031b4e 0%, #0d3b66 100%)",
                                    border: "none",
                                    boxShadow: "0 8px 15px rgba(3, 27, 78, 0.2)",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        Đăng Ký Đặt Lịch
                                        <i className="feather icon-arrow-right" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
