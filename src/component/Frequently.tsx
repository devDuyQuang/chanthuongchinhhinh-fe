// "use client";

// import { Accordion } from "react-bootstrap";
// import { IMAGES } from "../constant/theme";
// import Link from "next/link";
// import { accordiondata } from "../constant/alldata";
// import Image from "next/image";

// type FAQItem = {
//     question?: string;
//     answer?: string;
//     title?: string;
//     content?: string;
// };

// type FAQData = {
//     title?: string;
//     description?: string;
//     image?: string;
//     contact?: {
//         text?: string;
//         phone?: string;
//     };
//     appointment_btn?: {
//         text?: string;
//         link?: string;
//     };
//     items?: FAQItem[];
// };

// type FrequentlyProps = {
//     data?: FAQData;
// };

// function Frequently({ data }: FrequentlyProps) {
//     const faqItems =
//         data?.items && data.items.length > 0
//             ? data.items.map((item, index) => ({
//                 key: String(index),
//                 delay: `${0.2 + index * 0.2}s`,
//                 title:
//                     item.question ||
//                     item.title ||
//                     accordiondata[index]?.title ||
//                     "Câu hỏi thường gặp",
//                 answer:
//                     item.answer ||
//                     item.content ||
//                     "Nội dung đang được cập nhật.",
//             }))
//             : accordiondata.map((item) => ({
//                 key: item.key,
//                 delay: item.delay,
//                 title: item.title,
//                 answer:
//                     "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
//             }));

//     return (
//         <section
//             className="content-inner"
//             style={{
//                 backgroundImage: `url(${IMAGES.bg3png.src})`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "right bottom",
//             }}
//         >
//             <div className="container">
//                 <div className="row content-wrapper style-5">
//                     <div className="col-xxl-7 col-xl-6 col-lg-5 m-b30 align-self-center">
//                         <div className="content-info">
//                             <div className="section-head style-1 m-b30">
//                                 <h2
//                                     className="title wow fadeInUp"
//                                     data-wow-delay="0.2s"
//                                     data-wow-duration="0.7s"
//                                 >
//                                     {data?.title || "Frequently Asked Questions"}
//                                 </h2>
//                                 <p
//                                     className="wow fadeInUp"
//                                     data-wow-delay="0.4s"
//                                     data-wow-duration="0.7s"
//                                 >
//                                     {data?.description ||
//                                         "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
//                                 </p>
//                             </div>

//                             <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
//                                 {faqItems.map((item, i) => (
//                                     <Accordion.Item
//                                         eventKey={item.key}
//                                         key={i}
//                                         className="wow fadeInUp"
//                                         data-wow-delay={item.delay}
//                                         data-wow-duration="0.7s"
//                                     >
//                                         <Accordion.Header>{item.title}</Accordion.Header>
//                                         <Accordion.Body>{item.answer}</Accordion.Body>
//                                     </Accordion.Item>
//                                 ))}
//                             </Accordion>
//                         </div>
//                     </div>

//                     <div className="col-xxl-5 col-xl-6 col-lg-7 m-b30">
//                         <div
//                             className="content-media"
//                             data-bottom-top="transform: translateY(50px)"
//                             data-top-bottom="transform: translateY(-50px)"
//                         >
//                             <div className="dz-media">
//                                 <Image src={IMAGES.about3} alt={data?.title || "FAQ"} />
//                             </div>

//                             <div className="item1">
//                                 <div className="info-widget style-5">
//                                     <div className="widget-media text-primary">
//                                         <i className="feather icon-phone-call dz-ring-effect" />
//                                     </div>
//                                     <div className="widget-content">
//                                         <h6 className="title">
//                                             {data?.contact?.text || "Contact us"}
//                                         </h6>
//                                         <Link
//                                             href={`tel:${data?.contact?.phone || "+11234567890"}`}
//                                             className="text-secondary"
//                                         >
//                                             {data?.contact?.phone || "+1 123 456 7890"}
//                                         </Link>
//                                     </div>
//                                 </div>

//                                 <Link
//                                     href={data?.appointment_btn?.link || "/appointment"}
//                                     className="btn btn-lg btn-icon btn-primary btn-shadow"
//                                 >
//                                     <span className="w-100">
//                                         {data?.appointment_btn?.text || "Appointment"}
//                                     </span>
//                                     <span className="right-icon">
//                                         <i className="feather icon-arrow-right" />
//                                     </span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Frequently;

"use client";

import { Accordion } from "react-bootstrap";
import { IMAGES } from "../constant/theme";
import Link from "next/link";
import { accordiondata } from "../constant/alldata";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import AppointmentButton from "./AppointmentButton";

type FAQItem = {
  question?: string;
  answer?: string;
  title?: string;
  content?: string;
};

type FAQData = {
  title?: string;
  description?: string;
  image?: string;
  contact?: {
    text?: string;
    phone?: string;
  };
  appointment_btn?: {
    text?: string;
    link?: string;
  };
  items?: FAQItem[];
  questions?: FAQItem[];
};

type FrequentlyProps = {
  data?: FAQData;
};

function Frequently({ data }: FrequentlyProps) {
  const rawFaqItems = data?.items || data?.questions || [];

  const faqItems =
    rawFaqItems.length > 0
      ? rawFaqItems.map((item, index) => ({
          key: String(index),
          delay: `${0.2 + index * 0.2}s`,
          title:
            item.question ||
            item.title ||
            accordiondata[index]?.title ||
            "Câu hỏi thường gặp",
          answer: item.answer || item.content || "Nội dung đang được cập nhật.",
        }))
      : [
          {
            key: "0",
            delay: "0.2s",
            title: "Quy trình đặt lịch khám như thế nào?",
            answer:
              "Bạn có thể đặt lịch trực tiếp trên website hoặc gọi hotline để được tư vấn và đặt lịch nhanh chóng.",
          },
          {
            key: "1",
            delay: "0.4s",
            title: "Thời gian làm việc của phòng khám?",
            answer:
              "Phòng khám làm việc từ 8:00 đến 17:30 tất cả các ngày trong tuần, kể cả thứ 7 và chủ nhật.",
          },
          {
            key: "2",
            delay: "0.6s",
            title: "Tôi có cần mang theo giấy tờ gì khi đi khám?",
            answer:
              "Bạn nên mang theo CCCD hoặc giấy tờ tùy thân và các hồ sơ bệnh án, phim chụp hoặc kết quả xét nghiệm trước đó nếu có.",
          },
          {
            key: "3",
            delay: "0.8s",
            title: "Tôi có thể chọn bác sĩ khám không?",
            answer:
              "Bạn hoàn toàn có thể yêu cầu bác sĩ mong muốn khi đặt lịch. Đội ngũ tư vấn sẽ hỗ trợ sắp xếp phù hợp.",
          },
          {
            key: "4",
            delay: "1s",
            title: "Chi phí khám và điều trị có được báo trước không?",
            answer:
              "Mọi chi phí sẽ được tư vấn rõ ràng trước khi thực hiện, đảm bảo minh bạch và phù hợp với từng trường hợp.",
          },
        ];

  const faqImage = data?.image;

  // console.log("faq data:", data);
  // console.log("faq image:", faqImage);
  // console.log("faq items:", faqItems);

  return (
    <section
      className="content-inner"
      style={{
        backgroundImage: `url(${IMAGES.bg3png.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
      }}
    >
      <div className="container">
        <div className="row content-wrapper style-5">
          <div className="col-xxl-7 col-xl-6 col-lg-5 m-b30 align-self-center">
            <div className="content-info">
              <div className="section-head style-1 m-b30">
                <h2
                  className="title wow fadeInUp fw-bold"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.7s"
                >
                  {data?.title || "Câu Hỏi Thường Gặp"}
                </h2>
                <p
                  className="wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.7s"
                >
                  {data?.description ||
                    "Giải đáp những thắc mắc phổ biến của bệnh nhân về quá trình thăm khám, điều trị và đặt lịch tại phòng khám."}
                </p>
              </div>

              <Accordion
                className="accordion dz-accordion style-1"
                defaultActiveKey="0"
              >
                {faqItems.map((item, i) => (
                  <Accordion.Item
                    eventKey={item.key}
                    key={i}
                    className="wow fadeInUp"
                    data-wow-delay={item.delay}
                    data-wow-duration="0.7s"
                  >
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="col-xxl-5 col-xl-6 col-lg-7 m-b30">
            <div
              className="content-media"
              data-bottom-top="transform: translateY(50px)"
              data-top-bottom="transform: translateY(-50px)"
            >
              <div
                className="dz-media"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "700 / 850",
                  overflow: "hidden",
                  borderRadius: "30px",
                }}
              >
                {faqImage ? (
                  <Image
                    src={faqImage}
                    alt={data?.title || "FAQ"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    unoptimized
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <Image
                    src={IMAGES.about3}
                    alt={data?.title || "FAQ"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>

              <div className="item1">
                <div className="info-widget style-5">
                  <div className="widget-media text-primary">
                    <i className="feather icon-phone-call dz-ring-effect" />
                  </div>
                  <div className="widget-content">
                    <h6 className="title">
                      {data?.contact?.text || "Liên hệ với chúng tôi"}
                    </h6>
                    <Link
                      href={`tel:${(data?.contact?.phone || "0901234567").replace(/\s+/g, "")}`}
                      className="text-secondary"
                    >
                      {data?.contact?.phone || "0901 234 567"}
                    </Link>
                  </div>
                </div>

                <AppointmentButton
                  text={data?.appointment_btn?.text || "Đặt lịch ngay"}
                  className="btn btn-lg btn-icon btn-primary btn-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Frequently;
<div className="content-item">
  <h3>Các bước điều trị</h3>
  <ul className="list-check text-secondary grid-2 m-b30">
    <li>Thăm khám ban đầu</li>
    <li>Đánh giá triệu chứng</li>
    <li>Chẩn đoán hình ảnh</li>
    <li>Tư vấn hướng điều trị</li>
    <li>Theo dõi tiến triển</li>
    <li>Hướng dẫn phục hồi</li>
  </ul>
</div>;
