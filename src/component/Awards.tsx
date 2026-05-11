"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { awardswiperdata } from "../constant/alldata";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type DegreeItem = {
  id?: number;
  name?: string;
  image?: string;
  description?: string;
};

type AwardsData = {
  title?: string;
  description?: string;
};

type AwardsProps = {
  data?: AwardsData;
};

function Awards({ data }: AwardsProps) {
  const [degrees, setDegrees] = useState<DegreeItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const API_BASE = (
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.localhost:8000"
        ).replace(/\/$/, "");

        const res = await fetch(`${API_BASE}/degrees`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) return;

        const result = await res.json();

        if (Array.isArray(result?.data)) {
          setDegrees(result.data);
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách bằng cấp:", error);
      }
    };

    fetchDegrees();
  }, []);

  const items = useMemo(() => {
    if (degrees.length > 0) {
      return degrees.map((item, index) => ({
        image:
          normalizeImageUrl(item.image) ||
          awardswiperdata[index % awardswiperdata.length]?.image,
        title: item.name || "Bằng cấp chuyên môn",
        description:
          item.description ||
          "Minh chứng cho năng lực chuyên môn và sự tận tâm trong điều trị.",
      }));
    }

    return awardswiperdata.map((item) => ({
      image: item.image,
      title: "Bằng cấp chuyên môn",
      description:
        "Minh chứng cho năng lực chuyên môn và sự tận tâm trong điều trị.",
    }));
  }, [degrees]);

  return (
    <section className="content-inner-1 bg-light overflow-hidden">
      <div className="container-left">
        <div className="row g-0 align-items-center">
          <div className="col-xxl-3">
            <div className="section-head style-1 m-b30">
              <h2
                className="title wow fadeInUp fw-bold"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                {data?.title || "Bằng cấp"}
              </h2>

              <p
                className="wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
              >
                {data?.description ||
                  "Khẳng định uy tín chuyên môn bằng những chứng nhận chuyên môn và sự tin tưởng từ cộng đồng."}
              </p>
            </div>
          </div>

          <div className="col-xxl-9">
            <div className={selectedImage ? "awards-wrapper modal-open" : "awards-wrapper"}>
              <Swiper
                className="swiper awards-swiper wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
                loop={items.length > 1}
                slidesPerView={4}
                spaceBetween={15}
                autoplay={{
                  delay: 3000,
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                  },
                  991: {
                    slidesPerView: 2.5,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  575: {
                    slidesPerView: 1.5,
                  },
                  320: {
                    slidesPerView: 1.2,
                  },
                }}
                modules={[Autoplay]}
              >
                {items.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="grid-bx text-center certificate-card">
                      <div
                        className="certificate-frame"
                        onClick={() => setSelectedImage(item.image)}
                      >
                        <div className="dz-media">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={300}
                            unoptimized={typeof item.image === "string"}
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {selectedImage && (
                  <div
                    className="certificate-modal"
                    onClick={() => setSelectedImage(null)}
                  >
                    <div className="certificate-modal-content">
                      <Image
                        src={selectedImage}
                        alt="Certificate"
                        width={1600}
                        height={1200}
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
