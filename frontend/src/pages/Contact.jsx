import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="border-t pt-10">
      <div className="pt-8 text-center text-2xl">
        <Title text1="LIÊN" text2="HỆ" />
      </div>

      <div className="mx-auto my-10 flex max-w-5xl flex-col items-center gap-16 md:flex-row">
        <img
          alt=""
          className="w-full max-w-[480px] md:w-1/2"
          src={assets.contact_img}
        />
        <div className="flex flex-col justify-center gap-6 text-justify text-gray-600">
          <p className="font-semibold text-gray-800">Cửa hàng của chúng tôi</p>
          <p className="text-gray-500">
            123 Nguyễn Huệ, Quận 1 <br /> TP. Hồ Chí Minh, Việt Nam
          </p>
          <p>
            Điện thoại: (028) 1234 5678 <br />
            Email: admin@forever.vn
          </p>
          <p className="font-semibold text-gray-800">Nghề nghiệp tại Forever</p>
          <p className="text-gray-500">
            Tìm hiểu thêm về đội ngũ và cơ hội việc làm hiện tại của chúng tôi.
          </p>
          <button
            className="flex w-fit cursor-pointer items-center gap-2 border px-8 py-3 text-sm transition-all hover:bg-black hover:text-white"
            type="button"
          >
            Khám phá việc làm <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
