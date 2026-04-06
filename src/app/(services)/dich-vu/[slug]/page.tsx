// import PageBanner from "@/component/PageBanner";
// import { IMAGES } from "@/constant/theme";
// // import Footer from "@/layout/Footer";
// import Image from "next/image";

// type PostDetail = {
//     id: number;
//     name?: string;
//     slug?: string;
//     image?: string | null;
//     description?: string | null;
// };

// type ApiResponse = {
//     success: boolean;
//     message: string;
//     data?: PostDetail;
// };

// function normalizeImageUrl(url?: string | null) {
//     if (!url) return null;

//     if (url.startsWith("http")) return url;

//     return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
// }

// async function getPost(slug: string): Promise<PostDetail | null> {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${slug}`,
//             { cache: "no-store" }
//         );

//         if (!res.ok) return null;

//         const result: ApiResponse = await res.json();
//         return result.data || null;
//     } catch (err) {
//         console.error("Lỗi lấy detail:", err);
//         return null;
//     }
// }

// async function ServiceDetail({
//     params,
// }: {
//     params: Promise<{ slug: string }>;
// }) {
//     const { slug } = await params;
//     const post = await getPost(slug);

//     if (!post) {
//         return <div className="container py-5">Không tìm thấy dịch vụ</div>;
//     }

//     return (
//         <>
//             <main className="page-content">
//                 <PageBanner
//                     title={post.name || "Chi tiết dịch vụ"}
//                     bnrimage={IMAGES.bnr2.src}
//                 />

//                 <section className="content-inner service-single">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-8 single-inner">
//                                 {post.image && (
//                                     <div className="single-media dz-media height-sm radius-lg m-b30">
//                                         <Image
//                                             src={normalizeImageUrl(post.image)!}
//                                             alt={post.name || ""}
//                                             width={800}
//                                             height={500}
//                                             style={{ width: "100%", height: "auto" }}
//                                             unoptimized
//                                         />
//                                     </div>
//                                 )}

//                                 <div className="content-item">
//                                     <h2>{post.name}</h2>
//                                     <p>{post.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>

//             {/* <Footer /> */}
//         </>
//     );
// }

// export default ServiceDetail;

import Link from "next/link";
import { IMAGES } from "@/constant/theme";
// import Footer from "@/layout/Footer";
import PageBanner from "@/component/PageBanner";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import SurgeryBlog from "../../service-detail/_components/SurgeryBlog";
import AccordionBlog from "../../service-detail/_components/AccordionBlog";
import { worldclasslistdata } from "@/constant/alldata";
import { SiteCommonData } from "@/types/site";
type PostDetail = {
  id: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
  content?: string | null;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data?: PostDetail;
};
type SpecialistItem = {
  name?: string;
  specialty?: string;
  button_text?: string;
  button_link?: string;
  image?: string;
  socials?: {
    linkedin?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    youtube?: string | null;
  };
};

type FAQItem = {
  question?: string;
  answer?: string;
  title?: string;
  content?: string;
};

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    specialists_home_clinic?: {
      items?: SpecialistItem[];
    };
    faq_home_clinic?: {
      items?: FAQItem[];
      questions?: FAQItem[];
    };
    site?: SiteCommonData;
  };
};

async function getSetting(): Promise<SettingResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy setting:", error);
    return null;
  }
}

async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const result: ApiResponse = await res.json();
    return result.data || null;
  } catch (err) {
    console.error("Lỗi lấy detail:", err);
    return null;
  }
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, setting] = await Promise.all([getPost(slug), getSetting()]);

  if (!post) {
    return <div className="container py-5">Không tìm thấy dịch vụ</div>;
  }

  const specialists = setting?.data?.specialists_home_clinic;

  const faqHome = setting?.data?.faq_home_clinic;
  const faqItems = faqHome?.items || faqHome?.questions || [];

  return (
    <>
      <main className="page-content">
        <PageBanner
          title={post.name || "Chi tiết dịch vụ"}
          bnrimage={IMAGES.bnr2.src}
        />

        <section className="content-inner service-single">
          <div className="container">
            <div className="row">
              {/* LEFT CONTENT */}
              <div className="col-lg-8 single-inner order-lg-1">
                {/* IMAGE */}
                {post.image && (
                  <div className="single-media dz-media height-sm radius-lg m-b30">
                    <Image
                      src={normalizeImageUrl(post.image)!}
                      alt={post.name || ""}
                      width={800}
                      height={500}
                      style={{ width: "100%", height: "auto" }}
                      unoptimized
                    />
                  </div>
                )}

                {/* TITLE + DESCRIPTION */}
                <div className="content-item m-b30">
                  <h2>{post.name}</h2>
                  {post.description && <p>{post.description}</p>}
                </div>

                {/* FULL CONTENT HTML */}
                {post.content && (
                  <div
                    className="content-item"
                    dangerouslySetInnerHTML={{
                      __html: post.content,
                    }}
                  />
                )}
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
                  {/* <ul className="list-check text-secondary grid-2 m-b30">
                    {worldclasslistdata.map((item, i) => (
                    //   <li key={i}>{item.title}</li>
                    ))}
                  </ul> */}
                </div>

                <div className="content-item">
                  <h3>Đội ngũ bác sĩ chuyên khoa</h3>
                  <SurgeryBlog doctors={specialists?.items} />
                </div>

                <div className="content-item">
                  <h3>Câu hỏi thường gặp</h3>
                  <AccordionBlog items={faqItems} />
                </div>
              </div>

              {/* SIDEBAR (tạm giữ template, sửa sau) */}
              <div className="col-lg-4 m-b30">
                <aside className="side-bar sticky-top left">
                  <div className="widget service_menu_nav bg-secondary">
                    <div className="widget-title">
                      <h4 className="title">Dịch vụ</h4>
                    </div>
                    <ul>
                      <li>
                        <Link href="/dich-vu">Tất cả dịch vụ</Link>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="widget_contact"
                    style={{
                      backgroundImage: `url(${IMAGES.bg3png.src})`,
                    }}
                  >
                    <div className="widget-content">
                      <Image src={IMAGES.question} width={80} alt="" />
                      <h4 className="title">Bạn cần hỗ trợ?</h4>
                      <div className="phone-number">
                        <Link href="tel:+84901234567">+84 901 234 567</Link>
                      </div>
                      <div className="email">
                        <Link href="mailto:info@gmail.com">info@gmail.com</Link>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}
