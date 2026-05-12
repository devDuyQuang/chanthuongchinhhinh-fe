"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IMAGES } from "../constant/theme";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { usePathname } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";

interface ServiceItem {
  name?: string;
  price?: string;
  period?: string;
  btn_text?: string;
  btn_link?: string;
  features?: string[];
  image_url?: string;
}

interface ServicePlansData {
  title?: string;
  description?: string;
  features_pool?: string[];
  items?: ServiceItem[];
}

interface ServicePackageProps {
  data?: ServicePlansData;
}

function ServicePackage({ data }: ServicePackageProps) {
  const [active, setActive] = useState<number | null>(1);
  const pathname = usePathname(); // Lấy URL hiện tại

  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // Thêm state để bắt lỗi validate từ Laravel
  const [errors, setErrors] = useState<any>(null);

  const ADMIN_URL =
    process.env.NEXT_PUBLIC_ADMIN_URL || "http://admin.localhost:8000";
  const defaultImage = "/assets/images/services/default-plan.jpg";

  const isServicePage = pathname === "/goi-dich-vu-dieu-tri";

  // Hàm xử lý hiển thị ảnh
  const getFullImageUrl = (url: string | undefined) => {
    if (!url) return defaultImage;
    // Nếu đã có http/https thì trả về luôn, nếu không thì ghép với ADMIN_URL
    if (url.startsWith("http")) return url;
    // Đảm bảo không bị thừa dấu / khi ghép
    const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
    return `${ADMIN_URL}/${cleanUrl}`;
  };

  // Lấy 8 item mới nhất từ mảng trả về (giả sử item mới nằm ở cuối mảng thì dùng slice(-8).reverse())
  // Hoặc đơn giản là lấy 8 item đầu tiên nếu backend đã sắp xếp
  const rawItems = data?.items || [];

  // Nếu ở trang dịch vụ thì hiện tất cả, trang chủ thì lấy 8 cái mới nhất
  const displayItems = isServicePage
    ? [...rawItems].reverse()
    : [...rawItems].slice(-8).reverse();

  // const latestItems = [...rawItems].slice(-8).reverse();

  // const packages = displayItems.length > 0
  //     ? displayItems.map((item, index) => ({
  //         id: index + 1,
  //         delay: `${0.1 * (index + 1)}s`,
  //         image: getFullImageUrl(item.image_url),
  //         name: item.name || "Gói dịch vụ",
  //         price: item.price || "Liên hệ",
  //         period: item.period ? `/ ${item.period}` : "",
  //         buttonText: item.btn_text || "Chọn dịch vụ",
  //         buttonLink: item.btn_link || "#",
  //         features: item.features || []
  //     }))
  //     : [];

  const packages = displayItems.map((item, index) => ({
    id: index + 1,
    image: getFullImageUrl(item.image_url),
    name: item.name || "Gói dịch vụ",
    price: item.price || "Liên hệ",
    period: item.period ? `/ ${item.period}` : "",
    buttonText: item.btn_text || "Chọn dịch vụ",
    buttonLink: item.btn_link || "#",
    features: item.features || [],
  }));

  // Hàm xử lý mở modal
  const handleOpenModal = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setSelectedPackage(item);
    setErrors(null); // Reset lỗi khi mở gói mới
    setShowModal(true);
  };

  // Hàm Validation Frontend
  const validateForm = (data: any) => {
    const newErrors: any = {};
    if (!data.full_name || data.full_name.length < 3)
      newErrors.full_name = ["Họ tên phải ít nhất 3 ký tự"];

    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!data.phone || !phoneRegex.test(data.phone))
      newErrors.phone = ["Số điện thoại không đúng định dạng Việt Nam"];

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = ["Email không hợp lệ"];

    return newErrors;
  };

  // Sử dụng biến môi trường hoặc dùng link cứng nếu biến bị undefined
  const baseUrl =
    (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
      /^https?:\/\//,
      (match) => match + "api.",
    ) || "http://admin.localhost:8000/api";
  // Hàm gửi form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(null);
    const formData = new FormData(e.currentTarget);
    const dataToSend = {
      package_name: selectedPackage.name,
      package_price: selectedPackage.price,
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    // 1. Kiểm tra lỗi phía Client (nếu có)
    const clientErrors = validateForm(dataToSend);
    if (Object.keys(clientErrors).length > 0) {
      // Duyệt qua mảng lỗi và hiển thị lên Toast
      Object.values(clientErrors).forEach((msg: any) => toast.error(msg[0]));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/register-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Quan trọng để Laravel trả về lỗi validate dạng JSON
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Đăng ký thành công. Chúng tôi sẽ liên hệ lại sớm!");
        setShowModal(false);
        //(e.target as HTMLFormElement).reset(); // Reset form
      } else if (response.status === 422) {
        // Hiển thị lỗi validate từ Laravel
        //setErrors(result.errors);

        // 2. Lấy lỗi từ Laravel (422 Unprocessable Entity)
        // Laravel trả về object dạng: { full_name: ["Lỗi 1"], phone: ["Lỗi 2"] }
        const serverErrors = result.errors;
        Object.keys(serverErrors).forEach((key) => {
          serverErrors[key].forEach((message: string) => {
            toast.error(message); // Hiện từng lỗi cụ thể lên Toast
          });
        });
      } else {
        toast.error(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
        //alert(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  // Component con để tái sử dụng giao diện Card
  const RenderCard = ({ item }: { item: any }) => (
    <div
      className={`dz-team style-1 box-hover ${active === item.id ? "active" : ""}`}
      onMouseEnter={() => setActive(item.id)}
      style={{ margin: isServicePage ? "0 0 30px 0" : "15px 0" }}
    >
      <div className="dz-media">
        <Image
          src={item.image}
          alt={item.name}
          width={300}
          height={335}
          style={{ width: "100%", height: "335px", objectFit: "cover" }}
          unoptimized={true}
        />
      </div>
      <div className="dz-content">
        <div className="clearfix">
          <h3 className="dz-name fs-6">
            <Link href={item.buttonLink}>{item.name}</Link>
          </h3>
          <span className="dz-position fs-5 text-primary">
            {item.price}{" "}
            <small className="text-muted fw-normal">{item.period}</small>
          </span>
        </div>
        {active === item.id && (
          <ul className="list-unstyled mt-2 mb-0 small text-muted animate__animated animate__fadeIn">
            {item.features.slice(0, 3).map((feat: string, idx: number) => (
              <li key={idx} className="text-truncate">
                <i className="feather icon-check-circle text-success me-1"></i>
                {feat}
              </li>
            ))}
          </ul>
        )}
        {/* <Link href={item.buttonLink} className="btn btn-square btn-secondary">
                    <i className="feather icon-search" />
                </Link> */}
        <button
          onClick={(e) => handleOpenModal(e, item)}
          className="btn btn-square btn-secondary border-0"
        >
          <i className="feather icon-search" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="row justify-content-center">
        {isServicePage ? (
          // --- GIAO DIỆN TRANG CHI TIẾT (DẠNG ROW/COL) ---
          packages.map((item) => (
            <div
              key={item.id}
              className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <RenderCard item={item} />
            </div>
          ))
        ) : (
          // --- GIAO DIỆN TRANG CHỦ (DẠNG SWIPER) ---
          <div
            className="col-12 swiper-btn-center-lr wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={3}
              spaceBetween={30}
              loop={packages.length > 3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".swiper2-button-next",
                prevEl: ".swiper2-button-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            >
              {packages.map((item) => (
                <SwiperSlide key={item.id}>
                  <RenderCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper2-button-prev btn-prev" role="button">
              <Image src={IMAGES.arrowleft} alt="prev" />
            </div>
            <div className="swiper2-button-next btn-next" role="button">
              <Image src={IMAGES.arrowright} alt="next" />
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL ĐĂNG KÝ --- */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 1050,
          }}
          // 1. Thêm sự kiện click ra ngoài để đóng modal
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title text-white text-uppercase">
                  Đăng ký dịch vụ
                </h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-4 text-center">
                    <h4 className="text-dark mb-1">{selectedPackage?.name}</h4>
                    <p className="text-primary fw-bold fs-5 mb-0">
                      {selectedPackage?.price} {selectedPackage?.period}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      className="form-control"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                    {errors?.full_name && (
                      <div className="invalid-feedback">
                        {errors.full_name[0]}
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="090..."
                        required
                      />
                      {errors?.phone && (
                        <div className="invalid-feedback">
                          {errors.phone[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="nva@gmail.com"
                        required
                      />
                      {errors?.email && (
                        <div className="invalid-feedback">
                          {errors.email[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-0">
                    <label className="form-label small fw-bold">
                      Lời nhắn (không bắt buộc)
                    </label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows={3}
                      placeholder="Tôi muốn tư vấn về tình trạng..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  {/* <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button> */}
                  <button
                    type="submit"
                    className="btn btn-sm btn-secondary px-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                        Đang gửi...
                      </>
                    ) : (
                      selectedPackage?.buttonText || "Đăng ký"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServicePackage;
