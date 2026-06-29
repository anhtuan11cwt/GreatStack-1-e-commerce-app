import { Send } from "lucide-react";

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="font-medium text-2xl text-gray-800">
        Đăng ký ngay & nhận ưu đãi 20%
      </p>
      <p className="mt-3 text-gray-400">
        Nhận thông tin về sản phẩm mới và ưu đãi độc quyền qua email.
      </p>
      <form
        className="mx-auto my-6 flex w-full items-center gap-3 border pl-3 sm:w-1/2"
        onSubmit={onSubmitHandler}
      >
        <input
          className="w-full outline-none sm:flex-1"
          placeholder="Nhập email của bạn"
          required
          type="email"
        />
        <button
          className="flex items-center gap-2 bg-black px-8 py-4 text-white text-xs"
          type="submit"
        >
          <Send size={14} /> ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
