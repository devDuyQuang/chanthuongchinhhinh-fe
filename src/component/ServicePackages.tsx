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
  description?: string;
  price?: string;
  period?: string;
  btn_text?: string;
  btn_link?: string;
  features?: string[];
  image_url?: string;
  left_image_url?: string;
  right_image_url?: string;
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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

  const renderListItems = (items: string[]) => {
    return items.map((text, idx) => {
      if (text.includes(':')) {
        const splitIndex = text.indexOf(':');
        const title = text.substring(0, splitIndex + 1);
        const remainder = text.substring(splitIndex + 1).trim();

        if (remainder.length > 0) {
          const subItems = remainder.split(',').map(s => s.trim()).filter(Boolean);
          return (
            <li key={idx}>
              {title}
              <ul className="sub-list list-unstyled mt-1 mb-0" style={{ paddingLeft: 0 }}>
                {subItems.map((subItem, j) => (
                  <li key={j}>{subItem}</li>
                ))}
              </ul>
            </li>
          );
        }
      }
      return <li key={idx}>{text}</li>;
    });
  };

  const rawItems = data?.items || [];

  const displayItems = isServicePage
    ? [...rawItems].reverse()
    : [...rawItems].slice(-8).reverse();

  const packages = displayItems.map((item, index) => ({
    id: index + 1,
    image: getFullImageUrl(item.image_url),
    name: item.name || "Gói dịch vụ",
    description: item.description || "",
    left_image_url: item.left_image_url,
    right_image_url: item.right_image_url,
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
                .treatment-modal-container {
                  padding: 35px;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow-y: auto;
                  max-height: 90vh;
                }
                .treatment-table {
                  border-collapse: collapse;
                  width: 100%;
                  min-width: 1000px;
                }
                .treatment-table th {
                  padding: 0;
                  border: none;
                  border-bottom: 1px solid #dee2e6;
                  vertical-align: bottom;
                  height: 1px;
                }
                .th-inner {
                  background-color: #031b4e;
                  color: white;
                  font-weight: 700;
                  text-align: center;
                  padding: 15px 5px;
                  font-size: 14px;
                  border-radius: 8px 8px 0 0;
                  margin: 0 1px;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  line-height: 1.3;
                  white-space: nowrap;
                }
                .treatment-table td {
                  border: 1px solid #dee2e6;
                  padding: 15px;
                  vertical-align: top;
                }
                .phase-cell {
                  text-align: center;
                }
                .phase-number {
                  font-size: 48px;
                  font-weight: 800;
                  color: #031b4e;
                  line-height: 1;
                  margin-bottom: 5px;
                }
                .phase-title {
                  font-size: 14px;
                  font-weight: 700;
                  color: #333;
                  text-transform: uppercase;
                }
                .list-unstyled-custom {
                  padding-left: 0;
                  margin-bottom: 0;
                }
                .list-unstyled-custom li {
                  position: relative;
                  padding-left: 15px;
                  margin-bottom: 8px;
                  font-size: 14px;
                  color: #444;
                  line-height: 1.4;
                }
                .list-unstyled-custom li::before {
                  content: '•';
                  position: absolute;
                  left: 0;
                  color: #031b4e;
                  font-weight: bold;
                  font-size: 16px;
                }
                .sub-list {
                  padding-left: 10px;
                  margin-top: 5px;
                  list-style-type: none;
                }
                .sub-list li {
                  padding-left: 12px;
                }
                .sub-list li::before {
                  content: '-';
                  position: absolute;
                  left: 0;
                  color: #444;
                  font-weight: normal;
                  font-size: 14px;
                }
                .time-cell {
                  text-align: center;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  min-height: 120px;
                }
                .calendar-icon {
                  font-size: 32px;
                  color: #031b4e;
                  margin-bottom: 12px;
                }
                .time-text {
                  font-weight: 700;
                  color: #333;
                  font-size: 14px;
                  white-space: pre-line;
                }
                .image-placeholder-container {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 10px;
                  justify-content: center;
                }
                .img-placeholder {
                  background: #f8f9fa;
                  border: 1px dashed #adb5bd;
                  border-radius: 6px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  color: #6c757d;
                  text-align: center;
                  padding: 8px;
                  font-weight: 500;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                .note-section {
                  background-color: #f4f8fc;
                  border-radius: 10px;
                  padding: 20px;
                  display: flex;
                  align-items: center;
                  gap: 20px;
                  margin-top: 25px;
                  border: 1px solid #e1ebf4;
                }
                .note-label {
                  background-color: #031b4e;
                  color: white;
                  padding: 10px 25px;
                  border-radius: 6px;
                  font-weight: 700;
                  font-size: 16px;
                  letter-spacing: 1px;
                }
                .note-list {
                  flex: 1;
                  margin-bottom: 0;
                }
                .note-list li {
                  margin-bottom: 8px;
                  color: #333;
                  font-size: 14px;
                  font-weight: 500;
                  display: flex;
                  align-items: flex-start;
                }
                .note-list li i {
                  color: #031b4e;
                  margin-right: 10px;
                  font-size: 16px;
                  margin-top: 3px;
                }
                .note-list li:last-child {
                  margin-bottom: 0;
                }
                .note-icons {
                  display: flex;
                  gap: 20px;
                  text-align: center;
                }
                .note-icon-item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  width: 80px;
                }
                .note-icon-circle {
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                  border: 2px solid #031b4e;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #031b4e;
                  font-size: 20px;
                  margin-bottom: 8px;
                  background: white;
                }
                .note-icon-text {
                  font-size: 12px;
                  line-height: 1.3;
                  color: #333;
                  font-weight: 500;
                }
                .phase-icon {
                  font-size: 28px;
                  color: #031b4e;
                  margin-top: 15px;
                }
                
                /* Custom Scrollbar for the modal */
                .treatment-modal-container::-webkit-scrollbar {
                  width: 8px;
                }
                .treatment-modal-container::-webkit-scrollbar-track {
                  background: #f1f1f1; 
                  border-radius: 10px;
                }
                .treatment-modal-container::-webkit-scrollbar-thumb {
                  background: #c1c1c1; 
                  border-radius: 10px;
                }
                .treatment-modal-container::-webkit-scrollbar-thumb:hover {
                  background: #a8a8a8; 
                }
              `}</style>
              <div className="treatment-modal-container position-relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-close position-absolute"
                  style={{ top: '15px', right: '15px', zIndex: 10 }}
                  aria-label="Close"
                ></button>

                <div className="d-flex justify-content-between align-items-center mb-4 pt-2 px-2">
                  <div className="d-none d-md-flex flex-column align-items-center justify-content-center" style={{ width: '130px', height: '130px', flexShrink: 0, border: selectedPackage?.left_image_url ? 'none' : '1px dashed #ccc', borderRadius: '8px', background: '#f8f9fa', position: 'relative', overflow: 'hidden' }}>
                    {selectedPackage?.left_image_url ? (
                      <Image src={getFullImageUrl(selectedPackage.left_image_url)} alt="Left Image" fill style={{ objectFit: 'cover' }} unoptimized={true} />
                    ) : (
                      <>
                        <i className="feather icon-image text-muted mb-2" style={{ fontSize: '24px' }}></i>
                        <span className="text-muted text-center" style={{ fontSize: '11px', lineHeight: '1.2' }}>Ảnh minh họa<br />trái</span>
                      </>
                    )}
                  </div>

                  <div className="text-center px-3" style={{ flex: 1 }}>
                    <h2 className="fw-bold text-uppercase" style={{ color: '#031b4e', fontSize: '30px', letterSpacing: '1px', marginBottom: '8px' }}>
                      {selectedPackage?.name}
                    </h2>
                    {selectedPackage?.description && (
                      <p className="fst-italic text-muted mb-0" style={{ fontSize: '15px', whiteSpace: 'pre-line' }}>
                        {selectedPackage.description}
                      </p>
                    )}
                  </div>

                  <div className="d-none d-md-flex flex-column align-items-center justify-content-center" style={{ width: '130px', height: '130px', flexShrink: 0, border: selectedPackage?.right_image_url ? 'none' : '1px dashed #ccc', borderRadius: '8px', background: '#f8f9fa', position: 'relative', overflow: 'hidden' }}>
                    {selectedPackage?.right_image_url ? (
                      <Image src={getFullImageUrl(selectedPackage.right_image_url)} alt="Right Image" fill style={{ objectFit: 'cover' }} unoptimized={true} />
                    ) : (
                      <>
                        <i className="feather icon-image text-muted mb-2" style={{ fontSize: '24px' }}></i>
                        <span className="text-muted text-center" style={{ fontSize: '11px', lineHeight: '1.2' }}>Ảnh minh họa<br />phải</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="table-responsive pb-3">
                  <table className="treatment-table">
                    <thead>
                      <tr>
                        <th style={{ width: '11%' }}><div className="th-inner">GIAI ĐOẠN</div></th>
                        <th style={{ width: '19%' }}><div className="th-inner">MỤC TIÊU</div></th>
                        <th style={{ width: '28%' }}><div className="th-inner">CAN THIỆP CHÍNH</div></th>
                        <th style={{ width: '27%' }}><div className="th-inner">HÌNH ẢNH MINH HỌA</div></th>
                        <th style={{ width: '15%' }}><div className="th-inner">THỜI GIAN DỰ KIẾN</div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPackage?.treatment_steps && selectedPackage.treatment_steps.length > 0 ? (
                        selectedPackage.treatment_steps.map((step: any, index: number) => {
                          const icons = [
                            "icon-clipboard",
                            "icon-users",
                            "icon-activity",
                            "icon-user-check",
                            "icon-eye"
                          ];
                          const iconClass = icons[index % icons.length];

                          const goals = step.goal ? step.goal.split(/\r?\n/).filter((g: string) => g.trim() !== '') : [];
                          const contents = step.content ? step.content.split(/\r?\n/).filter((c: string) => c.trim() !== '') : [];

                          return (
                            <tr key={index}>
                              <td className="phase-cell">
                                <div className="phase-number">{step.step_number || index + 1}</div>
                                <div className="phase-title" style={{ whiteSpace: 'pre-line', fontSize: '12px' }}>{step.stage}</div>
                                <div className="phase-icon"><i className={`feather ${iconClass}`}></i></div>
                              </td>
                              <td>
                                {goals.length > 0 && (
                                  <ul className="list-unstyled-custom">
                                    {renderListItems(goals)}
                                  </ul>
                                )}
                              </td>
                              <td>
                                {contents.length > 0 && (
                                  <ul className="list-unstyled-custom">
                                    {renderListItems(contents)}
                                  </ul>
                                )}
                              </td>
                              <td>
                                {step.image_url ? (
                                  <div className="text-center" style={{ cursor: 'zoom-in' }} onClick={() => setZoomedImage(getFullImageUrl(step.image_url))}>
                                    <Image
                                      src={getFullImageUrl(step.image_url)}
                                      alt={step.stage || "Ảnh minh họa"}
                                      width={300}
                                      height={200}
                                      style={{ width: '100%', height: 'auto', borderRadius: '6px', objectFit: 'contain' }}
                                      unoptimized={true}
                                    />
                                  </div>
                                ) : (
                                  <div className="image-placeholder-container">
                                    <div className="img-placeholder" style={{ width: '100%', height: '140px' }}>Chưa có<br />hình ảnh</div>
                                  </div>
                                )}
                              </td>
                              <td>
                                <div className="time-cell">
                                  <i className="feather icon-calendar calendar-icon"></i>
                                  <div className="time-text" style={{ whiteSpace: 'pre-line' }}>{step.expected_time}</div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-5 text-muted">
                            Chưa có dữ liệu liệu trình chi tiết.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="note-section d-flex flex-column flex-xl-row">
                  <div className="note-label align-self-start">LƯU Ý</div>
                  <ul className="list-unstyled note-list">
                    <li><i className="feather icon-check-circle"></i>Tuân thủ hướng dẫn của bác sĩ và kỹ thuật viên phục hồi chức năng.</li>
                    <li><i className="feather icon-check-circle"></i>Không tự ý bỏ nạng hoặc tăng tải trọng khi chưa được cho phép.</li>
                    <li><i className="feather icon-check-circle"></i>Chế độ dinh dưỡng đầy đủ: giàu đạm, canxi, vitamin D, C.</li>
                    <li><i className="feather icon-check-circle"></i>Tái khám đúng hẹn để đảm bảo quá trình liền xương và phục hồi tốt nhất.</li>
                  </ul>
                  <div className="note-icons ms-xl-auto mt-3 mt-xl-0 justify-content-center">
                    <div className="note-icon-item">
                      <div className="note-icon-circle"><i className="feather icon-user"></i></div>
                      <div className="note-icon-text">Tuân thủ<br />hướng dẫn</div>
                    </div>
                    <div className="note-icon-item">
                      <div className="note-icon-circle"><i className="feather icon-alert-circle"></i></div>
                      <div className="note-icon-text">Không tự ý<br />bỏ nạng</div>
                    </div>
                    <div className="note-icon-item">
                      <div className="note-icon-circle"><i className="feather icon-heart"></i></div>
                      <div className="note-icon-text">Dinh dưỡng<br />hợp lý</div>
                    </div>
                    <div className="note-icon-item">
                      <div className="note-icon-circle"><i className="feather icon-calendar"></i></div>
                      <div className="note-icon-text">Tái khám<br />đúng hẹn</div>
                    </div>
                  </div>
                </div>

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
                    href="tel:0846555367"
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
      )
      }

      {zoomedImage && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out' }}
          onClick={() => setZoomedImage(null)}
        >
          <Image src={zoomedImage!} alt="Zoomed image" width={0} height={0} sizes="100vw" unoptimized style={{ width: 'auto', height: 'auto', maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 5px 25px rgba(0,0,0,0.5)' }} />
        </div>
      )}
    </>
  );
}

export default ServicePackage;
