// import PageBanner from "@/component/PageBanner";
// import { IMAGES } from "@/constant/theme";
// import Footer from "@/layout/Footer";
// import Header from "@/layout/Header";
// import ServiceBox from "@/component/ServiceBox";
// import Whychoose from "@/component/WhyChoose";
// import Pricing from "@/component/Pricing";
// import RealPatient from "@/component/RealPatient";
// import Frequently from "@/component/Frequently";

// function Services() {
//     return (
//         <>
//             <main className="page-content">
//                 <PageBanner title="Services" bnrimage={IMAGES.bnr2.src} />
//                 <section className="content-inner bg-light" style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}>
//                     <div className="container">
//                         <ServiceBox />
//                     </div>
//                 </section>
//                 <section className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden" style={{ backgroundImage: `URL(${IMAGES.bg1.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
//                     <div className="container">
//                         <Whychoose />
//                     </div>
//                 </section>
//                 <section className="content-inner">
//                     <div className="container">
//                         <div className="section-head style-1 text-center">
//                             <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">Choose Your Optimal Plan</h2>
//                             <p className="wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//                         </div>
//                         <Pricing />
//                     </div>
//                 </section>
//                 <section className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden" style={{ backgroundImage: `url(${IMAGES.bg3.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'cover' }}>
//                     <RealPatient />
//                 </section>
//                 <Frequently />
//             </main>
//             <Footer />
//         </>
//     );
// }
// export default Services;

export const dynamic = "force-dynamic";

import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
// import Footer from "@/layout/Footer";
import ServiceBox from "@/component/ServiceBox";
import Whychoose from "@/component/WhyChoose";
import Pricing from "@/component/Pricing";
import RealPatient from "@/component/RealPatient";
import Frequently from "@/component/Frequently";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import WhyChoose from "@/component/WhyChoose";
type ServicePlanItem = {
  name?: string;
  price?: string;
  period?: string;
  btn_text?: string;
  btn_link?: string;
  features?: string[];
};

type CategoryPostItem = {
  id: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
  created_at?: string;
  views?: number;
  favorites?: number;
};

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    service_hero_clinic?: {
      title?: string;
      banner_hero?: string;
    };
    services_home_clinic?: ServicesHomeClinicData;
    service_plans_clinic?: {
      title?: string;
      description?: string;
      features_pool?: string[];
      items?: ServicePlanItem[];
    };
    why_choose_us_home_clinic?: {
      title?: string;
      experience_number?: string;
      experience_label?: string;
      image?: string;
      items?: {
        title?: string;
        description?: string;
      }[];
    };
    testimonials_home_clinic?: {
      main_title?: string;
      main_image?: string;
      floating_review?: {
        name?: string;
        rating?: string;
        text?: string;
        avatar?: string;
      };
      achievement?: {
        number?: string;
        text?: string;
        avatars?: string[];
      };
      items?: {
        name?: string;
        role?: string;
        title?: string;
        review?: string;
        video_link?: string;
        image?: string;
      }[];
    };
    faq_home_clinic?: {
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
      items?: {
        question?: string;
        answer?: string;
      }[];
    };
  };
};

type CategoryResponse = {
  success: boolean;
  message: string;
  data?: {
    id?: number;
    name?: string;
    slug?: string;
    description?: string | null;
    posts?: {
      current_page?: number;
      data?: CategoryPostItem[];
    };
    breadcrumbs?: {
      name?: string;
      slug?: string;
      active?: boolean;
    }[];
  };
};
type ServiceHomeItem = {
  title?: string;
  description?: string | null;
  doctor_text?: string;
  link?: string;
  image?: string | null;
};

type ServicesHomeClinicData = {
  title?: string;
  subtitle?: string;
  view_all_link?: string;
  items?: ServiceHomeItem[];
};
async function getSetting(): Promise<SettingResponse | null> {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error(`Fetch setting failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy setting:", error);
    return null;
  }
}

async function getServiceCategoryPosts(): Promise<CategoryPostItem[]> {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/category/dich-vu-dieu-tri?fields=id,name,slug,description`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error(`Fetch category posts failed: ${res.status}`);

    const json: CategoryResponse = await res.json();
    return json?.data?.posts?.data || [];
  } catch (error) {
    console.error("Lỗi lấy bài viết dịch vụ:", error);
    return [];
  }
}

async function Services() {
  const [setting, servicePosts] = await Promise.all([
    getSetting(),
    getServiceCategoryPosts(),
  ]);

  const serviceHero = setting?.data?.service_hero_clinic;
  const servicePlans = setting?.data?.service_plans_clinic;
  const whyChoose = setting?.data?.why_choose_us_home_clinic;
  const bannerUrl = normalizeImageUrl(serviceHero?.banner_hero);
  const servicesHome = setting?.data?.services_home_clinic;
  const testimonials = setting?.data?.testimonials_home_clinic;
  const rawFaq = setting?.data?.faq_home_clinic;

  const faq = rawFaq
    ? {
        ...rawFaq,
        image: normalizeImageUrl(rawFaq.image),
      }
    : undefined;
  return (
    <>
      <main className="page-content">
        <PageBanner
          title={serviceHero?.title || "Services"}
          bnrimage={bannerUrl || IMAGES.bnr2.src}
        />

        <section
          className="content-inner bg-light"
          style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}
        >
          <div className="container">
            {/* <ServiceBox posts={servicePosts} useFallback={true} /> */}
            <ServiceBox data={servicesHome} posts={servicePosts} />
          </div>
        </section>

        <section
          className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden"
          style={{
            backgroundImage: `URL(${IMAGES.bg1.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className="container">
            <WhyChoose data={whyChoose} />
          </div>
        </section>

        <section className="content-inner">
          <div className="container">
            <div className="section-head style-1 text-center">
              <h2
                className="title wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.7s"
              >
                {servicePlans?.title || "Choose Your Optimal Plan"}
              </h2>
              <p
                className="wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.7s"
              >
                {servicePlans?.description ||
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
              </p>
            </div>

            <Pricing data={servicePlans} />
          </div>
        </section>

        <section
          className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden"
          style={{
            backgroundImage: `url(${IMAGES.bg3.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "cover",
          }}
        >
          <RealPatient data={testimonials} />
        </section>

        <Frequently data={faq} />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Services;
