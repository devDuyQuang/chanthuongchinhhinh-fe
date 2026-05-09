// "use client"
// import { useRef } from "react";
// import { IMAGES } from "../constant/theme";
// import { useEmailService } from "@/constant/useEmailService";

// function Getintouch() {
//     const form = useRef<HTMLFormElement | null>(null);
//     const { sendEmail } = useEmailService();
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!form.current) return;
//         const result = await sendEmail(form.current);
//         if (result.success) {
//             console.log('SUCCESS!', result.message);
//         } else {
//             console.error('FAILED...', result.message);
//         }
//     };

//     return (
//         <>
//             <div className="col-xl-5 m-b30" data-bottom-top="transform: translateY(50px)" data-top-bottom="transform: translateY(-50px)">
//                 <div className="form-wrapper style-1">
//                     <div className="form-body bg-primary background-blend-burn"
//                         style={{ backgroundImage: `url(${IMAGES.bg2png.src})`, backgroundSize: 'cover' }}
//                     >
//                         <div className="section-head style-1 m-b30">
//                             <h2 className="title text-white m-b0">Get in Touch</h2>
//                             <p className="text-white m-b0 fw-medium">You can react us anytime</p>
//                         </div>
//                         <form ref={form} onSubmit={handleSubmit} className="dzForm">
//                             <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
//                             <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />
//                             <div className="dzFormMsg"></div>
//                             <div className="row">
//                                 <div className="col-sm-6 m-b30">
//                                     <div className="form-floating floating-underline input-light">
//                                         <input name="dzFirstName" type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
//                                         <label htmlFor="inputFirstName">First Name</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-sm-6 m-b30">
//                                     <div className="form-floating floating-underline input-light">
//                                         <input name="dzLastName" type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
//                                         <label htmlFor="inputLastName">Last Name</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-sm-6 m-b30">
//                                     <div className="form-floating floating-underline input-light">
//                                         <input name="dzEmail" type="email" className="form-control" id="inputYourEmail" placeholder="Your Email" />
//                                         <label htmlFor="inputYourEmail">Your Email</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-sm-6 m-b30">
//                                     <div className="form-floating floating-underline input-light">
//                                         <input name="dzPhoneNumber" type="number" className="form-control dz-number" id="inputPhoneNumber" placeholder="Phone Number" />
//                                         <label htmlFor="inputPhoneNumber">Phone Number</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-sm-12 m-b30">
//                                     <div className="form-floating floating-underline input-light">
//                                         <textarea name="dzMessage" className="form-control" id="inputMessage" rows={6} placeholder="Select Service"></textarea>
//                                         <label htmlFor="inputMessage">Message</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-sm-12">
//                                     <button type="submit" name="submit" className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
//                                         Submit <span className="right-icon"><i className="feather icon-arrow-right" /></span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Getintouch;

"use client";

import { useRef, useState } from "react";
import { IMAGES } from "../constant/theme";
import { useEmailService } from "@/constant/useEmailService";
import toast from "react-hot-toast";

type GetInTouchData = {
  form_title?: string;
  form_subtitle?: string;
};

type GetintouchProps = {
  data?: GetInTouchData;
};

function Getintouch({ data }: GetintouchProps) {
  const form = useRef<HTMLFormElement | null>(null);
  const { sendEmail } = useEmailService();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current || isSubmitting) return;

    const formData = new FormData(form.current);

    const payload = {
      firstName: formData.get("dzFirstName")?.toString().trim() || "",
      lastName: formData.get("dzLastName")?.toString().trim() || "",
      email: formData.get("dzEmail")?.toString().trim() || "",
      phone: formData.get("dzPhoneNumber")?.toString().trim() || "",
      message: formData.get("dzMessage")?.toString().trim() || "",
    };

    const newErrors: Record<string, string> = {};

    if (!payload.firstName || payload.firstName.length < 2) {
      newErrors.dzFirstName = "Vui lòng nhập tên của bạn.";
    }

    if (!payload.lastName || payload.lastName.length < 2) {
      newErrors.dzLastName = "Vui lòng nhập họ của bạn.";
    }

    if (!payload.email) {
      newErrors.dzEmail = "Vui lòng nhập email để chúng tôi liên hệ.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email)) {
        newErrors.dzEmail = "Email không hợp lệ.";
      }
    }

    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!payload.phone) {
      newErrors.dzPhoneNumber = "Vui lòng nhập số điện thoại.";
    } else if (!phoneRegex.test(payload.phone)) {
      newErrors.dzPhoneNumber = "Số điện thoại không đúng định dạng Việt Nam.";
    }

    if (!payload.message || payload.message.length < 5) {
      newErrors.dzMessage = "Vui lòng nhập nội dung cần tư vấn.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMsg("");
      toast.error("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    setErrors({});
    setSuccessMsg("");
    setIsSubmitting(true);

    const result = await sendEmail(form.current);

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Gửi liên hệ thành công!");
      setSuccessMsg(
        "Gửi liên hệ thành công! Chúng tôi sẽ phản hồi bạn sớm nhất.",
      );
      form.current.reset();
    } else {
      toast.error(result.message || "Không thể gửi liên hệ.");
    }
  };

  return (
    <div
      className="col-xl-5 m-b30"
      data-bottom-top="transform: translateY(50px)"
      data-top-bottom="transform: translateY(-50px)"
    >
      <div className="form-wrapper style-1">
        <div
          className="form-body bg-primary background-blend-burn"
          style={{
            backgroundImage: `url(${IMAGES.bg2png.src})`,
            backgroundSize: "cover",
          }}
        >
          <div className="section-head style-1 m-b30">
            <h2 className="title text-white m-b0">
              {data?.form_title || "Get in Touch"}
            </h2>
            <p className="text-white m-b0 fw-medium">
              {data?.form_subtitle || "You can react us anytime"}
            </p>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="dzForm">
            <input
              type="hidden"
              className="form-control"
              name="dzToDo"
              value="Contact"
            />
            <input
              type="hidden"
              className="form-control"
              name="reCaptchaEnable"
              value="0"
            />

            <div className="dzFormMsg"></div>

            <div className="row">
              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzFirstName"
                    type="text"
                    className={`form-control ${errors.dzFirstName ? "is-invalid" : ""}`}
                    id="inputFirstName"
                    placeholder="First Name"
                    onChange={() => setErrors({ ...errors, dzFirstName: "" })}
                  />
                  <label htmlFor="inputFirstName">First Name</label>
                </div>
                {errors.dzFirstName && (
                  <div className="text-white mt-1 small text-start">
                    {errors.dzFirstName}
                  </div>
                )}
              </div>

              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzLastName"
                    type="text"
                    className={`form-control ${errors.dzLastName ? "is-invalid" : ""}`}
                    id="inputLastName"
                    placeholder="Last Name"
                    onChange={() => setErrors({ ...errors, dzLastName: "" })}
                  />
                  <label htmlFor="inputLastName">Last Name</label>
                </div>
                {errors.dzLastName && (
                  <div className="text-white mt-1 small text-start">
                    {errors.dzLastName}
                  </div>
                )}
              </div>

              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzEmail"
                    type="email"
                    className={`form-control ${errors.dzEmail ? "is-invalid" : ""}`}
                    id="inputYourEmail"
                    placeholder="Your Email"
                    onChange={() => setErrors({ ...errors, dzEmail: "" })}
                  />
                  <label htmlFor="inputYourEmail">Your Email</label>
                </div>
                {errors.dzEmail && (
                  <div className="text-white mt-1 small text-start">
                    {errors.dzEmail}
                  </div>
                )}
              </div>

              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzPhoneNumber"
                    type="tel"
                    className={`form-control dz-number ${errors.dzPhoneNumber ? "is-invalid" : ""}`}
                    id="inputPhoneNumber"
                    placeholder="Phone Number"
                    onChange={() => setErrors({ ...errors, dzPhoneNumber: "" })}
                  />
                  <label htmlFor="inputPhoneNumber">Phone Number</label>
                </div>
                {errors.dzPhoneNumber && (
                  <div className="text-white mt-1 small text-start">
                    {errors.dzPhoneNumber}
                  </div>
                )}
              </div>

              <div className="col-sm-12 m-b30">
                <div className="form-floating floating-underline input-light">
                  <textarea
                    name="dzMessage"
                    className={`form-control ${errors.dzMessage ? "is-invalid" : ""}`}
                    id="inputMessage"
                    rows={6}
                    placeholder="Message"
                    onChange={() => setErrors({ ...errors, dzMessage: "" })}
                  ></textarea>
                  <label htmlFor="inputMessage">Message</label>
                </div>
                {errors.dzMessage && (
                  <div className="text-white mt-1 small text-start">
                    {errors.dzMessage}
                  </div>
                )}
              </div>

              <div className="col-sm-12">
                <button
                  type="submit"
                  name="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                >
                  {isSubmitting ? "Đang gửi..." : "Submit"}{" "}
                  <span className="right-icon">
                    <i className="feather icon-arrow-right" />
                  </span>
                </button>

                {successMsg && (
                  <div className="text-white mt-3 text-start fw-medium">
                    {successMsg}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Getintouch;
