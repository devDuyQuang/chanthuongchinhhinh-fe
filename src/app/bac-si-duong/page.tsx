export const dynamic = "force-dynamic";

import { IMAGES } from "@/constant/theme";
import Clientswiper1 from "@/component/Clientswiper1";
import PageBanner from "@/component/PageBanner";
import Schedule from "@/component/Schedule";
import StayInformed from "@/component/StayInformed";
import { worldclasslistdata } from "@/constant/alldata";
import Image from "next/image";
import { Post } from "@/types/post";
import LightGalleryData from "@/component/LightGalleryData";
import Inspirational from "@/component/Inspirational";
import ConsultationSection from "@/component/ConsultationSection";
import Frequently from "@/component/Frequently";
import Awards from "@/component/Awards";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import RealPatient from "@/component/RealPatient";

const apiBaseUrl =
  (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
    /^https?:\/\//,
    (match) => match + "api.",
  ) || "http://api.localhost:8000";

// Domain gốc dùng để tải ảnh tĩnh từ Laravel
const storageUrl = apiBaseUrl.replace("api.", "");

async function getSetting() {
  try {
    const res = await fetch(`${apiBaseUrl}/setting`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fetch setting failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy setting:", error);
    return null;
  }
}
const apiResponse = {
  message: "Đã lưu phần đầu.",
  key: "about_page_hero_clinic",
  value: {
    banner_hero: "uploads/settings/about_hero_1779092792.jpg",
  },
};

const apiData = {
  message: "Đã lưu đặt lịch tư vấn.",
  key: "about_page_consultation_clinic",
  value: {
    title: "Đặt Lịch Tư Vấn",
    btn_text: "Đặt lịch ngay",
    btn_link: "/dat-lich-kham",
    image: "uploads/settings/about_consultation_1779167017.jpg",
  },
};

async function BacsiDuong() {
  const setting = await getSetting();
  const data = setting?.data;

  // 1. Xử lý phần Banner Hero (Ưu tiên data thật từ API, fallback về mock data của anh)
  const aboutHero = data?.about_page_hero_clinic;

  // console.log("====================================");
  // console.log(
  //   "DỮ LIỆU ABOUT HERO THỰC TẾ TỪ API:",
  //   JSON.stringify(aboutHero, null, 2),
  // );
  // console.log("====================================");

  // Lấy ra chuỗi path hình ảnh từ data trả về
  const bannerHeroPath = aboutHero?.banner_hero;
  // Ghép nối chuỗi domain tĩnh để hiển thị ảnh từ Laravel
  const finalBannerUrl = bannerHeroPath
    ? `${storageUrl}/${bannerHeroPath}`
    : IMAGES.bnr1;

  const aboutGallery = data?.about_page_gallery_clinic;
  const aboutConsultation = data?.about_page_consultation_clinic;
  const aboutInsurance = data?.about_page_insurance_clinic;
  const aboutVisionMission = data?.about_page_vision_mission_clinic;
  const awards = setting?.data?.awards_home;

  return (
    <>
      <main className="page-content">
        <PageBanner title="Bác Sĩ Dương" bnrimage={finalBannerUrl} />
        {/* <section className="content-inner-2" style={{ marginBottom: "70px" }}>
          <div className="container">
            <div className="row g-3 g-lg-4 align-items-center">
              <div className="col-lg-5">
                <div className="section-head style-1 mb-0">
                  <h2
                    className="title wow fadeInUp"
                    data-wow-delay="0.2s"
                    data-wow-duration="0.8s"
                  >
                    My First Visitssss
                  </h2>
                  <h3
                    className="font-24 text-primary m-b20 wow fadeInUp"
                    data-wow-delay="0.4s"
                    data-wow-duration="0.8s"
                  >
                    We Welcome New Patients
                  </h3>
                  <p
                    className="wow fadeInUp"
                    data-wow-delay="0.6s"
                    data-wow-duration="0.8s"
                  >
                    We warmly welcome new patients of all ages to our practice.
                    During your first visit, you will have the chance to meet
                    our dedicated team and get acquainted with Dr. Nambisan. We
                    are committed to educating you about your dental needs and
                    addressing any questions or concerns you may have about your
                    treatment.
                  </p>
                  <p
                    className="m-b0 wow fadeInUp"
                    data-wow-delay="0.8s"
                    data-wow-duration="0.8s"
                  >
                    Our goal is to provide you with the highest standard of
                    dental care available today. Thank you for choosing our
                    dental office. We look forward to meeting you and helping
                    you achieve optimal oral health.
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div
                  className="dz-media radius-lg height-sm ms-xl-4 wow fadeInUp"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.8s"
                >
                  <Image
                    src={IMAGES.about7}
                    alt=""
                    className="object-fit-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <Inspirational data={aboutVisionMission} />

        <LightGalleryData data={aboutGallery} />

        {/* <section className="content-inner-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-5 m-b30">
                <div
                  className="dz-media radius-md height-lg me-xl-4 wow fadeInUp"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.8s"
                >
                  <Image
                    src={IMAGES.about6}
                    alt=""
                    className="object-fit-cover"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 m-b30">
                <div className="section-head style-1 mb-0">
                  <h2
                    className="title wow fadeInUp"
                    data-wow-delay="0.2s"
                    data-wow-duration="0.8s"
                  >
                    Your first visit with <br /> us may include
                  </h2>
                  <p
                    className="m-b30 wow fadeInUp"
                    data-wow-delay="0.4s"
                    data-wow-duration="0.8s"
                  >
                    Patients are typically referred to us by their general
                    dentist, who identifies specific periodontal issues that
                    need to be addressed. We collaborate closely with your
                    general dentist to ensure the best possible treatment
                    outcomes.
                  </p>
                  <h3
                    className="font-24 m-b15 wow fadeInUp"
                    data-wow-delay="0.6s"
                    data-wow-duration="0.8s"
                  >
                    Our Services Include:
                  </h3>
                  <ul
                    className="list-check text-secondary grid-2 fw-medium m-b30 wow fadeInUp"
                    data-wow-delay="0.8s"
                    data-wow-duration="0.8s"
                  >
                    {worldclasslistdata.map((item, i) => (
                      <li key={i}>{item.title}</li>
                    ))}
                  </ul>
                  <p
                    className="m-b0 wow fadeInUp"
                    data-wow-delay="0.8s"
                    data-wow-duration="0.8s"
                  >
                    We maintain communication with your referring dentist to
                    ensure a coordinated approach to your treatment plan. During
                    your visit, we will thoroughly address any questions you
                    have about your oral health. Additionally, we provide a
                    detailed financial consultation to help you plan your
                    treatments effectively and affordably.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <StayInformed posts={[] as unknown as Post[]} /> */}
        <Awards data={awards} />
      </main>
      {/* <Footer />             */}
    </>
  );
}
export default BacsiDuong;
