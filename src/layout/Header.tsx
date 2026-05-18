"use client";

import Link from "next/link";
import { IMAGES } from "../constant/theme";
import { headerinfo, HeaderItem } from "../constant/alldata";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";
import { mapSiteToSidebarData } from "@/lib/mappers/site";
import AppointmentModal from "@/component/AppointmentModal";

type TopbarInfoItem = {
  title?: string;
  subtitle?: string;
  description?: string;
  paragraph?: string;
  image?: any;
  link?: string;
};

type HeaderProps = {
  menu: HeaderItem[];
  settings?: any;
};

function Header({ menu, settings }: HeaderProps) {
  const site = settings?.site;
  const sidebarData = mapSiteToSidebarData(site);

  const site_assets_clinic = settings?.site_assets_clinic;
  const adminUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.");

  const logo = site_assets_clinic?.logo ? adminUrl.replace(/\/$/, "") + '/storage/' + site_assets_clinic?.logo : IMAGES.logo;
  const logo_black = site_assets_clinic?.logo_black ? adminUrl.replace(/\/$/, "") + '/storage/' + site_assets_clinic?.logo_black : IMAGES.logo;

  const [show, setShow] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [scroll, setScroll] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);
  const { sendEmail } = useEmailService();

  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY >= 90);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleclick(index: number) {
    setShow((prev) => (prev === index ? null : index));
  }

  function menuHandler(index: number) {
    setIsActive((prev) => (prev === index ? null : index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.current) return;

    const result = await sendEmail(form.current);
    if (result.success) {
      // console.log("SUCCESS!", result.message);
    } else {
      // console.error("FAILED...", result.message);
    }
  }

  const rawTopbarValue = settings?.topbar_info_clinic;

  const rawTopbar =
    typeof rawTopbarValue === "string"
      ? JSON.parse(rawTopbarValue)
      : rawTopbarValue;

  const rawItems = Array.isArray(rawTopbar?.items) ? rawTopbar.items : [];

  const topbarItems: TopbarInfoItem[] =
    rawItems.length > 0
      ? headerinfo.slice(0, 6).map((defaultItem: any, index: number) => {
        const adminItem = rawItems[index];

        return {
          title: adminItem?.title || defaultItem?.title || "",
          subtitle:
            adminItem?.description ||
            adminItem?.subtitle ||
            adminItem?.paragraph ||
            defaultItem?.paragraph ||
            "",
          image: defaultItem?.image,
          link: adminItem?.link || "#",
        };
      })
      : headerinfo.slice(0, 6).map((item: any) => ({
        title: item?.title || "",
        subtitle: item?.paragraph || "",
        image: item?.image,
        link: "#",
      }));

  return (
    <>
      <header className="site-header header style-1">
        <div className="header-info-bar d-none d-xxl-block">
          <div className="container-fluid">
            <div className="row">
              {topbarItems.map((data, i) => (
                <div className="col" key={i}>
                  <Link href={data.link || "#"}>
                    <div className="icon-bx-wraper style-5">
                      <div className="icon-bx">
                        <span className="icon-cell">
                          <Image src={data.image} alt={data.title || ""} />
                        </span>
                      </div>
                      <div className="icon-content">
                        <h2 className="dz-title text-primary">{data.title}</h2>
                        <p>{data.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`sticky-header main-bar-wraper ${scroll ? "is-fixed" : ""}`}
        >
          <div className="main-bar clearfix bg-secondary text-white">
            <div className="container-fluid clearfix inner-bar">
              <div className="logo-header logo-dark">
                <Link href="/">
                  <Image src={logo} alt="logo" width={200} height={60} priority />
                </Link>
              </div>

              <button
                onClick={() => handleclick(2)}
                className={`w3menu-toggler navicon ${show === 2 ? "open" : ""}`}
                type="button"
                aria-label="Open menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div
                onClick={() => setShow(null)}
                className={`menu-close fade-overlay ${show === 2 ? "active" : ""}`}
              ></div>

              <div
                className={`header-nav w3menu w3menu-end mo-left ${show === 2 ? "show" : ""}`}
                id="W3Menu"
              >
                <div className="logo-header logo-dark">
                  <Link href="/">
                    <Image src={logo} alt="logo" width={200} height={60} />
                  </Link>
                </div>

                <ul className="nav navbar-nav">
                  {menu.map((data: HeaderItem, i: number) => {
                    const menuClassName = data.classChange;
                    const isBenhLyMenu =
                      data.title?.trim().toLowerCase() === "bệnh lý";

                    if (menuClassName === "has-mega-menu") {
                      return (
                        <li
                          key={i}
                          className={`has-mega-menu sub-menu-down auto-width menu-left ${i === isActive ? "open" : ""
                            }`}
                        >
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              menuHandler(i);
                            }}
                          >
                            <span>{data.title}</span>
                            <i className="fas fa-chevron-down tabIndex" />
                          </Link>

                          <div className="mega-menu">
                            <ul className="demo-menu">
                              {data.content?.map((item, index) => (
                                <li key={index}>
                                  <Link href={item.to}>
                                    {item.image ? (
                                      <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={40}
                                        height={40}
                                      />
                                    ) : null}
                                    <span className="menu-title">
                                      {item.title}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      );
                    }

                    if (menuClassName === "sub-menu-down") {
                      return (
                        <li
                          key={i}
                          className={`sub-menu-down ${i === isActive ? "open" : ""}`}
                        >
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              menuHandler(i);
                            }}
                          >
                            <span>{data.title}</span>
                            <i className="fas fa-chevron-down tabIndex" />
                          </Link>

                          <ul
                            className={`sub-menu ${isBenhLyMenu ? "benh-ly-sub-menu" : ""
                              }`}
                          >
                            {data.content?.map((item, index) => (
                              <li
                                key={index}
                                className={
                                  isBenhLyMenu ? "benh-ly-sub-menu-item" : ""
                                }
                              >
                                <Link
                                  href={item.to}
                                  onClick={() => {
                                    setShow(null);
                                    setIsActive(null);
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li key={i}>
                        <Link
                          href={data.to as string}
                          onClick={() => {
                            setShow(null);
                            setIsActive(null);
                          }}
                        >
                          <span>{data.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="dz-social-icon">
                  <ul>
                    <li>
                      <Link
                        href="https://www.facebook.com/dexignzone"
                        target="_blank"
                      >
                        <i className="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://x.com/dexignzone" target="_blank">
                        <i className="fa-brands fa-x-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.linkedin.com/showcase/dexignzone"
                        target="_blank"
                      >
                        <i className="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/dexignzone"
                        target="_blank"
                      >
                        <i className="fa-brands fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`extra-nav ${scroll ? "active" : ""}`}>
                <div className="extra-cell">
                  <ul className="header-right">
                    <li className="nav-item">
                      <button
                        type="button"
                        onClick={() => setShowAppointmentModal(true)}
                        className="btn btn-primary btn-hover1 border-0"
                      >
                        Đặt lịch khám
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => handleclick(1)}
                        type="button"
                        className="toggle-nav-btn"
                        aria-label="Open sidebar"
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`offcanvas dz-offcanvas offcanvas offcanvas-end ${show === 1 ? "show" : ""
            }`}
          tabIndex={-1}
          id="headerSidebar"
        >
          <button
            onClick={() => setShow(null)}
            type="button"
            className="btn-close m-t10 m-l10"
            aria-label="Close"
          ></button>

          <div className="offcanvas-body">
            <div className="widget">
              <div className="sidebar-header m-b20">
                <Link href="/">
                  <Image src={logo_black} alt="logo" width={200} height={60} />
                </Link>
              </div>
              <p>
                {sidebarData?.description || "Nội dung mô tả chưa cập nhật"}
              </p>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">
                  {sidebarData?.contactTitle || "Liên hệ"}
                </h4>
              </div>
              <ul className="list-check">
                <li>{sidebarData?.address || "Địa chỉ chưa cập nhật"}</li>

                <li>
                  <Link
                    href={`mailto:${sidebarData?.email || "Email chưa cập nhật"}`}
                    className="text-body"
                  >
                    {sidebarData?.email || "Email chưa cập nhật"}
                  </Link>
                </li>

                <li>
                  <Link
                    href={`tel:${sidebarData?.phone || "Số điện thoại chưa cập nhật"}`}
                    className="text-body"
                  >
                    {sidebarData?.phone || "Số điện thoại chưa cập nhật"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">
                  {sidebarData?.newsletterTitle || "Nhận bản tin"}
                </h4>
              </div>
              <form
                className="dzSubscribe style-2"
                ref={form}
                onSubmit={handleSubmit}
              >
                <div className="dzSubscribeMsg"></div>
                <div className="form-group">
                  <div className="input-group mb-0">
                    <input
                      name="dzEmail"
                      required
                      type="email"
                      className="form-control"
                      placeholder={
                        sidebarData?.emailPlaceholder || "Nhập email"
                      }
                    />
                    <div className="input-group-addon">
                      <button
                        name="submit"
                        value="Submit"
                        type="submit"
                        className="btn text-primary btn-transparent p-2"
                      >
                        <i className="fa-solid fa-paper-plane" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">
                  {sidebarData?.followTitle || "Mạng xã hội"}
                </h4>
              </div>
              <div className="dz-social-icon style-1">
                <ul>
                  <li>
                    <Link
                      href="https://www.linkedin.com/showcase/dexignzone"
                      target="_blank"
                    >
                      <i className="fa-brands fa-linkedin" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/dexignzone"
                      target="_blank"
                    >
                      <i className="fa-brands fa-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/dexignzone"
                      target="_blank"
                    >
                      <i className="fa-brands fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://x.com/dexignzone" target="_blank">
                      <i className="fa-brands fa-x-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/@dexignzone"
                      target="_blank"
                    >
                      <i className="fa-brands fa-youtube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AppointmentModal show={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </>
  );
}

export default Header;
