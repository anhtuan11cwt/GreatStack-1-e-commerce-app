import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const categoryMap = {
  Kids: "Trẻ em",
  Men: "Nam",
  Women: "Nữ",
};

const subCategoryMap = {
  Bottomwear: "Quần",
  Topwear: "Áo",
  Winterwear: "Đồ đông",
};

const AdminList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/product/list");
      if (response.data.success) {
        setProducts(response.data.data.products);
      }
    } catch {
      toast.error("Lỗi tải danh sách sản phẩm");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await axios.get("/api/v1/product/list");
        if (!cancelled && response.data.success) {
          setProducts(response.data.data.products);
        }
      } catch {
        if (!cancelled) toast.error("Lỗi tải danh sách sản phẩm");
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const removeProduct = async (id) => {
    const previousProducts = products;
    setProducts((prev) => prev.filter((p) => p._id !== id));
    setDeleteId(null);

    try {
      const response = await axios.delete(`/api/v1/product/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Xóa sản phẩm thành công");
        fetchProducts();
      } else {
        toast.error(response.data.message);
        setProducts(previousProducts);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi xóa sản phẩm");
      setProducts(previousProducts);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h2 className="pb-4 font-medium text-lg">Tất cả sản phẩm</h2>

      <div className="flex flex-col gap-3 sm:hidden">
        {products.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            Không có sản phẩm nào
          </p>
        )}
        {products.map((product) => (
          <div
            className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-4"
            key={product._id}
          >
            <div className="shrink-0 overflow-hidden rounded border border-gray-300">
              <img
                alt={product.name}
                className="h-14 w-14 object-cover"
                src={product.image?.[0]}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900 text-sm">
                {product.name}
              </p>
              <p className="text-gray-500 text-xs">
                {categoryMap[product.category] || product.category} &middot;{" "}
                {subCategoryMap[product.subCategory] || product.subCategory}
              </p>
              <p className="mt-0.5 text-gray-700 text-sm">
                {product.price?.toLocaleString("vi-VN")}₫
              </p>
            </div>
            <Link
              className="shrink-0 cursor-pointer text-indigo-500 hover:text-indigo-700"
              to={`/admin/edit/${product._id}`}
            >
              <Pencil size={16} />
            </Link>
            <button
              className="shrink-0 cursor-pointer font-medium text-red-500 text-sm hover:text-red-700"
              onClick={() => setDeleteId(product._id)}
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="hidden w-full overflow-hidden rounded-md border border-gray-500/20 bg-white sm:block">
        <table className="w-full table-fixed overflow-hidden md:table-auto">
          <thead className="text-left text-gray-900 text-sm">
            <tr>
              <th className="truncate px-4 py-3 font-semibold">Sản phẩm</th>
              <th className="truncate px-4 py-3 font-semibold">Danh mục</th>
              <th className="truncate px-4 py-3 font-semibold max-sm:hidden">
                Danh mục con
              </th>
              <th className="truncate px-4 py-3 font-semibold">Giá</th>
              <th className="truncate px-4 py-3 font-semibold">Sửa</th>
              <th className="truncate px-4 py-3 font-semibold">Xóa</th>
            </tr>
          </thead>
          <tbody className="text-gray-500 text-sm">
            {products.map((product) => (
              <tr className="border-gray-500/20 border-t" key={product._id}>
                <td className="flex items-center space-x-3 truncate py-3 pl-2 md:px-4 md:pl-4">
                  <div className="shrink-0 overflow-hidden rounded border border-gray-300">
                    <img
                      alt={product.name}
                      className="h-16 w-16 object-cover"
                      src={product.image?.[0]}
                    />
                  </div>
                  <span className="w-full truncate max-sm:hidden">
                    {product.name}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {categoryMap[product.category] || product.category}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {subCategoryMap[product.subCategory] || product.subCategory}
                </td>
                <td className="px-4 py-3">
                  {product.price?.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-4 py-3">
                  <Link
                    className="cursor-pointer text-indigo-500 hover:text-indigo-700"
                    to={`/admin/edit/${product._id}`}
                  >
                    <Pencil size={16} />
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="cursor-pointer font-medium text-red-500 hover:text-red-700"
                    onClick={() => setDeleteId(product._id)}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="hidden py-8 text-center text-gray-500 sm:block">
            Không có sản phẩm nào
          </p>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 flex w-[370px] flex-col items-center rounded-xl border border-gray-200 bg-white px-5 py-6 shadow-md md:w-[460px]">
            <div className="flex items-center justify-center rounded-full bg-red-100 p-4">
              <Trash2 className="text-red-600" size={24} />
            </div>
            <h2 className="mt-4 font-semibold text-gray-900 text-xl">
              Xác nhận xóa?
            </h2>
            <p className="mt-2 text-center text-gray-600 text-sm">
              Bạn có chắc muốn xóa sản phẩm này?
              <br />
              Thao tác này không thể hoàn tác.
            </p>
            <div className="mt-5 flex w-full items-center justify-center gap-4">
              <button
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 bg-white font-medium text-gray-600 text-sm transition hover:bg-gray-100 active:scale-95 md:w-36"
                onClick={() => setDeleteId(null)}
                type="button"
              >
                <X size={16} />
                Hủy
              </button>
              <button
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 font-medium text-sm text-white transition hover:bg-red-700 active:scale-95 md:w-36"
                onClick={() => removeProduct(deleteId)}
                type="button"
              >
                <Trash2 size={16} />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminList;
