export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constant/theme";
import DiagnosisReport from "./_components/DiagnosisReport";
import WorldClass from "@/component/WorldClass";
import Counter from "@/component/Counter";
import ServiceBox from "@/component/ServiceBox";
import AppointmentData from "@/component/AppointmentData";
import AppointmentButton from "@/component/AppointmentButton";
import WhyChoose from "@/component/WhyChoose";
import RealPatient from "@/component/RealPatient";
import Howitwork from "@/component/Howitwork";
import ServicePackages from "@/component/ServicePackages";
import MeetDr from "@/component/MeetDr";
import Frequently from "@/component/Frequently";
import Awards from "@/component/Awards";
import StayInformed from "@/component/StayInformed";
import MapWraper from "@/component/MapWraper";

import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { getSetting } from "@/services/settingService";
import { getHomePosts } from "@/services/postService";

import { getCategories } from "@/services/categoryService";

async function HomePage() {
  const setting = await getSetting();
  const posts = await getHomePosts();

  const homeCategories = await getCategories("service", true);

  const hero = setting?.data?.hero_home_clinic;
  const facility = setting?.data?.utilities_home_clinic;
  const stats = setting?.data?.stats_home;
  const services = setting?.data?.services_home;
  const appointment = setting?.data?.appointment_home_clinic;
  const whyChoose = setting?.data?.why_choose_us_home_clinic;
  const specialists = setting?.data?.specialists_home_clinic;
  const testimonials = setting?.data?.testimonials_home_clinic;
  const servicePackagesData = setting?.data?.service_plans_clinic;

  const howItWork = setting?.data?.how_it_work_home_clinic;
  const doctor = setting?.data?.doctor_home_clinic;
  // const faq = setting?.data?.faq_home_clinic;
  const rawFaq = setting?.data?.faq_home_clinic;

  const faq = rawFaq
    ? {
        ...rawFaq,
        image: normalizeImageUrl(rawFaq.image),
      }
    : undefined;
  const awards = setting?.data?.awards_home;
  const site = setting?.data?.site;

  const contact = {
    title: site?.contact_title ?? undefined,
    description: site?.contact_description ?? undefined,
    address: {
      label: site?.address_title ?? undefined,
      value: site?.address_description ?? undefined,
    },
    phone: {
      label: site?.phone_title ?? undefined,
      value: site?.phone_description ?? undefined,
    },
    email: {
      label: site?.email_title ?? undefined,
      value: site?.email_description ?? undefined,
    },
    time: {
      label: site?.time_title ?? undefined,
      value: site?.time_description ?? undefined,
    },
    appointment_btn: {
      text: site?.btn_appointment_title ?? undefined,
      link: site?.btn_appointment_link ?? undefined,
    },
    map_iframe: site?.map ?? undefined,
  };

  const heroBannerUrl = normalizeImageUrl(hero?.banner_hero);

  return (
    <>
      <main className="page-content">
        <div
          className="hero-banner style-1"
          style={{
            backgroundImage: `url(${IMAGES.herobannerbg1.src})`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="inner-wrapper">
              {/* <span className="text-vertical text-secondary">
                                24/7 EMERGENCY SERVICE
                            </span> */}

              <div className="row align-items-end h-100">
                <div className="col-lg-6 align-self-center">
                  <div className="hero-content">
                    <h1
                      className="title wow fadeInUp fw-bold"
                      data-wow-delay="0.2s"
                      data-wow-duration="0.8s"
                    >
                      {hero?.title ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: hero.title,
                          }}
                        />
                      ) : (
                        <>
                          Medical & <br />
                          Health Care{" "}
                          <span className="text-primary">Services</span>
                        </>
                      )}

                      <Image src={IMAGES.herobannerline} alt="" />
                    </h1>

                    <p
                      className="text wow fadeInUp"
                      data-wow-delay="0.4s"
                      data-wow-duration="0.8s"
                    >
                      {hero?.description ||
                        "Your health is our top priority. Schedule an appointment with us today"}
                    </p>

                    <AppointmentButton
                      text={hero?.button_one_text || "Appointment"}
                      className="btn btn-lg btn-icon btn-primary m-r20 wow fadeInUp"
                      delay="0.6s"
                      duration="0.8s"
                    />

                    <Link
                      href={hero?.button_two_link || "/lien-he"}
                      className="btn btn-lg btn-icon btn-secondary wow fadeInUp"
                      data-wow-delay="0.6s"
                      data-wow-duration="0.8s"
                    >
                      {hero?.button_two_text || "Liên hệ"}
                      <span className="right-icon">
                        <i className="feather icon-arrow-right" />
                      </span>
                    </Link>
                  </div>
                </div>

                <div
                  className="col-lg-6 wow fadeInRight"
                  data-wow-delay="0.8s"
                  data-wow-duration="0.8s"
                >
                  <div
                    className="hero-thumbnail"
                    data-bottom-top="transform: translateY(-50px)"
                    data-top-bottom="transform: translateY(50px)"
                  >
                    <Image
                      className="thumbnail"
                      src={heroBannerUrl || IMAGES.herobanner1}
                      alt={hero?.title || "Hero banner"}
                      width={900}
                      height={900}
                    />

                    <div className="circle-wrapper">
                      <span className="circle1"></span>
                      <span className="circle2"></span>
                      <span className="circle3"></span>
                      <div className="item1">
                        <Image src={IMAGES.herobannerheart} alt="" />
                      </div>
                    </div>

                    <div
                      className="item2"
                      data-bottom-top="transform: translateY(-50px)"
                      data-top-bottom="transform: translateY(50px)"
                    >
                      <div className="info-widget style-1 move-3">
                        {/* <div className="avatar-group">
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar1} alt="" />
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar2} alt="" />
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar3} alt="" />
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar4} alt="" />
                                                </div> */}
                        <div className="avatar-group patient-avatar-group">
                          {[
                            "/assets/images/icons/boy.png",
                            "/assets/images/icons/girl.png",
                            "/assets/images/icons/man.png",
                            "/assets/images/icons/man (1).png",
                          ].map((item, index) => (
                            <Image
                              key={index}
                              src={item}
                              alt="patient avatar"
                              width={32}
                              height={32}
                              className="patient-avatar-item"
                            />
                          ))}
                        </div>
                        <div className="clearfix ms-2">
                          <span className="number text-primary">
                            {hero?.patient_title || "150k"}
                          </span>
                          <span>{hero?.patient_des || "Patient recovers"}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="item3"
                      data-bottom-top="transform: translateY(-50px)"
                      data-top-bottom="transform: translateY(50px)"
                    >
                      <div className="info-widget style-2 move-2">
                        <DiagnosisReport
                          percent={Number(hero?.percent || 82)}
                        />

                        <div className="widget-content">
                          <h6 className="mb-0">
                            {hero?.percent_text || "Successfully diagnosis"}
                          </h6>
                          <Link
                            href={hero?.percent_link || "/team-detail"}
                            className="btn btn-square btn-outline-light text-primary rounded-circle"
                          >
                            <i className="feather icon-arrow-up-right" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      className="item4"
                      data-bottom-top="transform: translateY(-50px)"
                      data-top-bottom="transform: translateY(50px)"
                    >
                      <div className="info-widget style-3 move-1">
                        <div className="widget-head">
                          <div className="widget-media">
                            <Image src={IMAGES.smallavatar5} alt="" />
                          </div>
                          <div className="widget-content">
                            <h6 className="title">Dr. Natali jackson</h6>
                            <ul className="star-list">
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <p>
                          “It is a long established fact that a reader will be
                          distracted by the readable content”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="item5"
                data-bottom-top="transform: translateY(-30px)"
                data-top-bottom="transform: translateY(30px)"
              >
                <div className="info-widget style-4 move-4">
                  <div className="widget-media">
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 16,
                        background: "#D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src="/assets/images/icons/contact-info.png"
                        alt="contact support"
                        width={28}
                        height={28}
                        style={{
                          display: "block",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>

                  <div className="widget-content">
                    <h6 className="title">
                      {hero?.question_title || "Bạn cần tư vấn ?"}
                    </h6>
                    <Link
                      href={`mailto:${hero?.question_email || "info@example.com"}`}
                    >
                      {hero?.question_email || "info@example.com"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <Counter data={stats} />

        <section className="content-inner-2 bg-light">
          <div className="container">
            <div className="section-head style-1 m-b30 row align-items-end">
              <div
                className="col-xl-7 col-md-9 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                <h2 className="title m-b0 fw-bold">
                  {services?.title || "Dịch Vụ"}
                  {/* {services?.subtitle || "Explore Our Wellness Services"} */}
                </h2>
              </div>

              <div
                className="col-xl-5 col-md-3 text-lg-end d-none d-md-block wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
              >
                <Link
                  href={
                    !services?.view_all_link ||
                    services.view_all_link === "/services"
                      ? "/dich-vu"
                      : services.view_all_link
                  }
                  className="btn btn-icon btn-primary btn-shadow"
                >
                  Xem tất cả
                  <span className="right-icon">
                    <i className="feather icon-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>

            <ServiceBox posts={homeCategories} useFallback={false} />
          </div>
        </section>

        <AppointmentData data={appointment} />

        <section
          className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden"
          style={{
            backgroundImage: `URL(${IMAGES.bg1})`,
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
            <div className="section-head style-1 m-b30 row align-items-center justify-content-center text-center">
              <div
                className="col-sm-7 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                <h2 className="title m-b0 fw-bold">
                  {servicePackagesData?.title || "Gói Liệu Trình"}
                </h2>
              </div>

              {/* <div
                                className="col-sm-5 text-sm-end d-sm-block d-none wow fadeInUp"
                                data-wow-delay="0.4s"
                                data-wow-duration="0.8s"
                            >
                                <Link
                                    href="/goi-dich-vu-dieu-tri"
                                    className="btn btn-icon btn-primary btn-shadow"
                                >
                                    Xem tất cả
                                    <span className="right-icon">
                                        <i className="feather icon-arrow-right" />
                                    </span>
                                </Link>
                            </div> */}
            </div>
            <ServicePackages data={servicePackagesData} />
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
        <Howitwork data={howItWork} />
        <MeetDr data={doctor} />
        <Frequently data={faq} />
        <Awards data={awards} />
        <StayInformed posts={posts} />
        <MapWraper data={contact} />
      </main>
      {/* <Footer settings={{ site: setting?.data?.site }} /> */}
    </>
  );
}

export default HomePage;
