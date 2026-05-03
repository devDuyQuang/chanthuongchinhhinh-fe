"use client";

import { useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IMAGES } from "@/constant/theme";
import { useEmailService } from "@/constant/useEmailService";

function AboutAppointmentForm() {
  const [selectCat, setSelectCat] = useState("Chọn dịch vụ");
  const form = useRef<HTMLFormElement | null>(null);
  const { sendEmail } = useEmailService();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Đã nhận thông tin. Chúng tôi sẽ liên hệ với bạn sớm!");

    form.current?.reset();
    setSelectCat("Chọn dịch vụ");
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
          style={{ backgroundImage: `url(${IMAGES.bg2png.src})` }}
        >
          <div className="title-head">
            <h2 className="form-title m-b0">
              Đặt <span>Lịch Khám</span> <br /> Nhận Tư Vấn Điều Trị
            </h2>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="dzForm">
            <input
              type="hidden"
              className="form-control"
              name="dzToDo"
              value="Appointment"
            />
            <input
              type="hidden"
              className="form-control"
              name="reCaptchaEnable"
              value="0"
            />
            <input type="hidden" name="dzService" value={selectCat} />
            <div className="dzFormMsg"></div>

            <div className="row">
              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzName"
                    type="text"
                    className="form-control"
                    id="inputYourName"
                    placeholder="Họ và tên"
                  />
                  <label htmlFor="inputYourName">Họ và tên</label>
                </div>
              </div>

              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzEmail"
                    type="email"
                    className="form-control"
                    id="inputYourEmail"
                    placeholder="Email"
                  />
                  <label htmlFor="inputYourEmail">Email</label>
                </div>
              </div>

              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <input
                    name="dzPhoneNumber"
                    type="number"
                    className="form-control dz-number"
                    id="inputPhoneNumber"
                    placeholder="Số điện thoại"
                  />
                  <label htmlFor="inputPhoneNumber">Số điện thoại</label>
                </div>
              </div>

              <div className="col-sm-6 m-b30">
                <div className="form-floating floating-underline input-light">
                  <Dropdown className="form-control bs-select">
                    <Dropdown.Toggle as="div">{selectCat}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => setSelectCat("Khám cơ xương khớp")}
                      >
                        Khám cơ xương khớp
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          setSelectCat("Điều trị chấn thương chỉnh hình")
                        }
                      >
                        Điều trị chấn thương chỉnh hình
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectCat("Phục hồi chức năng")}
                      >
                        Phục hồi chức năng
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectCat("Tư vấn điều trị")}
                      >
                        Tư vấn điều trị
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div className="col-sm-12 m-b30">
                <div className="form-floating floating-underline input-light">
                  <textarea
                    name="dzMessage"
                    className="form-control"
                    id="inputMessage"
                    rows={6}
                    placeholder="Nội dung"
                  ></textarea>
                  <label htmlFor="inputMessage">Nội dung</label>
                </div>
              </div>

              <div className="col-sm-12">
                <button
                  type="submit"
                  name="submit"
                  value="submit"
                  className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                >
                  Đặt lịch khám
                  <span className="right-icon">
                    <i className="feather icon-arrow-right" />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AboutAppointmentForm;
