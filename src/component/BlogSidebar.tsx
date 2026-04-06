import Image from "next/image";
import { IMAGES } from "@/constant/theme";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type BlogCategoryItem = {
  name: string;
  slug: string;
  count?: number;
};

type BlogLatestPostItem = {
  name?: string;
  slug?: string;
  image?: string | null;
  created_at?: string;
};

type BlogSidebarProps = {
  categories?: BlogCategoryItem[];
  latestPosts?: BlogLatestPostItem[];
};

function formatDate(dateString?: string) {
  if (!dateString) return "Chưa cập nhật";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Chưa cập nhật";

  return date.toLocaleDateString("vi-VN");
}

export default function BlogSidebar({
  categories = [],
  latestPosts = [],
}: BlogSidebarProps) {
  return (
    <aside className="side-bar sticky-top @@dir m-b30 p-0">
      <div
        className="widget wow fadeInUp"
        data-wow-delay="0.1s"
        data-wow-duration="0.5s"
      >
        <div className="widget-title">
          <h4 className="title">Tìm Kiếm</h4>
        </div>
        <div className="search-bx">
          <form role="search">
            <div className="input-group">
              <input
                name="text"
                className="form-control"
                placeholder="Search"
                type="text"
              />
              <div className="input-group-btn">
                <button type="submit">
                  <i className="feather icon-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className="widget widget_categories style-1 wow fadeInUp"
        data-wow-delay="0.2s"
        data-wow-duration="0.5s"
      >
        <div className="widget-title">
          <h4 className="title">Danh Mục</h4>
        </div>
        <ul>
          {categories.map((item, i) => (
            <li className="cat-item" key={i}>
              <Link href={`/danh-muc/${item.slug}`}>{item.name}</Link>{" "}
              <span>({item.count ?? 0})</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="widget recent-posts-entry wow fadeInUp"
        data-wow-delay="0.3s"
        data-wow-duration="0.5s"
      >
        <div className="widget-title">
          <h4 className="title">Bài Mới Nhất</h4>
        </div>

        <div className="widget-post-bx">
          {latestPosts.map((item, i) => (
            <div
              className="widget-post clearfix"
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <div
                className="dz-media"
                style={{
                  width: "90px",
                  minWidth: "90px",
                  height: "90px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  backgroundColor: "#f1f5f9",
                  flexShrink: 0,
                }}
              >
                <img
                  src={normalizeImageUrl(item.image) || ""}
                  alt={item.name || "post"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div className="dz-info">
                <div className="dz-meta">
                  <ul>
                    <li className="post-date">
                      <Link href={`/bai-viet/${item.slug}`}>
                        {formatDate(item.created_at)}
                      </Link>
                    </li>
                  </ul>
                </div>
                <h6 className="title">
                  <Link href={`/bai-viet/${item.slug}`}>{item.name}</Link>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="widget widget_tag_cloud wow fadeInUp"
        data-wow-delay="0.4s"
        data-wow-duration="0.5s"
      >
        <div className="widget-title">
          <h4 className="title">Tags</h4>
        </div>
        <div className="tagcloud">
          {categories.map((item, i) => (
            <Link href={`/danh-muc/${item.slug}`} key={i}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
