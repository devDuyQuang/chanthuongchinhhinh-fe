"use client";

import { useState, useEffect } from "react";
import CommentForm from "@/app/(blogs)/blog-details/_components/CommentForm";
import Image from "next/image";
import { IMAGES } from "@/constant/theme";
import { color } from "framer-motion";

const apiBaseUrl =
  (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
    /^https?:\/\//,
    (match) => match + "api.",
  ) || "http://api.localhost:8000";

const CommentSection = ({ postId }: { postId: any }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/comments?post_id=${postId}`);
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

  // Kiểm tra xem đây có phải là một phản hồi hay không
  // Nếu có parent_id thì chính là reply
  const isReply = comment.parent_id !== null;
  const isAdmin =
    comment.name === "Admin" || comment.name === "Quản Trị Viên Dr.Dương Ortho";

  // --- THÊM DÒNG NÀY ĐỂ CHECK LOG ---
  //console.log(`Data in CommentItem (ID: ${comment.id}):`, comment);
  // ----------------------------------

  return (
    <li className={`comment ${isAdmin ? "admin-comment" : ""}`}>
      <div
        className="comment-body"
        style={{
          marginLeft: "0px",
          marginBottom: "18px",
          paddingBottom: "0px",
          minHeight: "100px",
        }} // Căn chỉnh lại margin cho comment chính
      >
        <div className="comment-author vcard">
          {/* <Image
            src={isAdmin ? IMAGES.avtarmiddle2 : IMAGES.avtarmiddle1} // Có thể đổi avatar admin khác
            alt="avatar"
            className="avatar"
            width={60}
            height={60}
          /> */}

          <cite
            className="fn"
            style={{ display: "flex", alignItems: "center" }}
          >
            {isReply ? (
              <i
                className="fa-solid fa-arrow-turn-up fa-rotate-90 me-2 text-primary"
                style={{ fontSize: "12px" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-circle-user me-2 text-#212529"
                style={{ fontSize: "14px" }}
              ></i>
            )}

            {/* 2. Hiển thị tên: Nếu là Admin thì hiển thị Dr Dương Ortho, nếu không thì hiện name khách */}
            <span
              style={{
                fontWeight: "600",
                color: isAdmin ? "text-primary" : "inherit",
              }}
            >
              {comment.name === "Admin"
                ? "Quản Trị Viên Dr.Dương Ortho"
                : comment.name}
            </span>
          </cite>

          <div className="comment-meta d-block small text-muted">
            <i className="fa-regular fa-calendar-days me-2"></i>{" "}
            {comment.formatted_date}
          </div>
        </div>
        <div className="comment-content dz-page-text">
          <p>{comment.content}</p>
        </div>

        {/* Chỉ hiện nút trả lời nếu không phải là admin (hoặc tùy logic của anh) */}
        {/* <div className="reply">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="comment-reply-link text-primary font-weight-600"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            <i className="fa fa-reply me-1"></i>
            {showReplyForm ? "Hủy bỏ" : "Trả lời"}
          </button>
        </div> */}
      </div>

      {showReplyForm && (
        <div className="comment-respond style-1 mt-3 ms-md-5 ms-3">
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

      {/* Render Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <ol
          className="children"
          style={{
            listStyle: "none",
          }}
        >
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id || `reply-${Math.random()}`} // Backup key nếu id reply trùng
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
