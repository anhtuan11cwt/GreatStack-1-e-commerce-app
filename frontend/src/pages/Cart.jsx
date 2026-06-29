import { ArrowLeft, Trash2, X } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextValue";
import formatCurrency from "../utils/formatCurrency";

const Cart = () => {
  const { products, cartItems, updateQuantity } = useContext(ShopContext);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const cartData = useMemo(() => {
    const data = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          data.push({
            _id: itemId,
            quantity: cartItems[itemId][size],
            size,
          });
        }
      }
    }
    return data;
  }, [cartItems]);

  if (cartData.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-gray-500">Giỏ hàng trống</p>
        <Link
          className="inline-flex items-center gap-1 text-gray-600 text-sm hover:text-black"
          to="/collection"
        >
          <ArrowLeft size={16} /> Quay lại mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 border-t pt-14 sm:flex-row">
      <div className="flex-1">
        <div>
          <Link
            className="mb-4 inline-flex items-center gap-1 text-gray-600 text-sm hover:text-black"
            to="/collection"
          >
            <ArrowLeft size={16} /> Quay lại mua sắm
          </Link>
        </div>
        <Title text1="GIỎ" text2="HÀNG" />
        {cartData.map((item) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;
          return (
            <div
              className="flex items-center gap-4 border-t border-b py-4 text-gray-700"
              key={`${item._id}-${item.size}`}
            >
              <img alt="" className="w-16 sm:w-20" src={productData.image[0]} />
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {productData.name}
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <p>{formatCurrency(productData.price)}</p>
                    <p className="border bg-slate-50 px-2 sm:px-3 sm:py-1">
                      {item.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    className="w-12 border px-1 py-1 text-center sm:w-14 sm:px-2"
                    min={1}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value),
                      )
                    }
                    type="number"
                    value={item.quantity}
                  />
                  <button
                    onClick={() =>
                      setDeleteTarget({ id: item._id, size: item.size })
                    }
                    type="button"
                  >
                    <img
                      alt=""
                      className="w-4 cursor-pointer"
                      src={assets.bin_icon}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sm:w-1/3">
        <CartTotal />
      </div>
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded bg-white p-6 text-center">
            <p className="mb-6 text-gray-600">
              Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="flex cursor-pointer items-center gap-1 border px-5 py-2 text-gray-600"
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                <X size={16} /> Hủy
              </button>
              <button
                className="flex cursor-pointer items-center gap-1 bg-red-500 px-5 py-2 text-white"
                onClick={() => {
                  updateQuantity(deleteTarget.id, deleteTarget.size, 0);
                  setDeleteTarget(null);
                  toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
                }}
                type="button"
              >
                <Trash2 size={16} /> Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
