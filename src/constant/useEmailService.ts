export const useEmailService = () => {
  const sendEmail = async (form: HTMLFormElement) => {
    try {
      const formData = new FormData(form);

      const payload = {
        first_name: formData.get("dzFirstName"),
        last_name: formData.get("dzLastName"),
        email: formData.get("dzEmail"),
        phone: formData.get("dzPhoneNumber"),
        message: formData.get("dzMessage"),
      };

      const API_BASE = (
        process.env.NEXT_PUBLIC_BASE_URL || ""
      )
        .replace(/^https?:\/\//, (match) => match + "api.")
        .replace(/\/$/, "");

      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      return {
        success: result.success,
        message: result.message,
      };
    } catch {
      return {
        success: false,
        message: "Không thể gửi liên hệ",
      };
    }
  };

  return { sendEmail };
};