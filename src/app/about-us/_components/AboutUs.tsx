// "use client"
// import { useRef, useState } from "react";
// import { Dropdown } from "react-bootstrap";
// import Link from "next/link";

// import { IMAGES } from "@/constant/theme";

// import PageBanner from "@/component/PageBanner";
// import WorldClass from "@/component/WorldClass";
// import Lightgallerydata from "@/component/LightGalleryData";
// import Whychoose from "@/component/WhyChoose";
// import MeetDr from "@/component/MeetDr";
// import Empoly from "@/component/EmpolyBlog";
// import RealPatient from "@/component/RealPatient";
// import Schedule from "@/component/Schedule";
// import Clientswiper1 from "@/component/Clientswiper1";
// import Connect from "@/component/Connect";
// import Inspirational from "@/component/Inspirational";
// import { useEmailService } from "@/constant/useEmailService";

// function AboutUs() {
//     const [selectCat, setSelectCat] = useState("Angioplasty");
//     const form = useRef<HTMLFormElement | null>(null);
//     const { sendEmail } = useEmailService();
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!form.current) return;
//         const result = await sendEmail(form.current);
//         if (result.success) {
//             console.log('SUCCESS!', result.message);
//         } else {
//             console.error('FAILED...', result.message);
//         }
//     };
//     return (
//         <>
//             <main className="page-content">
//                 <PageBanner title="About Us" bnrimage={IMAGES.bnr1.src} />
//                 <section className="content-inner" style={{ backgroundImage: `url(${IMAGES.bg1png.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom' }}>
//                     <div className="container">
//                         <WorldClass />
//                     </div>
//                 </section>
//                 <Lightgallerydata />
//                 <Inspirational />
//                 <section className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden" style={{ backgroundImage: `URL(${IMAGES.bg1.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
//                     <div className="container">
//                         <Whychoose />
//                     </div>
//                 </section>
//                 <MeetDr />
//                 <section className="content-inner">
//                     <div className="container">
//                         <div className="section-head style-1 m-b30 row align-items-end">
//                             <div className="col-sm-7 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
//                                 <h2 className="title m-b0">We Employ only <br /> Specialists </h2>
//                             </div>
//                             <div className="col-sm-5 text-sm-end d-sm-block d-none wow fadeInUp" data-wow-delay="0.4s"
//                                 data-wow-duration="0.8s">
//                                 <Link href="/team" className="btn btn-icon btn-primary btn-shadow"> View All
//                                     <span className="right-icon"><i className="feather icon-arrow-right" /></span>
//                                 </Link>
//                             </div>
//                         </div>
//                         <Empoly />
//                     </div>
//                 </section>
//                 <section className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden" style={{ backgroundImage: `url(${IMAGES.bg3.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'cover' }}>
//                     <RealPatient />
//                 </section>
//                 <section className="content-inner">
//                     <div className="container">
//                         <div className="row g-xl-4 align-items-center">
//                             <Connect />
//                             <div className="col-xl-5 m-b30" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
//                                 <div className="form-wrapper style-1">
//                                     <div className="form-body bg-primary background-blend-burn" style={{ backgroundImage: `url(${IMAGES.bg2png.src})` }}>
//                                         <div className="title-head">
//                                             <h2 className="form-title m-b0">Make An <span>Appointment</span> <br /> Apply For Treatments</h2>
//                                         </div>
//                                         <form ref={form} onSubmit={handleSubmit} className="dzForm">
//                                             <input type="hidden" className="form-control" name="dzToDo" value="Appointment" />
//                                             <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />
//                                             <div className="dzFormMsg"></div>
//                                             <div className="row">
//                                                 <div className="col-sm-6 m-b30">
//                                                     <div className="form-floating floating-underline input-light">
//                                                         <input name="dzName" type="text" className="form-control" id="inputYourName" placeholder="Your Name" />
//                                                         <label htmlFor="inputYourName">Your Name</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6 m-b30">
//                                                     <div className="form-floating floating-underline input-light">
//                                                         <input name="dzEmail" type="email" className="form-control" id="inputYourEmail" placeholder="Your Email" />
//                                                         <label htmlFor="inputYourEmail">Your Email</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6 m-b30">
//                                                     <div className="form-floating floating-underline input-light">
//                                                         <input name="dzPhoneNumber" type="number" className="form-control dz-number" id="inputPhoneNumber" placeholder="Phone Number" />
//                                                         <label htmlFor="inputPhoneNumber">Phone Number</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6 m-b30">
//                                                     <div className="form-floating floating-underline input-light">
//                                                         <Dropdown className="form-control bs-select">
//                                                             <Dropdown.Toggle as="div" >
//                                                                 {selectCat}
//                                                             </Dropdown.Toggle>
//                                                             <Dropdown.Menu>
//                                                                 <Dropdown.Item onClick={() => setSelectCat("Angioplasty")}>Angioplasty</Dropdown.Item>
//                                                                 <Dropdown.Item onClick={() => setSelectCat("Cardiology")}>Cardiology</Dropdown.Item>
//                                                                 <Dropdown.Item onClick={() => setSelectCat("Dental")}>Dental</Dropdown.Item>
//                                                                 <Dropdown.Item onClick={() => setSelectCat("Eye Care")}>Eye Care</Dropdown.Item>
//                                                             </Dropdown.Menu>
//                                                         </Dropdown>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-12 m-b30">
//                                                     <div className="form-floating floating-underline input-light">
//                                                         <textarea name="dzMessage" className="form-control" id="inputMessage" rows={6} placeholder="Select Service"></textarea>
//                                                         <label htmlFor="inputMessage">Message</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-12">
//                                                     <button type="submit" name="submit" value="submit" className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
//                                                         Appointment <span className="right-icon"><i className="feather icon-arrow-right" /></span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <Schedule />
//                 <Clientswiper1 />
//             </main>
//         </>
//     );
// }
// export default AboutUs;

export const dynamic = "force-dynamic";
import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import WorldClass from "@/component/WorldClass";
import LightGalleryData from "@/component/LightGalleryData";
import Inspirational from "@/component/Inspirational";
import WhyChoose from "@/component/WhyChoose";
import MeetDr from "@/component/MeetDr";
import Empoly from "@/component/EmpolyBlog";
import RealPatient from "@/component/RealPatient";
import Connect from "@/component/Connect";
import Schedule from "@/component/Schedule";
import Clientswiper1 from "@/component/Clientswiper1";
import AboutAppointmentForm from "./AboutAppointmentForm";
import { IMAGES } from "@/constant/theme";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type AboutGalleryData = {
  images?: string[];
};

type AboutVisionMissionItem = {
  icon?: string;
  title?: string;
  description?: string;
};

type AboutVisionMissionData = {
  subtitle?: string;
  title?: string;
  description?: string;
  image?: string;
  items?: AboutVisionMissionItem[];
};

type AboutConsultationData = {
  title?: string;
  btn_text?: string;
  btn_link?: string;
  image?: string;
};

type AboutInsuranceData = {
  title?: string;
  logos?: string[];
};

type WhyChooseItem = {
  title?: string;
  description?: string;
};

type WhyChooseData = {
  title?: string;
  experience_number?: string;
  experience_label?: string;
  image?: string;
  items?: WhyChooseItem[];
};

type OpenHourItem = {
  day?: string;
  time?: string;
};

type WorldClassData = {
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  phone?: string;
  image_one?: string;
  image_two?: string;
  open_hours?: OpenHourItem[];
  utilities?: string[];
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

type SpecialistsData = {
  title?: string;
  view_all_link?: string;
  items?: SpecialistItem[];
};
type DoctorAchievement = {
  image?: string;
  title?: string;
  subtitle?: string;
  link_text?: string;
};

type DoctorHomeData = {
  title?: string;
  doctor_name?: string;
  description?: string;
  skills_header?: string;
  image?: string;
  experience?: {
    number?: string;
    label?: string;
  };
  skills?: string[];
  achievements?: DoctorAchievement[];
};

type TestimonialItem = {
  name?: string;
  role?: string;
  title?: string;
  review?: string;
  video_link?: string;
  image?: string;
};

type TestimonialsData = {
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
  items?: TestimonialItem[];
};

type ConnectData = {
  title?: string;
  description?: string;
  address?: {
    label?: string;
    value?: string;
  };
  phone?: {
    label?: string;
    value?: string;
  };
  email?: {
    label?: string;
    value?: string;
  };
  time?: {
    label?: string;
    value?: string;
  };
  appointment_btn?: {
    text?: string;
    link?: string;
  };
  rating?: {
    score?: string;
    text?: string;
  };
  stats_text?: string;
};

type SiteCommonData = {
  company?: string | null;
  description?: string | null;
  map?: string | null;

  email_icon?: string | null;
  email_title?: string | null;
  email_description?: string | null;
  email_placeholder?: string | null;

  phone_icon?: string | null;
  phone_title?: string | null;
  phone_description?: string | null;

  address_icon?: string | null;
  address_title?: string | null;
  address_description?: string | null;

  time_icon?: string | null;
  time_title?: string | null;
  time_description?: string | null;

  btn_appointment_title?: string | null;
  btn_appointment_link?: string | null;

  contact_title?: string | null;
  contact_description?: string | null;
};

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    about_page_hero_clinic?: {
      banner_hero?: string;
    };
    about_page_gallery_clinic?: AboutGalleryData;
    about_page_vision_mission_clinic?: AboutVisionMissionData;
    about_page_consultation_clinic?: AboutConsultationData;
    about_page_insurance_clinic?: AboutInsuranceData;
    why_choose_us_home_clinic?: WhyChooseData;
    utilities_home_clinic?: WorldClassData;
    specialists_home_clinic?: SpecialistsData;
    doctor_home_clinic?: DoctorHomeData;
    testimonials_home_clinic?: TestimonialsData;
    site?: SiteCommonData;
    contact_home_clinic?: ConnectData;
  };
};

function mapSiteToConnectData(site?: SiteCommonData): ConnectData | undefined {
  if (!site) return undefined;

  return {
    title: site.contact_title || undefined,
    description: site.contact_description || undefined,
    address: {
      label: site.address_title || undefined,
      value: site.address_description || undefined,
    },
    phone: {
      label: site.phone_title || undefined,
      value: site.phone_description || undefined,
    },
    email: {
      label: site.email_title || undefined,
      value: site.email_description || undefined,
    },
    time: {
      label: site.time_title || undefined,
      value: site.time_description || undefined,
    },
    appointment_btn: {
      text: site.btn_appointment_title || undefined,
      link: site.btn_appointment_link || undefined,
    },
  };
}

function mergeConnectData(
  primary?: ConnectData,
  fallback?: ConnectData,
): ConnectData | undefined {
  if (!primary && !fallback) return undefined;

  return {
    title: primary?.title || fallback?.title,
    description: primary?.description || fallback?.description,
    stats_text: primary?.stats_text || fallback?.stats_text,
    rating: {
      score: primary?.rating?.score || fallback?.rating?.score,
      text: primary?.rating?.text || fallback?.rating?.text,
    },
    appointment_btn: {
      text: primary?.appointment_btn?.text || fallback?.appointment_btn?.text,
      link: primary?.appointment_btn?.link || fallback?.appointment_btn?.link,
    },
    address: {
      label: primary?.address?.label || fallback?.address?.label,
      value: primary?.address?.value || fallback?.address?.value,
    },
    phone: {
      label: primary?.phone?.label || fallback?.phone?.label,
      value: primary?.phone?.value || fallback?.phone?.value,
    },
    email: {
      label: primary?.email?.label || fallback?.email?.label,
      value: primary?.email?.value || fallback?.email?.value,
    },
    time: {
      label: primary?.time?.label || fallback?.time?.label,
      value: primary?.time?.value || fallback?.time?.value,
    },
  };
}

async function getSetting(): Promise<SettingResponse | null> {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Fetch setting failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy setting:", error);
    return null;
  }
}

// function normalizeImageUrl(url?: string | null): string | undefined {
//     if (!url) return undefined;

//     if (url.startsWith("http://") || url.startsWith("https://")) {
//         return url;
//     }

//     if (url.startsWith("/storage/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}${url}`;
//     }

//     if (url.startsWith("storage/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${url}`;
//     }

//     if (url.startsWith("/uploads/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage${url}`;
//     }

//     if (url.startsWith("uploads/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage/${url}`;
//     }

//     return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage/${url}`;
// }

async function AboutUs() {
  const setting = await getSetting();
  const data = setting?.data;

  const aboutHero = data?.about_page_hero_clinic;
  const aboutGallery = data?.about_page_gallery_clinic;
  const aboutVisionMission = data?.about_page_vision_mission_clinic;
  const aboutConsultation = data?.about_page_consultation_clinic;
  const aboutInsurance = data?.about_page_insurance_clinic;
  const whyChoose = data?.why_choose_us_home_clinic;
  const facility = data?.utilities_home_clinic;
  const specialists = data?.specialists_home_clinic;
  const doctorData = data?.doctor_home_clinic;
  const testimonialData = data?.testimonials_home_clinic;
  const siteCommon = data?.site;
  const connectHome = data?.contact_home_clinic;

  const connectFallback = mapSiteToConnectData(siteCommon);
  const connectData = mergeConnectData(connectHome, connectFallback);

  const bannerUrl = aboutHero?.banner_hero
    ? `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${aboutHero.banner_hero}`
    : undefined;
  //  const bannerUrl = aboutHero?.banner_hero
  //         ? `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage/${aboutHero.banner_hero}`
  //         : undefined;
  return (
    <main className="page-content">
      <PageBanner
        title="Về chúng tôi"
        bnrimage={bannerUrl || IMAGES.bnr1.src}
      />

      <section
        className="content-inner"
        style={{
          backgroundImage: `url(${IMAGES.bg1png.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
        }}
      >
        <div className="container">
          <WorldClass data={facility} />
        </div>
      </section>

      <LightGalleryData data={aboutGallery} />

      <Inspirational data={aboutVisionMission} />

      <section
        className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGES.bg1.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      >
        <div className="container">
          <WhyChoose data={whyChoose} />
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
