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
            <div className="col-xl-9 mx-auto pe-xl-5 m-b30">
              <div className="dz-blog blog-single sidebar style-1">
                <div className="dz-info">
                  <div className="dz-post-text">
                    {post.description ? (
                      <div
                        style={{
                          borderLeft: '4px solid var(--bs-primary, #1a6fc4)',
                          background: 'linear-gradient(90deg, rgba(26,111,196,0.07) 0%, transparent 100%)',
                          borderRadius: '0 8px 8px 0',
                          padding: '16px 20px',
                          margin: '0 auto 28px',
                          width: '80%'
                        }}
                      >
                        <p
                          style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            fontStyle: 'italic',
                            color: '#374151',
                            margin: 0,
                            fontWeight: 500,
                          }}
                        >
                          {post.description}
                        </p>
                      </div>
                    ) : null}

                    {post.content ? (
                      <>
                        <div
                          className="dz-post-content"
                          dangerouslySetInnerHTML={{
                            __html: post.content,
                          }}
                        />
                        {/* Client component: chỉ gắn lightbox, không ảnh hưởng SSR/SEO */}
                        <ImageLightboxActivator containerSelector=".dz-post-content" />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div className="clear" id="comment-list">
                <div className="post-comments comments-area style-1 clearfix">
                  <div className="default-form comment-respond style-1" id="respond">
                    <h4 className="comment-reply-title mb-2" id="reply-title">
                      Để lại bình luận
                    </h4>
                    <p className="dz-title-text">
                      Chia sẻ ý kiến hoặc trải nghiệm của bạn để giúp mọi người hiểu hơn về dịch vụ.
                    </p>
                    <div className="clearfix">
                      <CommentForm />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Comment */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
