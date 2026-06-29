import { Home, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-sm max-md:px-4">
      <h1 className="font-bold text-8xl text-indigo-500 md:text-9xl">404</h1>
      <div className="my-5 h-1 w-16 rounded bg-gray-800 md:my-7" />
      <p className="font-bold text-2xl text-gray-800 md:text-3xl">
        Không tìm thấy trang
      </p>
      <p className="mt-4 max-w-md text-center text-gray-500 text-sm md:text-base">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không
        khả dụng.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Link
          className="flex items-center gap-2 rounded-md bg-black px-7 py-2.5 text-white transition-all hover:bg-gray-800 active:scale-95"
          to="/"
        >
          <Home size={16} />
          Về trang chủ
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md border border-gray-300 px-7 py-2.5 text-gray-800 transition-all active:scale-95"
          to="/contact"
        >
          <MessageCircle size={16} />
          Liên hệ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
