import { useState } from "react";
import toast from "react-hot-toast";
import { products } from "../assets/assets";
import { ShopContext } from "./ShopContextValue";

const ShopContextProvider = ({ children }) => {
  const currency = "₫";
  const deliveryFee = 10000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Vui lòng chọn kích cỡ sản phẩm");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        totalCount += cartItems[item][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    if (cartData[itemId][size] <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((p) => p._id === item);
      if (!itemInfo) continue;
      for (const size in cartItems[item]) {
        totalAmount += itemInfo.price * cartItems[item][size];
      }
    }
    return totalAmount;
  };

  const value = {
    addToCart,
    cartItems,
    currency,
    deliveryFee,
    getCartAmount,
    getCartCount,
    products,
    search,
    setSearch,
    setShowSearch,
    showSearch,
    updateQuantity,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
