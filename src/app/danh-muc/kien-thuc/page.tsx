// export { default } from "../../(blogs)/blog-grid/page";
import DanhMucSlugPage from "../[slug]/page";

export default function KienThucPage() {
  return <DanhMucSlugPage params={Promise.resolve({ slug: "kien-thuc" })} />;
}
