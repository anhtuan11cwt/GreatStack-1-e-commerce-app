import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="my-10 mt-40 flex flex-col justify-between gap-14 text-sm sm:flex-row">
        <div className="flex flex-col items-start gap-4 sm:w-1/3">
          <img alt="" className="mb-5 w-32" src={assets.logo} />
          <p className="w-full text-gray-600 md:w-2/3">
            Forever là thương hiệu thời trang hàng đầu, mang đến những bộ sưu
            tập mới nhất với phong cách hiện đại và chất lượng vượt trội.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="mb-5 font-semibold text-xl">CÔNG TY</p>
          <p className="cursor-pointer hover:text-gray-600">Trang chủ</p>
          <p className="cursor-pointer hover:text-gray-600">Giới thiệu</p>
          <p className="cursor-pointer hover:text-gray-600">Giao hàng</p>
          <p className="cursor-pointer hover:text-gray-600">
            Chính sách bảo mật
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="mb-5 font-semibold text-xl">LIÊN HỆ</p>
          <p>+84-123-456-789</p>
          <p>contact@forever.com</p>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          &copy; {new Date().getFullYear()} forever.com - Bảo lưu mọi quyền.
        </p>
      </div>
    </div>
  );
};

export default Footer;
