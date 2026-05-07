// import PageBanner from "@/component/PageBanner";
// import { IMAGES } from "@/constant/theme";
// // import Footer from "@/layout/Footer";
// // import Header from "@/layout/Header";
// import AppointmentData from "@/component/AppointmentData";
// import Whychoose from "@/component/WhyChoose";
// import Frequently from "@/component/Frequently";
// import Alllocation from "@/component/Alllocation";

// const Appointment = () => {
//     return (
//         <>
//             <main className="page-content">
//                 <PageBanner title="Appointment" bnrimage={IMAGES.bnr2.src} />
//                 <AppointmentData />
//                 <section className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden" style={{ backgroundImage: `URL(${IMAGES.bg1.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
//                     <div className="container">
//                         <Whychoose />
//                     </div>
//                 </section>
//                 <Alllocation />
//                 <Frequently />
//             </main>
//             {/* <Footer />  */}
//         </>
//     )
// }
// export default Appointment;

export const dynamic = "force-dynamic";

import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import AppointmentData from "@/component/AppointmentData";
import Whychoose from "@/component/WhyChoose";
import Frequently from "@/component/Frequently";
import Alllocation from "@/component/Alllocation";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    appointment_home_clinic?: {
      title?: string;
      subtitle?: string;
      appointment_now_text?: string;
      button_text?: string;
      button_link?: string;
      image?: string;
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
        title?: string;
        content?: string;
      }[];
    };
    contact_page_locations_clinic?: {
      section_title?: string;
      items?: {
        name?: string;
        address?: string;
        service_time?: string;
        google_link?: string;
        map_iframe?: string;
      }[];
    };
  };
};

async function getSetting(): Promise<SettingResponse | null> {
  try {
    const res = await fetch(`${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`, {
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

const Appointment = async () => {
  const setting = await getSetting();

  const appointment = setting?.data?.appointment_home_clinic;
  const whyChoose = setting?.data?.why_choose_us_home_clinic;
  const locations = setting?.data?.contact_page_locations_clinic;

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
        <PageBanner title="Appointment" bnrimage={IMAGES.bnr2.src} />

        <AppointmentData data={appointment} />

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
            <Whychoose data={whyChoose} />
          </div>
        </section>

        <Alllocation data={locations} />
        <Frequently data={faq} />
      </main>
    </>
  );
};

export default Appointment;
