import Link from "next/link";
import AppointmentButton from "./AppointmentButton";

type ContactData = {
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

type MapWraperProps = {
  data?: ContactData;
};

function MapWraper({ data }: MapWraperProps) {
  const contactItems = [
    {
      icon: <i className="feather icon-map-pin" />,
      title: data?.address?.label || "Address",
      value: data?.address?.value || "234 Oak Drive, Villagetown, USA",
      delay: "0.4s",
    },
    {
      icon: <i className="feather icon-phone-call" />,
      title: data?.phone?.label || "Call Us",
      value: data?.phone?.value || "+1 123 456 7890",
      delay: "0.6s",
      href: data?.phone?.value ? `tel:${data.phone.value}` : "tel:+11234567890",
    },
    {
      icon: <i className="feather icon-mail" />,
      title: data?.email?.label || "Send us a Mail",
      value: data?.email?.value || "email@domain.com",
      delay: "0.8s",
      href: data?.email?.value
        ? `mailto:${data.email.value}`
        : "mailto:email@domain.com",
    },
    {
      icon: <i className="feather icon-clock" />,
      title: data?.time?.label || "Opening Time",
      value: data?.time?.value || "Mon-Thu: 8:00am-5:00pm",
      delay: "1s",
    },
  ];

  const mapIframeHtml = data?.map_iframe
    ?.replace(/width="[^"]*"/i, 'width="100%"')
    ?.replace(/height="[^"]*"/i, 'height="650"')
    ?.replace(
      /style="[^"]*"/i,
      'style="border:0;width:100%;height:650px;display:block;"',
    )
    ?.replace(/<iframe /i, '<iframe title="Google Maps" ');
  return (
    <section className="content-wrapper style-4">
      <div className="container">
        <div className="map-wrapper">
          {mapIframeHtml ? (
            <div
              style={{
                width: "100%",
                height: "650px",
                minHeight: "650px",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{
                __html: mapIframeHtml,
              }}
            />
          ) : (
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin"
              width="100%"
              height="650"
              style={{
                border: 0,
                width: "100%",
                height: "650px",
                minHeight: "650px",
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>

        <div className="row">
          <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-8">
            <div className="content-info bg-secondary">
              <div
                className="section-head style-1 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                <h2 className="title m-b0 text-white fw-bold">
                  {data?.title || "Get in Touch with us"}
                </h2>
                <p className="text-white">
                  {data?.description || "Lorem Ipsum is simply dummy"}
                </p>
              </div>

              {contactItems.map((item, i) => (
                <div
                  className="icon-bx-wraper style-1 m-b20 wow fadeInUp"
                  data-wow-delay={item.delay}
                  data-wow-duration="0.8s"
                  key={i}
                >
                  <div className="icon-bx">
                    <span className="icon-cell">{item.icon}</span>
                  </div>

                  <div className="icon-content">
                    <h5 className="dz-title">{item.title}</h5>

                    {item.href ? (
                      <Link href={item.href} className="text-white">
                        {item.value}
                      </Link>
                    ) : (
                      <p
                        className="text-white m-b0"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <AppointmentButton
                text={data?.appointment_btn?.text || "Đặt lịch ngay"}
                className="btn btn-lg btn-icon btn-primary w-100 m-t20 btn-shadow wow fadeInUp"
                delay="1.2s"
                duration="0.8s"
                fullWidthText
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapWraper;
