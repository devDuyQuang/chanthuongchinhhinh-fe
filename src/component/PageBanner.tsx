import { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  bnrimage: string | StaticImageData;
}

function PageBanner({ title, bnrimage }: Props) {
  // GIẢI PHÁP: Kiểm tra nếu bnrimage là Object (StaticImageData) thì lấy .src, nếu là string thì dùng luôn
  const finalBannerUrl =
    typeof bnrimage === "object" && bnrimage !== null && "src" in bnrimage
      ? bnrimage.src
      : bnrimage;
  return (
    <>
      <div
        className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md"
        style={{
          backgroundImage: `url(${finalBannerUrl})`,
        }}
      >
        <div className="container">
          <div className="dz-bnr-inr-entry d-table-cell">
            <h1
              className="wow fadeInUp"
              data-wow-delay="0.2s"
              data-wow-duration="0.8s"
            >
              {title}
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
                <li className="breadcrumb-item">{title}</li>
              </ul>
            </nav>
            <div className="dz-btn">
              <Link
                href="tel:0846555367"
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
        {/* <span className="text-vertical">24/7 EMERGENCY SERVICE</span> */}
        {/* <ul className="dz-social">
                    <li><Link href="https://www.instagram.com/dexignzone" target="_blank" rel="nofollow">
                        <i className="fa-brands fa-instagram" />
                    </Link>
                    </li>
                    <li><Link href="https://www.facebook.com/dexignzone" target="_blank" rel="nofollow">
                        <i className="fa-brands fa-facebook-f" />
                    </Link>
                    </li>
                    <li><Link href="https://x.com/dexignzone" target="_blank" rel="nofollow">
                        <i className="fa-brands fa-x-twitter" />
                    </Link>
                    </li>
                    <li><Link href="https://www.youtube.com/@dexignzone" target="_blank" rel="nofollow">
                        <i className="fa-brands fa-youtube" />
                    </Link>
                    </li>
                </ul> */}
      </div>
    </>
  );
}
export default PageBanner;
