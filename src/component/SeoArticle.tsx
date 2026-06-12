"use client";

import React, { useState } from "react";
import Image from "next/image";

const SeoArticle = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="pb-5" style={{ backgroundColor: 'transparent' }}>
      <div className="container text-center">
        <button
          className="btn btn-lg btn-outline-primary rounded-pill btn-shadow"
          style={{ borderWidth: '2px', fontWeight: 600, padding: '12px 32px' }}
          onClick={() => setShowModal(true)}
        >
          Xem thêm kiến thức về Chấn thương chỉnh hình
          <span className="right-icon ms-2">
            <i className="feather icon-chevron-right" />
          </span>
        </button>
      </div>

      {showModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 99998 }}
          onClick={() => setShowModal(false)}
        ></div>
      )}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none', zIndex: 99999 }}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" style={{ color: '#1e3a5f' }}>
                Chấn Thương Chỉnh Hình: Toàn Cảnh Bệnh Lý Cơ Xương Khớp & Phác Đồ Điều Trị Tiên Tiến
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start" style={{ color: '#5a6a85', fontSize: '1.05rem', lineHeight: 1.8 }}>
              <p className="m-b20">
                Hệ vận động, bao gồm xương, khớp, cơ, gân và dây chằng, là bộ khung vững chắc giúp cơ thể con người thực hiện mọi hoạt động linh hoạt mỗi ngày. Tuy nhiên, dưới tác động của tuổi tác, chấn thương thể thao, tai nạn lao động hay tai nạn giao thông, hệ thống cơ xương khớp rất dễ bị tổn thương. Đó là lúc chúng ta cần đến sự can thiệp của chuyên khoa <strong>Chấn thương chỉnh hình</strong>.
              </p>
              <p className="m-b30">
                Trong bài viết này, chúng ta sẽ cùng tìm hiểu toàn diện về chuyên khoa chấn thương chỉnh hình, các bệnh lý phổ biến, cũng như những công nghệ chẩn đoán và phương pháp điều trị tiên tiến nhất hiện nay (cập nhật tiêu chuẩn y khoa 2026) đang được áp dụng tại <strong>Dr. Dương Ortho</strong>.
              </p>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                1. Chấn Thương Chỉnh Hình Là Gì?
              </h3>
              <p className="m-b20">
                <strong>Chấn thương chỉnh hình</strong> (Orthopedics hoặc Orthopedic Surgery) là một chuyên khoa y tế chuyên sâu, tập trung vào việc chẩn đoán, điều trị, phục hồi chức năng và phòng ngừa các bệnh lý, chấn thương liên quan đến hệ thống cơ xương khớp.
              </p>
              <p className="m-b30">
                Nhiều người lầm tưởng rằng bác sĩ chấn thương chỉnh hình chỉ giải quyết các ca "gãy xương". Thực tế, phạm vi của chuyên khoa này rộng hơn rất nhiều. Nó bao trùm từ các dị tật bẩm sinh ở trẻ em, các khối u xương, nhiễm trùng khớp, cho đến các bệnh lý thoái hóa mạn tính ở người cao tuổi như thoái hóa khớp gối, loãng xương, hay thoát vị đĩa đệm cột sống.
              </p>

              <div className="text-center m-b30">
                <Image src="/chan-thuong-chinh-hinh-la-gi.webp" alt="Chấn Thương Chỉnh Hình Là Gì?" width={0} height={0} sizes="100vw" unoptimized className="img-fluid rounded shadow-sm" style={{ width: '90%', height: 'auto', objectFit: 'contain' }} />
              </div>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                2. Khi Nào Bạn Cần Đến Gặp Bác Sĩ Chấn Thương Chỉnh Hình?
              </h3>
              <p className="m-b15">
                Đừng đợi đến khi cơn đau vượt quá sức chịu đựng mới tìm đến bác sĩ. Việc phát hiện và can thiệp sớm luôn mang lại tỷ lệ phục hồi cao và giúp tiết kiệm chi phí điều trị. Dưới đây là những dấu hiệu cảnh báo bạn cần được thăm khám chuyên khoa ngay lập tức:
              </p>

              <h4 className="m-b10" style={{ fontSize: '1.25rem', color: '#2c4a70' }}>Các dấu hiệu cảnh báo bệnh lý mạn tính:</h4>
              <ul className="m-b20" style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li className="m-b10"><strong>Đau nhức dai dẳng:</strong> Cơn đau ở các khớp (gối, vai, háng, cổ tay) kéo dài trên 1 tuần không thuyên giảm dù đã nghỉ ngơi.</li>
                <li className="m-b10"><strong>Cứng khớp buổi sáng:</strong> Thức dậy với cảm giác các khớp căng cứng, khó cử động, phải xoa bóp một lúc mới di chuyển được.</li>
                <li className="m-b10"><strong>Hạn chế tầm vận động:</strong> Khó khăn trong việc thực hiện các thao tác đơn giản hàng ngày như chải đầu, mặc áo, leo cầu thang, hoặc ngồi xổm.</li>
                <li className="m-b10"><strong>Tiếng kêu bất thường tại khớp:</strong> Khớp phát ra tiếng "lục cục", "lạo xạo" khi di chuyển, kèm theo cảm giác đau buốt.</li>
              </ul>

              <h4 className="m-b10" style={{ fontSize: '1.25rem', color: '#2c4a70' }}>Chấn thương cấp tính do tai nạn (Cần cấp cứu):</h4>
              <ul className="m-b30" style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li className="m-b10">Nghi ngờ gãy xương (chi biến dạng, sưng to, bầm tím nghiêm trọng).</li>
                <li className="m-b10">Trật khớp (khớp lệch khỏi vị trí, đau dữ dội, không thể cử động).</li>
                <li className="m-b10">Rách dây chằng, bong gân nặng sau khi chơi thể thao (nghe tiếng "rắc" tại khớp, sưng nề nhanh chóng).</li>
              </ul>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                3. Các Bệnh Lý & Chấn Thương Cơ Xương Khớp Phổ Biến Nhất Hiện Nay
              </h3>
              <p className="m-b15">Hệ cơ xương khớp phải chịu áp lực liên tục từ trọng lượng cơ thể và các hoạt động thể chất. Theo thống kê y tế mới nhất năm 2026, dưới đây là những nhóm bệnh lý chấn thương chỉnh hình có tỷ lệ mắc cao nhất:</p>

              <ul className="m-b30" style={{ paddingLeft: '20px', listStyleType: 'decimal' }}>
                <li className="m-b15">
                  <strong>Gãy Xương và Nứt Xương (Fractures):</strong> Gãy xương là tình trạng mất tính liên tục của cấu trúc xương. Có nhiều dạng gãy xương như gãy kín, gãy hở, gãy vụn. Các vị trí dễ gãy nhất bao gồm xương đùi, xương đòn, cổ tay và mắt cá chân. Điều trị gãy xương đòi hỏi kỹ thuật nắn chỉnh, bất động bằng bó bột hoặc phẫu thuật kết hợp xương bằng nẹp vít, đinh nội tủy.
                </li>
                <li className="m-b15">
                  <strong>Thoái Hóa Khớp và Viêm Khớp (Osteoarthritis & Arthritis):</strong> Thoái hóa khớp là "kẻ thù" số một của người lớn tuổi. Đây là tình trạng sụn khớp bị bào mòn theo thời gian, khiến các đầu xương cọ xát vào nhau gây đau đớn và viêm sưng. Hiện nay, ngoài việc dùng thuốc, y học đã có những bước tiến lớn như tiêm huyết tương giàu tiểu cầu (PRP) hay phẫu thuật thay khớp nhân tạo.
                </li>
                <li className="m-b15">
                  <strong>Bệnh Lý Cột Sống (Thoát Vị Đĩa Đệm, Gai Cột Sống):</strong> Lối sống ngồi nhiều, ít vận động của giới văn phòng làm gia tăng đột biến các bệnh lý cột sống. Khi lớp bao xơ đĩa đệm bị rách, nhân nhầy thoát ra ngoài chèn ép vào rễ thần kinh, gây ra chứng đau thần kinh tọa, tê bì lan từ thắt lưng xuống mông và cẳng chân.
                </li>
                <li className="m-b15">
                  <strong>Chấn Thương Thể Thao (Rách Dây Chằng, Tổn Thương Sụn Chêm):</strong> Sự phổ biến của các phong trào chạy bộ, đá bóng kéo theo sự gia tăng của chấn thương thể thao. Điển hình nhất là đứt dây chằng chéo trước (ACL) ở khớp gối. Dây chằng bị đứt thường không tự lành mà cần phẫu thuật tái tạo để khôi phục độ vững của khớp.
                </li>
              </ul>

              <div className="text-center m-b30">
                <Image src="/cac-benh-ly-chan-thuong-co-xuong-khop-pho-bien-nhat-hien-nay.webp" alt="Các bệnh lý cơ xương khớp" width={0} height={0} sizes="100vw" unoptimized className="img-fluid rounded shadow-sm" style={{ width: '90%', height: 'auto', objectFit: 'contain' }} />
              </div>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                4. Các Phương Pháp Chẩn Đoán Chấn Thương Chỉnh Hình Hiện Đại
              </h3>
              <p className="m-b15">Để đưa ra phác đồ điều trị chính xác, bác sĩ chấn thương chỉnh hình không chỉ dựa vào việc thăm khám lâm sàng mà còn cần đến sự hỗ trợ đắc lực từ các công nghệ chẩn đoán hình ảnh tiên tiến:</p>
              <ul className="m-b30" style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li className="m-b10"><strong>X-Quang Kỹ Thuật Số (Digital X-ray):</strong> Tiêu chuẩn vàng để phát hiện gãy xương, trật khớp, gai xương và đánh giá khe khớp.</li>
                <li className="m-b10"><strong>Chụp Cộng Hưởng Từ (MRI):</strong> Công nghệ không thể thiếu để chẩn đoán các tổn thương phần mềm mà X-quang không thấy được như rách sụn chêm, đứt dây chằng, thoát vị đĩa đệm.</li>
                <li className="m-b10"><strong>Chụp Cắt Lớp Vi Tính (CT-Scan) 3D:</strong> Cung cấp hình ảnh cắt lớp chi tiết, đặc biệt quan trọng để lên kế hoạch trước các ca phẫu thuật gãy xương phức tạp.</li>
                <li className="m-b10"><strong>Siêu Âm Cơ Xương Khớp:</strong> Phương pháp chẩn đoán nhanh chóng, an toàn, hiệu quả để kiểm tra tình trạng viêm gân, tràn dịch khớp.</li>
              </ul>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                5. Phác Đồ Điều Trị Tiên Tiến: Từ Bảo Tồn Đến Phẫu Thuật Xâm Lấn Tối Thiểu
              </h3>
              <p className="m-b15">Nguyên tắc vàng trong điều trị chấn thương chỉnh hình hiện đại là: <strong>Ưu tiên điều trị bảo tồn, chỉ phẫu thuật khi thực sự cần thiết, và nếu phải phẫu thuật, ưu tiên phương pháp xâm lấn tối thiểu.</strong></p>

              <h4 className="m-b10" style={{ fontSize: '1.25rem', color: '#2c4a70' }}>Điều Trị Bảo Tồn (Không Phẫu Thuật)</h4>
              <p className="m-b15">Hầu hết các bệnh lý cơ xương khớp ở giai đoạn nhẹ đều đáp ứng tốt với điều trị bảo tồn thông qua dùng thuốc, nẹp bó bột, và đặc biệt là <strong>Liệu pháp sinh học</strong> (Tiêm PRP hoặc tế bào gốc). Đây là xu hướng điều trị bùng nổ, giúp kích thích tái tạo sụn khớp tự nhiên mà không cần dùng hóa chất.</p>

              <h4 className="m-b10" style={{ fontSize: '1.25rem', color: '#2c4a70' }}>Phẫu Thuật Xâm Lấn Tối Thiểu (Minimally Invasive Surgery - MIS)</h4>
              <p className="m-b30">Khi điều trị bảo tồn thất bại, phẫu thuật nội soi khớp (Arthroscopy) là giải pháp cứu cánh. Thay vì rạch những đường mổ dài, bác sĩ chỉ cần mở 2-3 lỗ nhỏ bằng đầu đũa để đưa camera và dụng cụ vào khớp. Ưu điểm vượt trội là ít tổn thương mô lành, gần như không chảy máu, giảm thiểu nguy cơ nhiễm trùng, bệnh nhân ít đau đớn và phục hồi vận động cực kỳ nhanh chóng.</p>

              <div className="text-center m-b30">
                <Image src="/phau-thuat-xam-lan-toi-thieu-mis.webp" alt="Phẫu Thuật Xâm Lấn Tối Thiểu" width={0} height={0} sizes="100vw" unoptimized className="img-fluid rounded shadow-sm" style={{ width: '90%', height: 'auto', objectFit: 'contain' }} />
              </div>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                6. Phục Hồi Chức Năng: "Chìa Khóa Vàng" Trả Lại Vận Động
              </h3>
              <p className="m-b30">Thực tế, phẫu thuật chỉ chiếm 50% thành công, 50% còn lại phụ thuộc hoàn toàn vào <strong>Vật lý trị liệu - Phục hồi chức năng</strong>. Một phác đồ tập phục hồi chức năng bài bản, dưới sự hướng dẫn của chuyên gia, sẽ giúp lấy lại biên độ vận động bình thường của khớp, tăng cường sức mạnh cơ bắp để bảo vệ khớp mới phẫu thuật, và ngăn ngừa tái phát chấn thương trong tương lai.</p>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                7. Vì Sao Nên Lựa Chọn Dr. Dương Ortho?
              </h3>
              <p className="m-b30">
                <strong>Dr. Dương Ortho</strong> vươn lên trở thành địa chỉ vàng được hàng ngàn bệnh nhân tin tưởng giao phó sức khỏe cơ xương khớp nhờ chuyên môn sâu (dẫn dắt bởi Bác sĩ CKII dày dạn kinh nghiệm), phác đồ điều trị cá thể hóa, trang thiết bị chuẩn quốc tế và sự tận tâm đồng hành cùng bệnh nhân cho đến khi họ hoàn toàn lấy lại từng bước đi vững chắc.
              </p>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>
                8. Câu Hỏi Thường Gặp (FAQ)
              </h3>
              <div className="faq-section m-b30">
                <div className="m-b15">
                  <h4 style={{ fontSize: '1.15rem', color: '#2c4a70', fontWeight: 600 }}>1. Khám chấn thương chỉnh hình có đau không?</h4>
                  <p>Hoàn toàn không. Bác sĩ chỉ thực hiện các nghiệm pháp sờ nắn nhẹ nhàng. Các phương pháp chẩn đoán hình ảnh như siêu âm, X-quang, MRI cũng 100% không xâm lấn và không đau.</p>
                </div>
                <div className="m-b15">
                  <h4 style={{ fontSize: '1.15rem', color: '#2c4a70', fontWeight: 600 }}>2. Phẫu thuật nội soi đứt dây chằng sau bao lâu thì đi lại được?</h4>
                  <p>Ngay ngày thứ 2 sau phẫu thuật, bạn đã có thể đi lại nhẹ nhàng với nạng. Sau 2-4 tuần bạn có thể bỏ nạng đi lại bình thường, và sau 6-9 tháng tuân thủ tập phục hồi chức năng, bạn có thể quay lại chơi thể thao.</p>
                </div>
                <div className="m-b10">
                  <h4 style={{ fontSize: '1.15rem', color: '#2c4a70', fontWeight: 600 }}>3. Bệnh thoái hóa khớp gối có thể chữa khỏi hoàn toàn không?</h4>
                  <p>Thoái hóa khớp là quá trình lão hóa tự nhiên nên không thể chữa khỏi 100%. Tuy nhiên, các phương pháp điều trị tiên tiến tại Dr. Dương Ortho sẽ giúp kiểm soát triệt để cơn đau, phục hồi khả năng vận động và làm chậm tối đa quá trình thoái hóa.</p>
                </div>
              </div>

              <h3 className="m-b15" style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>Lời Kết</h3>
              <p className="m-b0">
                Hệ cơ xương khớp khỏe mạnh là nền tảng của một cuộc sống năng động. Đừng bỏ qua những tiếng kêu cứu từ các khớp xương. Bất cứ khi nào bạn gặp vấn đề về vận động, <strong>Dr. Dương Ortho</strong> luôn sẵn sàng đồng hành, mang đến giải pháp điều trị chấn thương chỉnh hình toàn diện, tiên tiến và an tâm nhất!
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoArticle;
