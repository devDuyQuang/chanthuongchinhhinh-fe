export const useEmailService = () => {
  const sendEmail = async (form: HTMLFormElement) => {
    try {
      const formData = new FormData(form);

      const payload = {
        first_name: String(formData.get("dzFirstName") || "").trim(),
        last_name: String(formData.get("dzLastName") || "").trim(),
        email: String(formData.get("dzEmail") || "").trim(),
        phone: String(formData.get("dzPhoneNumber") || "").trim(),
        message: String(formData.get("dzMessage") || "").trim(),
      };

      const API_BASE = (
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "http://api.localhost:8000"
      ).replace(/\/$/, "");

      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          success: false,
          message: result?.message || "Không thể gửi liên hệ.",
        };
      }

      return {
        success: Boolean(result?.success),
        message: result?.message || "Gửi liên hệ thành công.",
      };
    } catch {
      return {
        success: false,
        message: "Không thể kết nối tới máy chủ.",
      };
    }
  };

  return { sendEmail };
};