import type { Metadata } from "next";
import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { notFound } from "next/navigation";
import CommentForm from "../(blogs)/blog-details/_components/CommentForm";
import { getPost } from "@/services/postService";
import ImageLightboxActivator from "@/component/ImageLightboxContent";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = `${post?.title_seo || post?.name || "Bài viết"} - DrDuongOrtho`;
  const description = post?.description_seo || post?.description || "";
  const canonical = post?.canonical_seo;
  const image = normalizeImageUrl(post?.image);

  return {
    title,
    description,
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    openGraph: {
      title,
      description: description || undefined,
      ...(image && {
        images: [{ url: image }],
      }),
    },
  };
}

export default async function DirectPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = normalizeImageUrl(post.image) || IMAGES.bnr2.src;

  const createdDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("vi-VN")
    : "N/A";

  return (
    <main className="page-content">
      <div className="section-full post-header blog-single style-1 mb-0">
        <div className="dz-card text-center">
          <div className="dz-media overlay-secondary-light">
            <Image
              src={imageUrl}
              alt={post.name || ""}
              width={1920}
              height={800}
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          </div>

          <div className="dz-info">
            <h1 className="dz-title text-white mx-auto">
              {post.name || "Chi tiết bài viết"}
            </h1>

            <div className="dz-meta style-1">
              <ul className="justify-content-center">
                <li className="post-date">{createdDate}</li>

                <li className="dz-comment">
                  <i className="fa-solid fa-eye" />
                  <Link href="#" scroll={false}>
                    100 Lượt xem
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="content-inner-3">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto m-b30">
              <div className="dz-blog blog-single sidebar style-1">
                <div className="dz-info">
                  {post.toc && post.toc.length > 0 ? (
                    <div className="post-toc">
                      <div className="post-toc-title">Mục lục bài viết</div>

                      <ul className="post-toc-list">
                        {post.toc.map((item) => (
                          <li
                            key={item.id}
                            className={`toc-level-${item.level}`}
                          >
                            <a href={`#${item.id}`}>{item.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="dz-post-text">
                    {post.description ? (
                      <blockquote className="post-description-box">
                        <span aria-hidden="true" className="post-quote-mark">
                          &ldquo;
                        </span>

                        <p className="post-description-text">
                          <span className="post-description-first-letter">
                            {post.description.charAt(0)}
                          </span>
                          {post.description.slice(1)}
                        </p>
                      </blockquote>
                    ) : null}

                    {post.content ? (
                      <>
                        <div
                          className="dz-post-content"
                          dangerouslySetInnerHTML={{
                            __html: post.content,
                          }}
                        />
                        <ImageLightboxActivator containerSelector=".dz-post-content" />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="clear" id="comment-list">
                <div className="post-comments comments-area style-1 clearfix">
                  <div
                    className="default-form comment-respond style-1"
                    id="respond"
                  >
                    <h4 className="comment-reply-title mb-2" id="reply-title">
                      Để lại bình luận
                    </h4>
                    <p className="dz-title-text">
                      Chia sẻ ý kiến hoặc trải nghiệm của bạn để giúp mọi người
                      hiểu hơn về dịch vụ.
                    </p>
                    <div className="clearfix">
                      <CommentForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
  html {
    scroll-behavior: smooth;
  }

  .post-toc {
    background: #f8f9fb;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid #eef0f4;
  }

  .post-toc-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 14px;
  }

  .post-toc-list {
    margin: 0;
    padding-left: 18px;
  }

  .post-toc-list li {
    margin-bottom: 10px;
  }

  .post-toc-list a {
    color: #222;
    text-decoration: none;
    transition: 0.2s;
  }

  .post-toc-list a:hover {
    color: var(--bs-primary, #1a6fc4);
  }

  .toc-level-3 {
    margin-left: 18px;
    font-size: 14px;
  }
`}</style>
    </main>
  );
}
