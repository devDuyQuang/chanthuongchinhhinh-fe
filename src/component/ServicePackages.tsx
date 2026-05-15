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
  const [errors, setErrors] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  
  const timelineSteps = [
    { num: "01", title: "Thăm khám & đánh giá ban đầu", desc: "Bác sĩ kiểm tra vị trí dụng cụ, tình trạng liền xương, mức độ đau và khả năng vận động của người bệnh." },
    { num: "02", title: "Chụp X-quang / cận lâm sàng", desc: "Đánh giá xương đã liền chắc, vị trí vít nẹp và điều kiện an toàn trước khi thực hiện tháo dụng cụ." },
    { num: "03", title: "Tư vấn kế hoạch điều trị", desc: "Bác sĩ giải thích phương pháp thực hiện, thời gian điều trị, hình thức vô cảm và lưu ý sau phẫu thuật." },
    { num: "04", title: "Thực hiện tháo dụng cụ KHX", desc: "Tiến hành tháo vít, nẹp hoặc vật liệu cố định tại một vị trí theo quy trình vô khuẩn, an toàn." },
    { num: "05", title: "Theo dõi sau phẫu thuật", desc: "Kiểm tra vết mổ, kiểm soát đau, phòng ngừa nhiễm trùng và hướng dẫn chăm sóc tại nhà." },
    { num: "06", title: "Phục hồi vận động & tái khám", desc: "Hướng dẫn vận động phù hợp, theo dõi tiến triển và tái khám để đảm bảo phục hồi hiệu quả." }
  ];

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
      onClick={(e) => handleOpenModal(e, item)}
      style={{ margin: isServicePage ? "0 0 30px 0" : "15px 0", cursor: "pointer" }}
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
            zIndex: 99999,
          }}
          // 1. Thêm sự kiện click ra ngoài để đóng modal
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '1120px' }}
          >
            <div className="modal-content shadow-lg border-0 bg-transparent">
              <style>{`
                .treatment-section {
                    padding: 40px;
                    background: linear-gradient(135deg, #f4fbff 0%, #ffffff 55%, #e8f9fd 100%);
                    border-radius: 12px;
                    overflow: hidden;
                    text-align: left;
                }
                .treatment-section .section-head {
                    max-width: 800px;
                    margin: 0 auto 50px auto;
                    text-align: center;
                }
                .treatment-section .label {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 20px;
                    background: rgba(3, 27, 78, 0.05);
                    color: #031b4e;
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                }
                .treatment-section .section-head h1 {
                    font-size: 36px;
                    color: #031b4e;
                    margin: 0 0 20px;
                    font-weight: 800;
                    line-height: 1.3;
                    text-transform: uppercase;
                }
                .treatment-section .section-head p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555;
                    margin: 0;
                }
                .treatment-section .timeline {
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 40px;
                }
                .treatment-section .step {
                    width: 33.333%;
                    position: relative;
                    text-align: center;
                    padding: 20px 15px;
                    cursor: pointer;
                }
                .treatment-section .step::before {
                    content: "";
                    position: absolute;
                    top: 87px;
                    left: 50%;
                    width: 100%;
                    height: 0;
                    border-top: 2px dashed #c0c0c0;
                    z-index: 1;
                }
                .treatment-section .step:nth-child(3n)::before {
                    display: none;
                }
                .treatment-section .step-number {
                    font-size: 54px;
                    font-weight: 800;
                    margin-bottom: 5px;
                    transition: 0.3s ease;
                    line-height: 1;
                }
                .treatment-section .step-dot {
                    width: 16px;
                    height: 16px;
                    background: #fff;
                    border: 3px solid #e0e0e0;
                    border-radius: 50%;
                    margin: 0 auto 20px auto;
                    position: relative;
                    z-index: 2;
                    transition: 0.3s ease;
                }
                .treatment-section .step.active .step-number,
                .treatment-section .step:hover .step-number {
                    transform: scale(1.1);
                }
                .treatment-section .step-content h3 {
                    margin: 0 0 10px;
                    color: #183b56;
                    font-size: 17px;
                    font-weight: 700;
                }
                .treatment-section .step-content p {
                    margin: 0;
                    color: #666;
                    line-height: 1.5;
                    font-size: 14px;
                }
                .treatment-section .note-box {
                    margin-top: 40px;
                    padding: 24px 30px;
                    border-radius: 12px;
                    background: #f4f9ff;
                    border-left: 5px solid #031b4e;
                    color: #183b56;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.03);
                }
                .treatment-section .note-box h2 {
                    margin: 0 0 8px;
                    font-size: 20px;
                    color: #031b4e;
                    font-weight: 700;
                }
                .treatment-section .note-box p {
                    margin: 0;
                    line-height: 1.6;
                    color: #425466;
                    font-size: 15px;
                }
                @media (max-width: 991px) {
                    .treatment-section .step {
                        width: 50%;
                    }
                    .treatment-section .step::before {
                        display: block;
                    }
                    .treatment-section .step:nth-child(2n)::before {
                        display: none;
                    }
                    .treatment-section .step:nth-child(3n)::before {
                        display: block;
                    }
                }
                @media (max-width: 768px) {
                    .treatment-section {
                        padding: 20px;
                    }
                    .treatment-section .section-head h1 {
                        font-size: 30px;
                    }
                    .treatment-section .note-box {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
                @media (max-width: 575px) {
                    .treatment-section .step {
                        width: 100%;
                    }
                    .treatment-section .step::before {
                        display: none;
                    }
                }
              `}</style>
              <div className="treatment-section position-relative">
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-close position-absolute" 
                  style={{ top: '20px', right: '20px', zIndex: 10 }}
                  aria-label="Close"
                ></button>
                <div className="container-fluid px-0">
                  <div className="section-head">
                    <span className="label">Liệu trình điều trị</span>
                    <h1>{selectedPackage?.name || "Tháo dụng cụ KHX 1 nơi"}</h1>
                    <p>
                        Quy trình tháo dụng cụ kết hợp xương được thực hiện an toàn, giúp người bệnh giảm đau,
                        hạn chế biến chứng và phục hồi vận động hiệu quả sau khi xương đã liền vững chắc.
                    </p>
                  </div>

                  <div className="timeline">
                    {timelineSteps.map((step, index) => {
                      const colors = ['#e84c3d', '#e67e22', '#d35400', '#f39c12', '#2ecc71', '#3498db'];
                      const color = colors[index % colors.length];
                      return (
                      <div 
                        key={index} 
                        className={`step ${activeStep === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveStep(index)}
                        onClick={() => setActiveStep(index)}
                      >
                        <div className="step-number" style={{ color: color }}>{Number(step.num)}</div>
                        <div 
                          className="step-dot" 
                          style={{ 
                            borderColor: activeStep === index ? color : '#e0e0e0', 
                            background: activeStep === index ? color : '#fff',
                            boxShadow: activeStep === index ? `0 0 10px ${color}80` : 'none'
                          }}
                        ></div>
                        <div className="step-content">
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>

                  <div className="note-box">
                    <div>
                        <h2>An toàn – Hiệu quả – Phục hồi nhanh</h2>
                        <p>
                            Phù hợp với người bệnh đã liền xương vững chắc, cần tháo vật liệu cố định để giảm khó chịu,
                            hạn chế biến chứng và cải thiện sinh hoạt.
                        </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <button 
                      className="btn w-50 py-3 rounded-pill fw-bold text-white" 
                      style={{ 
                        fontSize: '16px', 
                        textTransform: 'uppercase',
                        background: '#031b4e',
                        border: 'none',
                        boxShadow: '0 8px 15px rgba(3, 27, 78, 0.3)'
                      }}
                    >
                      Đăng ký gói khám
                    </button>
                    <Link 
                      href="tel:0389951795" 
                      className="btn w-50 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center" 
                      style={{ 
                        fontSize: '16px', 
                        textTransform: 'uppercase',
                        background: '#fff',
                        color: '#031b4e',
                        border: '2px solid #031b4e',
                        boxShadow: '0 8px 15px rgba(3, 27, 78, 0.1)'
                      }}
                    >
                      Liên hệ trực tiếp bác sĩ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServicePackage;
