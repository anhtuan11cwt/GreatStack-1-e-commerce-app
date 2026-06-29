import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

const AdminNavbar = ({ setSidebarOpen, setToken }) => {
  const handleLogout = () => {
    toast.success("Đã đăng xuất");
    localStorage.removeItem("admin_token");
    setToken("");
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-gray-300 border-b bg-white px-4 py-3 md:px-8">
      <div className="flex items-center gap-3">
        <button
          className="cursor-pointer text-gray-600 md:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
          type="button"
        >
          <Menu size={24} />
        </button>
        <img alt="Logo" className="h-9" src={assets.logo} />
      </div>
      <div className="flex items-center gap-5 text-gray-500">
        <p className="hidden sm:block">Xin chào! Admin</p>
        <button
          className="cursor-pointer rounded-full border px-4 py-1 text-sm hover:bg-gray-100"
          onClick={handleLogout}
          type="button"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
