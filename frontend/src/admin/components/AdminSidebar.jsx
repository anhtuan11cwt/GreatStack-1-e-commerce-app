import { Layers, ListOrdered, PackagePlus, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  {
    icon: <PackagePlus size={20} />,
    name: "Thêm sản phẩm",
    path: "/admin/add",
  },
  {
    icon: <Layers size={20} />,
    name: "Danh sách sản phẩm",
    path: "/admin/list",
  },
  { icon: <ListOrdered size={20} />, name: "Đơn hàng", path: "/admin/orders" },
];

const AdminSidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`admin-sidebar fixed top-[57px] bottom-0 left-0 z-30 flex w-64 flex-col overflow-y-auto border-gray-300 border-r bg-white pt-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="mb-2 flex items-center justify-between px-4 md:hidden">
        <p className="font-medium text-gray-800">Menu</p>
        <button
          className="cursor-pointer text-gray-600"
          onClick={() => setOpen(false)}
          type="button"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex flex-col">
        {sidebarLinks.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 border-r-4 px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "border-indigo-500 bg-indigo-500/10 font-medium text-indigo-500"
                  : "border-white text-gray-700 hover:bg-gray-100"
              }`
            }
            key={item.path}
            onClick={() => setOpen(false)}
            to={item.path}
          >
            {item.icon}
            <p>{item.name}</p>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
