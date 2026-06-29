import { LogOut, Package, User } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextValue";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-white py-5 font-medium">
      <Link to="/">
        <img alt="" className="w-36" src={assets.logo} />
      </Link>

      <ul className="hidden gap-5 text-gray-700 text-sm sm:flex">
        {[
          ["TRANG CHỦ", "/"],
          ["BỘ SƯU TẬP", "/collection"],
          ["GIỚI THIỆU", "/about"],
          ["LIÊN HỆ", "/contact"],
        ].map(([label, path]) => (
          <li key={path}>
            <NavLink className="flex flex-col items-center gap-1" to={path}>
              <p>{label}</p>
              <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <button onClick={() => setShowSearch(true)} type="button">
          <img alt="" className="w-5 cursor-pointer" src={assets.search_icon} />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)} type="button">
            <img
              alt=""
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
            />
          </button>
          <div
            className={`absolute right-0 pt-4 ${menuOpen ? "block" : "hidden"}`}
          >
            <div className="flex w-44 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
              <Link
                className="flex cursor-pointer items-center gap-2 hover:text-black"
                onClick={() => setMenuOpen(false)}
                to="/profile"
              >
                <User size={14} /> Hồ sơ của tôi
              </Link>
              <Link
                className="flex cursor-pointer items-center gap-2 hover:text-black"
                onClick={() => setMenuOpen(false)}
                to="/orders"
              >
                <Package size={14} /> Đơn hàng
              </Link>
              <Link
                className="flex cursor-pointer items-center gap-2 hover:text-black"
                onClick={() => setMenuOpen(false)}
                to="/login"
              >
                <LogOut size={14} /> Đăng xuất
              </Link>
            </div>
          </div>
        </div>

        <Link className="relative" to="/cart">
          <img alt="" className="w-5 min-w-5" src={assets.cart_icon} />
          <p className="absolute right-[-10px] bottom-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] text-white leading-4">
            {getCartCount()}
          </p>
        </Link>

        <button
          className="sm:hidden"
          onClick={() => setVisible(true)}
          type="button"
        >
          <img alt="" className="w-5 cursor-pointer" src={assets.menu_icon} />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            className="flex cursor-pointer items-center gap-4 p-3"
            onClick={() => setVisible(false)}
            type="button"
          >
            <img alt="" className="h-4 rotate-180" src={assets.dropdown_icon} />
            <p>Quay lại</p>
          </button>

          {[
            ["TRANG CHỦ", "/"],
            ["BỘ SƯU TẬP", "/collection"],
            ["GIỚI THIỆU", "/about"],
            ["LIÊN HỆ", "/contact"],
          ].map(([label, path]) => (
            <NavLink
              className="border py-2 pl-6"
              key={path}
              onClick={() => setVisible(false)}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
