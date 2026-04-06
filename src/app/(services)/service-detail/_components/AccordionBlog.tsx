// "use client"
// import { Accordion } from "react-bootstrap"
// import { accordiondata } from "@/constant/alldata";

// const AccordionBlog = () =>{
//     return(
//         <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
//             {accordiondata.map((data, i) => (
//                 <Accordion.Item eventKey={data.key} key={i} className="wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.7s">
//                     <Accordion.Header>{data.title}</Accordion.Header>
//                     <Accordion.Body>
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
//                     </Accordion.Body>
//                 </Accordion.Item>
//             ))}
//         </Accordion>
//     )
// }
// export default AccordionBlog;

"use client";

import { Accordion } from "react-bootstrap";
import { accordiondata } from "@/constant/alldata";

type FAQItem = {
  question?: string;
  answer?: string;
  title?: string;
  content?: string;
};

type AccordionBlogProps = {
  items?: FAQItem[];
};

const AccordionBlog = ({ items }: AccordionBlogProps) => {
  // nếu có data từ backend thì dùng, không thì fallback template
  const faqItems =
    items && items.length > 0
      ? items.map((item, index) => ({
          key: String(index),
          delay: `${0.2 + index * 0.2}s`,
          title: item.question || item.title || "Câu hỏi thường gặp",
          answer: item.answer || item.content || "Nội dung đang được cập nhật.",
        }))
      : accordiondata.map((data) => ({
          key: data.key,
          delay: data.delay,
          title: data.title,
          answer: "Nội dung đang được cập nhật.",
        }));

  return (
    <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
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
  );
};

export default AccordionBlog;
