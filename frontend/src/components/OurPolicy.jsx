import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-center text-gray-700 text-xs sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      <div>
        <img alt="" className="m-auto mb-5 w-12" src={assets.exchange_icon} />
        <p className="font-semibold">Đổi Trả Dễ Dàng</p>
        <p className="text-gray-400">Chúng tôi hỗ trợ đổi trả miễn phí</p>
      </div>
      <div>
        <img alt="" className="m-auto mb-5 w-12" src={assets.quality_icon} />
        <p className="font-semibold">Đổi Trả 7 Ngày</p>
        <p className="text-gray-400">Chính sách đổi trả trong vòng 7 ngày</p>
      </div>
      <div>
        <img alt="" className="m-auto mb-5 w-12" src={assets.support_img} />
        <p className="font-semibold">Hỗ Trợ Tận Tâm</p>
        <p className="text-gray-400">Hỗ trợ khách hàng 24/7</p>
      </div>
    </div>
  );
};

export default OurPolicy;
