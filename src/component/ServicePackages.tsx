"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IMAGES } from "../constant/theme";

import "swiper/css";
import "swiper/css/navigation";
import { usePathname } from "next/navigation";

interface ServiceItem {
  name?: string;
  price?: string;
  period?: string;
  btn_text?: string;
  btn_link?: string;
  features?: string[];
  image_url?: string;
  treatment_steps?: any[];
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
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
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

  const getFullImageUrl = (url: string | undefined) => {
    if (!url) return defaultImage;
    if (url.startsWith("http")) return url;
    const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
    return `${ADMIN_URL}/${cleanUrl}`;
  };

  const rawItems = data?.items || [];

  const displayItems = isServicePage
    ? [...rawItems].reverse()
    : [...rawItems].slice(-8).reverse();

  const packages = displayItems.map((item, index) => ({
    id: index + 1,
    image: getFullImageUrl(item.image_url),
    name: item.name || "Gói dịch vụ",
    price: item.price || "Liên hệ",
    period: item.period ? `/ ${item.period}` : "",
    buttonText: item.btn_text || "Chọn dịch vụ",
    buttonLink: item.btn_link || "#",
    features: item.features || [],
    treatment_steps: item.treatment_steps || [],
  }));

  const handleOpenModal = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setSelectedPackage(item);
    setShowModal(true);
  };

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

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '1200px' }}
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
                }
                .treatment-section .step {
                    width: 33.333%;
                    position: relative;
                    text-align: center;
                    padding: 20px 30px;
                    cursor: pointer;
                }
                .treatment-section .step-inner {
                    background: #fff;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 50%;
                    padding: 30px;
                    width: 100%;
                    max-width: 340px;
                    aspect-ratio: 1 / 1;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                    position: relative;
                    z-index: 2;
                }
                .treatment-section .step:hover .step-inner {
                    transform: scale(1.08);
                    border-color: currentColor;
                    box-shadow: 0 15px 45px rgba(0,0,0,0.1);
                    z-index: 10;
                }
                .treatment-section .step::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 100%;
                    transform: translate(-50%, -50%);
                    width: 70px;
                    height: 30px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23031b4e' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3Cpolyline points='12 5 19 12 12 19'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: center;
                    z-index: 3;
                    opacity: 0.4;
                }
                .treatment-section .step:nth-child(3n)::before {
                    display: none;
                }
                .treatment-section .step-number {
                    font-size: 40px;
                    font-weight: 900;
                    line-height: 1;
                    margin-bottom: 5px;
                    opacity: 0.2;
                }
                .treatment-section .step.active .step-inner {
                    border-color: currentColor;
                    background: #fff;
                }
                .treatment-section .step.active .step-number {
                    opacity: 0.8;
                }
                .treatment-section .step-content h3 {
                    margin: 0 0 5px;
                    color: #031b4e;
                    font-size: 15px;
                    font-weight: 800;
                    line-height: 1.3;
                }
                .treatment-section .step-content p {
                    margin: 0;
                    color: #555;
                    line-height: 1.3;
                    font-size: 12.5px;
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
                  {selectedPackage?.treatment_steps && selectedPackage.treatment_steps.length > 0 ? (
                    <>
                      <div className="row mb-4 align-items-center">
                        <div className="col-lg-12">
                          <div className="section-head text-start mb-0">
                            <span className="label">Liệu trình điều trị</span>
                            <p className="mb-0">
                              Quy trình tháo dụng cụ kết hợp xương được thực hiện an toàn, giúp người bệnh giảm đau,
                              hạn chế biến chứng và phục hồi vận động hiệu quả sau khi xương đã liền vững chắc.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="timeline">
                            {selectedPackage.treatment_steps.map((step: any, index: number) => {
                              const colors = ['#e84c3d', '#e67e22', '#d35400', '#f39c12', '#2ecc71', '#3498db'];
                              const color = colors[index % colors.length];
                              return (
                                <div
                                  key={index}
                                  className={`step ${activeStep === index ? 'active' : ''}`}
                                  onMouseEnter={() => setActiveStep(index)}
                                  onClick={() => setActiveStep(index)}
                                >
                                  <div className="step-inner">
                                    <div className="step-number" style={{ color: color }}>{Number(step.step_number || step.num || index + 1)}</div>
                                    <div className="step-content">
                                      <h3>{step.title?.replace(/&amp;/g, '&')}</h3>
                                      {(() => {
                                        const desc = step.description || step.desc || "";
                                        if (desc.includes('\n')) {
                                          const items = desc.split('\n').filter((item: string) => item.trim() !== "");
                                          return (
                                            <ul style={{ textAlign: "left", listStyle: "none", padding: '0 0 0 10px', margin: 0, color: "#555", fontSize: "12.5px", lineHeight: "1.3" }}>
                                              {items.map((item: string, i: number) => (
                                                <li key={i} style={{ marginBottom: "5px", display: "flex", alignItems: "flex-start" }}>
                                                  <span style={{ color: color, marginRight: "6px", fontSize: "10px", marginTop: "4px" }}>◆</span>
                                                  <span>{item.replace(/&amp;/g, '&')}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          );
                                        }
                                        return <p>{desc.replace(/&amp;/g, '&')}</p>;
                                      })()}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-12">
                        <div>
                          <Image
                            src={selectedPackage?.image || "/assets/images/services/default-plan.jpg"}
                            alt={selectedPackage?.name || "Dịch vụ"}
                            width={1200}
                            height={800}
                            unoptimized={true}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                      className="btn py-2 px-4 rounded-pill fw-bold text-white"
                      style={{
                        fontSize: '14px',
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
                      className="btn py-2 px-4 rounded-pill fw-bold d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: '14px',
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
      )
      }
    </>
  );
}

export default ServicePackage;
