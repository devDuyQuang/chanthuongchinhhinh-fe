// import Link from "next/link";
// import { IMAGES } from "../constant/theme";

// function Schedule() {
//     return (
//         <>
//             <section className="clearfix">
//                 <div className="container">
//                     <div className="row content-wrapper style-16" style={{ backgroundImage: `url(${IMAGES.callaction.src})` }}>
//                         <div className="col-xl-6 col-md-7 col-sm-9">
//                             <div className="section-head style-3 position-relative mb-0 z-2">
//                                 <h2 className="title m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Schedule Your Consultation Today!</h2>
//                                 <Link href="/appointment" className="btn btn-lg btn-icon btn-primary btn-shadow wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
//                                     <span className="w-100">Appointment</span> <span className="right-icon"><i className="feather icon-arrow-right" /></span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
// export default Schedule;

import Link from "next/link";
import { IMAGES } from "../constant/theme";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import AppointmentButton from "./AppointmentButton";

type ScheduleData = {
  title?: string;
  btn_text?: string;
  btn_link?: string;
  image?: string;
};

type ScheduleProps = {
  data?: ScheduleData;
};

function Schedule({ data }: ScheduleProps) {
  const bgImage = normalizeImageUrl(data?.image);

  return (
    <section className="clearfix">
      <div className="container">
        <div
          className="row content-wrapper style-16"
          style={{
            backgroundImage: `url(${bgImage || IMAGES.callaction.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="col-xl-6 col-md-7 col-sm-9">
            <div className="section-head style-3 position-relative mb-0 z-2">
              <h2
                className="title m-b30 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                {data?.title || "Đặt lịch tư vấn ngay hôm nay!"}
              </h2>

              <Link
                href={data?.btn_link || "/dat-lich-kham"}
                className="btn btn-lg btn-icon btn-primary btn-shadow wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
              >
                <span className="w-100">
                  {data?.btn_text || "Đặt lịch ngay"}
                </span>
                <span className="right-icon">
                  <i className="feather icon-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
