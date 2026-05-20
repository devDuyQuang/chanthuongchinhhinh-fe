import { Metadata } from "next";
import { StaticImageData } from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bác Sĩ Dương - DrDuongOrtho",
  description:
    "Bác Sĩ Dương là chuyên gia chuyên khoa Chấn thương Chỉnh hình, điều trị bệnh lý cơ xương khớp, chấn thương thể thao và phục hồi chức năng chuyên sâu.",
  openGraph: {
    title: "Bác Sĩ Dương - DrDuongOrtho",
    description:
      "Bác Sĩ Dương là chuyên gia chuyên khoa Chấn thương Chỉnh hình, điều trị bệnh lý cơ xương khớp, chấn thương thể thao và phục hồi chức năng chuyên sâu.",
    type: "website",
    locale: "vi_VN",
    siteName: "DrDuongOrtho",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bác Sĩ Dương - DrDuongOrtho",
    description:
      "Bác Sĩ Dương là chuyên gia chuyên khoa Chấn thương Chỉnh hình, điều trị bệnh lý cơ xương khớp, chấn thương thể thao và phục hồi chức năng chuyên sâu.",
  },
};

const apiBaseUrl =
  (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
    /^https?:\/\//,
    (match) => match + "api.",
  ) || "http://api.localhost:8000";

// 1. Định nghĩa kiểu dữ liệu nhận vào (Props)
interface PageBannerProps {
  title: string; // Thêm dòng này
  bnrimage?: string;
}
// 2. Nhận prop `bannerHero` vào hàm
function PageBanner({ title, bnrimage }: PageBannerProps) {
  // 3. Xử lý đường dẫn hình ảnh: Nếu có ảnh từ API thì nối chuỗi, không thì dùng ảnh mặc định cục bộ
  const backgroundImageUrl = bnrimage
    ? `${apiBaseUrl}/${bnrimage.replace(/^\/+/, "")}` // Loại bỏ dấu gạch chéo đầu nếu có
    : "/assets/images/banner/banner-dichvu.jpg"; // Nhớ thêm dấu gạch chéo đầu nếu để trong thư mục public
  return (
    <>
      <div
        className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        <div className="container">
          <div className="dz-bnr-inr-entry d-table-cell">
            <h1
              className="wow fadeInUp"
              data-wow-delay="0.2s"
              data-wow-duration="0.8s"
            >
              Bác Sĩ Dương
            </h1>
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-row wow fadeInUp"
              data-wow-delay="0.4s"
              data-wow-duration="0.8s"
            >
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Trang Chủ</Link>
                </li>
                <li className="breadcrumb-item">Bác Sĩ Dương</li>
              </ul>
            </nav>
            <div className="dz-btn">
              <Link
                href="tel:0389951795"
                className="btn btn-lg btn-icon btn-primary radius-xl btn-shadow mb-3 mb-sm-0"
              >
                <span className="left-icon">
                  {" "}
                  <i className="feather icon-phone-call" />{" "}
                </span>{" "}
                038 995 1795
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PageBanner;
