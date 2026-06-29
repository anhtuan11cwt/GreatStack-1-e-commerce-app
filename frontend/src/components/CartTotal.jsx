import { CreditCard } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContextValue";
import formatCurrency from "../utils/formatCurrency";

const CartTotal = () => {
  const { cartItems, deliveryFee, getCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const cartAmount = getCartAmount();
  const cartIsEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <p>Tạm tính</p>
          <p>{formatCurrency(cartAmount)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Phí vận chuyển</p>
          <p>{cartIsEmpty ? formatCurrency(0) : formatCurrency(deliveryFee)}</p>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-base">
          <p>Tổng cộng</p>
          <p>{formatCurrency(cartIsEmpty ? 0 : cartAmount + deliveryFee)}</p>
        </div>
      </div>
      <button
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-3 text-sm text-white"
        onClick={() => navigate("/place-order")}
        type="button"
      >
        <CreditCard size={16} /> TIẾN HÀNH THANH TOÁN
      </button>
    </div>
  );
};

export default CartTotal;
