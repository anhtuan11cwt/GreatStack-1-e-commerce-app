import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col border border-gray-400 sm:flex-row">
      <div className="flex w-full items-center justify-center py-10 sm:w-1/2 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="h-[2px] w-8 bg-[#414141] md:w-11" />
            <p className="font-medium text-sm md:text-base">
              BỘ SƯU TẬP BÁN CHẠY
            </p>
          </div>
          <h1 className="text-3xl leading-relaxed sm:py-3 lg:text-5xl">
            Hàng Mới Về
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">MUA NGAY</p>
            <p className="h-[1px] w-8 bg-[#414141] md:w-11" />
          </div>
        </div>
      </div>
      <img alt="" className="w-full sm:w-1/2" src={assets.hero_img} />
    </div>
  );
};

export default Hero;
