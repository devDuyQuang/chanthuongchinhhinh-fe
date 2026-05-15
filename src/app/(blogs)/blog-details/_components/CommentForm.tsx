"use client";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface CommentFormProps {
  postId: any;
  parentId?: any;
  onCommentSuccess?: () => void;
}

const CommentForm = ({
  postId,
  parentId,
  onCommentSuccess,
}: CommentFormProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const baseUrl =
    (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
      /^https?:\/\//,
      (match) => match + "api.",
    ) || "http://admin.localhost:8000/api";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Lấy dữ liệu từ FormData
    const formData = new FormData(formRef.current);
    const author = formData.get("author");
    const email = formData.get("email");
    const comment = formData.get("comment");

    // Kiểm tra nhanh phía Client
    if (!author || !email || !comment) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    const loadToast = toast.loading("Đang gửi bình luận...");

    const data = {
      post_id: postId,
      parent_id: parentId || null,
      author: author,
      email: email,
      content: comment,
    };

    try {
      const response = await fetch(`${baseUrl}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          result.message || "Bình luận thành công! Vui lòng chờ duyệt.",
          {
            id: loadToast, // Thay thế cái loading bằng cái success
          },
        );

        formRef.current.reset();

        if (onCommentSuccess) {
          onCommentSuccess();
        }
      } else {
        const errorMsg = result.errors
          ? Object.values(result.errors).flat()[0]
          : result.message;
        toast.error("Lỗi: " + errorMsg, { id: loadToast });
      }
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Không thể kết nối đến máy chủ!", { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        id="comments_form"
        className="comment-form"
      >
        <p className="comment-form-author">
          <input
            id="name"
            placeholder="Họ và tên *"
            name="author"
            type="text"
            className="form-control"
          />
        </p>
        <p className="comment-form-email">
          <input
            id="email"
            placeholder="Email *"
            name="email"
            type="email"
            className="form-control"
          />
        </p>

        <p className="comment-form-comment">
          <textarea
            id="comments"
            placeholder="Nhập nội dung bình luận"
            className="form-control"
            name="comment"
            rows={4}
          ></textarea>
        </p>

        <p className="form-submit">
          <button
            id="submit"
            type="submit"
            disabled={loading}
            className="submit btn btn-primary btn-lg filled"
          >
            {loading ? "Đang xử lý..." : "Gửi bình luận"}
          </button>
        </p>
      </form>
    </>
  );
};

export default CommentForm;

// "use client";
// import { useEmailService } from "@/constant/useEmailService";
// import { useRef } from "react";

// interface CommentFormProps {
//   postId: any;
//   parentId?: any; // Thêm dấu ? vì không phải lúc nào cũng có parentId
//   onCommentSuccess?: () => void; // Thêm dấu ? để không bắt buộc
// }

// const CommentForm = ({
//   postId,
//   parentId,
//   onCommentSuccess,
// }: CommentFormProps) => {
//   const form = useRef<HTMLFormElement | null>(null);
//   const { sendEmail } = useEmailService();
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!form.current) return;
//     const result = await sendEmail(form.current);
//     if (result.success) {
//       // console.log('SUCCESS!', result.message);
//     } else {
//       // console.error('FAILED...', result.message);
//     }
//   };
//   return (
//     <form
//       ref={form}
//       onSubmit={handleSubmit}
//       method="post"
//       id="comments_form"
//       className="comment-form"
//       noValidate
//     >
//       <p className="comment-form-author">
//         <input id="name" placeholder="Họ và tên" name="author" type="text" />
//       </p>
//       <p className="comment-form-email">
//         <input
//           id="email"
//           required
//           placeholder="Email"
//           name="email"
//           type="email"
//         />
//       </p>
//       <p className="comment-form-comment">
//         <textarea
//           id="comments"
//           placeholder="Nhập nội dung bình luận..."
//           className="form-control4"
//           name="comment"
//           cols={45}
//           rows={3}
//           required
//         ></textarea>
//       </p>
//       <p className="col-md-12 col-sm-12 col-xs-12 form-submit">
//         <button
//           id="submit"
//           type="submit"
//           className="submit btn btn-primary btn-lg filled"
//         >
//           Gửi bình luận
//         </button>
//       </p>
//     </form>
//   );
// };
// export default CommentForm;
