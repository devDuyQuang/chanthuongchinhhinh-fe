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
            <div className="col-xl-8 mx-auto m-b30">
              <div className="dz-blog blog-single sidebar style-1">
                <div className="dz-info">
                  <div className="dz-post-text">
                    {post.description ? (
                      <blockquote
                        style={{
                          position: 'relative',
                          background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%)',
                          borderTop: '1px solid rgba(26,111,196,0.15)',
                          borderRight: '1px solid rgba(26,111,196,0.15)',
                          borderBottom: '1px solid rgba(26,111,196,0.15)',
                          borderLeft: '5px solid var(--bs-primary, #1a6fc4)',
                          borderRadius: '0 12px 12px 0',
                          padding: '24px 28px 24px 32px',
                          marginBottom: '32px',
                          marginTop: 0,
                          boxShadow: '0 4px 20px rgba(26,111,196,0.08)',
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          color: 'inherit',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '14px',
                            fontSize: '48px',
                            lineHeight: 1,
                            color: 'var(--bs-primary, #1a6fc4)',
                            opacity: 0.18,
                            fontFamily: 'Georgia, serif',
                            fontWeight: 700,
                            userSelect: 'none',
                          }}
                        >
                          &ldquo;
                        </span>
                        <p
                          style={{
                            fontSize: '1.08rem',
                            lineHeight: '1.85',
                            fontStyle: 'italic',
                            color: '#1e3a5f',
                            margin: 0,
                            fontWeight: 500,
                            letterSpacing: '0.01em',
                          }}
                        >
                          <span
                            style={{
                              float: 'left',
                              fontSize: '3.6rem',
                              lineHeight: '0.8',
                              fontWeight: 700,
                              fontStyle: 'normal',
                              color: 'var(--bs-primary, #1a6fc4)',
                              marginRight: '6px',
                              marginTop: '6px',
                              fontFamily: 'Georgia, serif',
                              letterSpacing: '-1px',
                            }}
                          >
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
