export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import DiagnosisReport from "./_components/DiagnosisReport";
import WorldClass from "@/component/WorldClass";
import Counter from "@/component/Counter";
import ServiceBox from "@/component/ServiceBox";
import AppointmentData from "@/component/AppointmentData";
import WhyChoose from "@/component/WhyChoose";
import EmpolyBlog from "@/component/EmpolyBlog";
import RealPatient from "@/component/RealPatient";
import Howitwork from "@/component/Howitwork";
import MeetDr from "@/component/MeetDr";
import Frequently from "@/component/Frequently";
import Awards from "@/component/Awards";
import StayInformed from "@/component/StayInformed";
import MapWraper from "@/component/MapWraper";

type SettingResponse = {
    success: boolean;
    message: string;
    data?: {
        hero_home?: {
            title?: string;
            description?: string;
            button_one_text?: string;
            button_one_link?: string;
            question_title?: string;
            question_email?: string;
            percent?: string;
            percent_text?: string;
            percent_link?: string;
            patient_title?: string;
            patient_des?: string;
            banner_hero?: string;
        };
        utilities_home?: {
            title?: string;
            description?: string;
            button_text?: string;
            button_link?: string;
            phone?: string;
            open_hours?: {
                day?: string;
                time?: string;
            }[];
            utilities?: string[];
        };
        stats_home?: {
            background_image?: string;
            avatar_title?: string;
            avatars?: string[];
            stats?: {
                number?: string;
                label?: string;
            }[];
        };
        services_home?: {
            title?: string;
            subtitle?: string;
            view_all_link?: string;
            items?: {
                title?: string;
                description?: string;
                doctor_text?: string;
                link?: string;
            }[];
        };
        appointment_home?: {
            title?: string;
            subtitle?: string;
            appointment_now_text?: string;
            button_text?: string;
            button_link?: string;
            image?: string;
        };
        why_choose_us_home?: {
            title?: string;
            experience_number?: string;
            experience_label?: string;
            image?: string;
            items?: {
                title?: string;
                description?: string;
            }[];
        };
        specialists_home?: {
            title?: string;
            view_all_link?: string;
            items?: {
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
            }[];
        };
        how_it_work_home?: {
            title?: string;
            description?: string;
            image?: string;
            appointment_btn?: {
                text?: string;
                link?: string;
            };
            features?: {
                title?: string;
                description?: string;
                icon?: string;
            }[];
            stats?: {
                number?: string;
                label?: string;
            }[];
        };
        testimonials_home?: {
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

        doctor_home?: {
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
            achievements?: {
                image?: string;
                title?: string;
                subtitle?: string;
                link_text?: string;
            }[];
        };
        faq_home?: {
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
        awards_home?: {
            title?: string;
            description?: string;
            years?: string[];
            items?: {
                image?: string;
                title?: string;
                subtitle?: string;
                link_text?: string;
                year?: string;
            }[];
        };

        contact_home?: {
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
            map_iframe?: string;
        };

    };
};

async function getSetting(): Promise<SettingResponse | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
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

async function HomePage() {
    const setting = await getSetting();

    const hero = setting?.data?.hero_home;
    const facility = setting?.data?.utilities_home;
    const stats = setting?.data?.stats_home;
    const services = setting?.data?.services_home;
    const appointment = setting?.data?.appointment_home;
    const whyChoose = setting?.data?.why_choose_us_home;
    const specialists = setting?.data?.specialists_home;
    const testimonials = setting?.data?.testimonials_home;
    const howItWork = setting?.data?.how_it_work_home;
    const faq = setting?.data?.faq_home;
    const doctor = setting?.data?.doctor_home;
    const awards = setting?.data?.awards_home;
    const contact = setting?.data?.contact_home;


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
                            <span className="text-vertical text-secondary">
                                24/7 EMERGENCY SERVICE
                            </span>

                            <div className="row align-items-end h-100">
                                <div className="col-lg-6 align-self-center">
                                    <div className="hero-content">
                                        <h1
                                            className="title wow fadeInUp"
                                            data-wow-delay="0.2s"
                                            data-wow-duration="0.8s"
                                        >
                                            {hero?.title || (
                                                <>
                                                    Medical & <br />
                                                    Health Care <span className="text-primary">Services</span>
                                                </>
                                            )}{" "}
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

                                        <Link
                                            href={hero?.button_one_link || "/appointment"}
                                            className="btn btn-lg btn-icon btn-primary m-r20 wow fadeInUp"
                                            data-wow-delay="0.6s"
                                            data-wow-duration="0.8s"
                                        >
                                            {hero?.button_one_text || "Appointment"}
                                            <span className="right-icon">
                                                <i className="feather icon-arrow-right" />
                                            </span>
                                        </Link>

                                        <Link
                                            href="/contact-us"
                                            className="btn btn-lg btn-icon btn-secondary wow fadeInUp"
                                            data-wow-delay="0.6s"
                                            data-wow-duration="0.8s"
                                        >
                                            Contact Us
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
                                            src={IMAGES.herobanner1}
                                            alt={hero?.title || "Hero banner"}
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
                                                <div className="avatar-group">
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar1} alt="" />
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar2} alt="" />
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar3} alt="" />
                                                    <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar4} alt="" />
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
                                                <DiagnosisReport percent={Number(hero?.percent || 82)} />

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
                                                            <li><i className="fa fa-star" /></li>
                                                            <li><i className="fa fa-star" /></li>
                                                            <li><i className="fa fa-star" /></li>
                                                            <li><i className="fa fa-star" /></li>
                                                            <li><i className="fa fa-star" /></li>
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
                                        <Image src={IMAGES.smallavatar6} alt="" />
                                    </div>
                                    <div className="widget-content">
                                        <h6 className="title">
                                            {hero?.question_title || "Have a Question?"}
                                        </h6>
                                        <Link href={`mailto:${hero?.question_email || "info@example.com"}`}>
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
                                <h2 className="title m-b0">
                                    {services?.title || "Start Feeling Your Best"} <br />
                                    {services?.subtitle || "Explore Our Wellness Services"}
                                </h2>
                            </div>

                            <div
                                className="col-xl-5 col-md-3 text-lg-end d-none d-md-block wow fadeInUp"
                                data-wow-delay="0.4s"
                                data-wow-duration="0.8s"
                            >
                                <Link
                                    href={services?.view_all_link || "/services"}
                                    className="btn btn-icon btn-secondary"
                                >
                                    View All
                                    <span className="right-icon">
                                        <i className="feather icon-arrow-right" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <ServiceBox data={services} />
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
                        <div className="section-head style-1 m-b30 row align-items-end">
                            <div
                                className="col-sm-7 wow fadeInUp"
                                data-wow-delay="0.2s"
                                data-wow-duration="0.8s"
                            >
                                <h2 className="title m-b0">
                                    {specialists?.title || "We Employ only Specialists"}
                                </h2>
                            </div>

                            <div
                                className="col-sm-5 text-sm-end d-sm-block d-none wow fadeInUp"
                                data-wow-delay="0.4s"
                                data-wow-duration="0.8s"
                            >
                                <Link
                                    href={specialists?.view_all_link || "/team"}
                                    className="btn btn-icon btn-primary btn-shadow"
                                >
                                    View All
                                    <span className="right-icon">
                                        <i className="feather icon-arrow-right" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <EmpolyBlog data={specialists} />
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
                <StayInformed />
                <MapWraper data={contact} />
            </main>
            <Footer />
        </>
    );
}

export default HomePage;