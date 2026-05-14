"use client";

import { useState, useEffect } from "react";
import CommentForm from "@/app/(blogs)/blog-details/_components/CommentForm";
import Image from "next/image";
import { IMAGES } from "@/constant/theme";

const CommentSection = ({ postId }: { postId: any }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments?post_id=${postId}`,
      );
      const data = await res.json();
      setComments(data.data || []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  return (
    <div className="clear" id="comment-list">
      <div className="post-comments comments-area style-1 clearfix">
        <h4 className="comments-title mb-2">Bình luận ({comments.length})</h4>
        <p className="dz-title-text">
          Chia sẻ ý kiến hoặc trải nghiệm của bạn.
        </p>

        <div id="comment">
          {loading ? (
            <p>Đang tải bình luận...</p>
          ) : (
            <ol className="comment-list">
              {comments.map((comment: any) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  onRefresh={fetchComments}
                />
              ))}
            </ol>
          )}
        </div>

        <div className="default-form comment-respond style-1" id="respond">
          <h4 className="comment-reply-title mb-2" id="reply-title">
            Để lại bình luận
          </h4>
          <div className="clearfix">
            <CommentForm postId={postId} onCommentSuccess={fetchComments} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({ comment, postId, onRefresh }: any) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <li className="comment">
      <div className="comment-body">
        <div className="comment-author vcard">
          {/* Avatar mặc định nếu không có ảnh */}
          <Image
            src={IMAGES.avtarmiddle1}
            alt="avatar"
            className="avatar"
            width={60}
            height={60}
          />
          <cite className="fn">{comment.name}</cite>
          <div className="comment-meta d-block small text-muted">
            {comment.created_at}
          </div>
        </div>
        <div className="comment-content dz-page-text">
          <p>{comment.content}</p>
        </div>
        <div className="reply">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="comment-reply-link"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {showReplyForm ? "Hủy bỏ" : "Trả lời"}
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="comment-respond style-1 mt-3 ms-5">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCommentSuccess={() => {
              setShowReplyForm(false);
              onRefresh();
            }}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <ol className="children">
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onRefresh={onRefresh}
            />
          ))}
        </ol>
      )}
    </li>
  );
};

export default CommentSection;
