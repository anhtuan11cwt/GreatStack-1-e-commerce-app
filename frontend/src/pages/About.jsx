import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="border-t pt-10">
      <div className="pt-8 text-center text-2xl">
        <Title text1="GIỚI" text2="THIỆU" />
      </div>

      <div className="mx-auto my-10 flex max-w-5xl flex-col items-center gap-16 md:flex-row">
        <img
          alt=""
          className="w-full max-w-[450px] md:w-1/2"
          src={assets.about_img}
        />
        <div className="flex flex-col justify-center gap-6 text-justify text-gray-600 md:w-1/2">
          <p>
            Forever ra đời với tầm nhìn đơn giản: mang đến thời trang chất lượng
            cao với giá cả hợp lý cho tất cả mọi người. Chúng tôi tin rằng phong
            cách không nên bị giới hạn bởi mức giá, và mỗi người đều xứng đáng
            được mặc đẹp mỗi ngày.
          </p>
          <p>
            Từ những ngày đầu khởi nghiệp, Forever đã không ngừng phát triển để
            trở thành một trong những thương hiệu thời trang được yêu thích
            nhất. Chúng tôi luôn đặt khách hàng làm trung tâm, không ngừng cải
            tiến từ chất liệu, thiết kế đến dịch vụ hậu mãi.
          </p>
          <b className="text-gray-800">SỨ MỆNH CỦA CHÚNG TÔI</b>
          <p>
            Sứ mệnh của chúng tôi là mang đến những bộ sưu tập thời trang mới
            nhất, giúp khách hàng tự tin thể hiện cá tính riêng. Chúng tôi cam
            kết về chất lượng sản phẩm, dịch vụ tận tâm và trải nghiệm mua sắm
            tuyệt vời cho mọi khách hàng.
          </p>
        </div>
      </div>

      <div className="py-10 text-xl">
        <Title text1="TẠI SAO" text2="CHỌN CHÚNG TÔI" />
      </div>

      <div className="mx-auto mb-20 grid max-w-5xl gap-8 text-gray-600 text-sm md:grid-cols-3">
        <div className="border px-8 py-10 text-center transition-all hover:bg-black hover:text-white">
          <b className="text-base">Đảm Bảo Chất Lượng</b>
          <p className="mt-2 text-justify text-gray-500">
            Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay khách
            hàng, đảm bảo chất lượng tốt nhất.
          </p>
        </div>
        <div className="border px-8 py-10 text-center transition-all hover:bg-black hover:text-white">
          <b className="text-base">Tiện Lợi Tối Đa</b>
          <p className="mt-2 text-justify text-gray-500">
            Trải nghiệm mua sắm dễ dàng với giao diện thân thiện, thanh toán
            nhanh chóng và giao hàng tận nơi.
          </p>
        </div>
        <div className="border px-8 py-10 text-center transition-all hover:bg-black hover:text-white">
          <b className="text-base">Dịch Vụ Xuất Sắc</b>
          <p className="mt-2 text-justify text-gray-500">
            Đội ngũ hỗ trợ luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc và hỗ trợ
            khách hàng chu đáo.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
