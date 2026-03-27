"use client";

import { useRef, useState } from "react";
import { IMAGES } from "../constant/theme";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

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

// function normalizeImageUrl(url?: string) {
//     if (!url) return null;

//     if (url.startsWith("http://") || url.startsWith("https://")) {
//         return url;
//     }

//     if (url.startsWith("/storage/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn${url}`;
//     }

//     if (url.startsWith("storage/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
//     }

//     if (url.startsWith("/uploads/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn${url}`;
//     }

//     if (url.startsWith("uploads/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
//     }

//     return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
// }

function AppointmentData({ data }: AppointmentDataProps) {
    const [selectCat, setSelectCat] = useState("Chọn dịch vụ");
    const form = useRef<HTMLFormElement | null>(null);
    const { sendEmail } = useEmailService();

    const appointmentImage = normalizeImageUrl(data?.image);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Đã nhận thông tin. Chức năng gửi form sẽ hoàn thiện sau.");
        form.current?.reset();
        setSelectCat("Chọn dịch vụ");
    };

    console.log("appointment section data:", data);
    console.log("appointment raw image:", data?.image);
    console.log("appointment full image:", appointmentImage);

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
                                <div className="title-head">
                                    <h2 className="form-title m-b0">
                                        {data?.title || "Đăng Ký Lịch Hẹn"} <br />
                                        {data?.subtitle || "Nhận tư vấn và đặt lịch khám nhanh chóng"}
                                    </h2>
                                </div>

                                <form ref={form} onSubmit={handleSubmit} className="dzForm" method="POST">
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
                                        value={selectCat === "Chọn dịch vụ" ? "" : selectCat}
                                    />

                                    <div className="dzFormMsg"></div>

                                    <div className="row">
                                        <div className="col-sm-6 m-b30">
                                            <div className="form-floating floating-underline input-light">
                                                <input
                                                    name="dzName"
                                                    type="text"
                                                    className="form-control"
                                                    id="inputYourName"
                                                    placeholder="Họ và tên"
                                                />
                                                <label htmlFor="inputYourName">Họ và tên</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 m-b30">
                                            <div className="form-floating floating-underline input-light">
                                                <input
                                                    name="dzEmail"
                                                    type="email"
                                                    className="form-control"
                                                    id="inputYourEmail"
                                                    placeholder="Email"
                                                />
                                                <label htmlFor="inputYourEmail">Email</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 m-b30">
                                            <div className="form-floating floating-underline input-light">
                                                <input
                                                    name="dzPhoneNumber"
                                                    type="tel"
                                                    className="form-control"
                                                    id="inputPhoneNumber"
                                                    placeholder="Số điện thoại"
                                                />
                                                <label htmlFor="inputPhoneNumber">Số điện thoại</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 m-b30">
                                            <div className="form-floating floating-underline input-light">
                                                <Dropdown className="form-control bs-select">
                                                    <Dropdown.Toggle as="div">
                                                        {selectCat}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => setSelectCat("Khám cơ xương khớp")}>
                                                            Khám cơ xương khớp
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectCat("Điều trị chấn thương chỉnh hình")}>
                                                            Điều trị chấn thương chỉnh hình
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectCat("Điều trị đau cột sống")}>
                                                            Điều trị đau cột sống
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectCat("Phục hồi chức năng")}>
                                                            Phục hồi chức năng
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 m-b30">
                                            <div className="form-floating floating-underline input-light">
                                                <textarea
                                                    name="dzMessage"
                                                    className="form-control"
                                                    id="inputMessage"
                                                    rows={6}
                                                    placeholder="Nội dung"
                                                ></textarea>
                                                <label htmlFor="inputMessage">Nội dung</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <button
                                                type="submit"
                                                name="submit"
                                                value="submit"
                                                className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                                            >
                                                {data?.button_text || "Đăng ký ngay"}
                                                <span className="right-icon">
                                                    <i className="feather icon-arrow-right" />
                                                </span>
                                            </button>
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