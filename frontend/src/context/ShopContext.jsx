import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "./ShopContextValue";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
  const currency = "₫";
  const deliveryFee = 10000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/product/list`);
        if (response.data.success) {
          setProducts(response.data.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, []);

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

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/v1/cart`,
          { itemId, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
      }
    }

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

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    if (cartData[itemId][size] <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.patch(
          `${backendUrl}/api/v1/cart`,
          { itemId, quantity, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
      }
    }
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

  const getUserCart = useCallback(async (userToken) => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/cart`, {
        headers: { token: userToken },
      });
      if (response.data.success) {
        setCartItems(response.data.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/cart`, {
          headers: { token },
          signal: controller.signal,
        });
        if (response.data.success) {
          setCartItems(response.data.data.cartData);
        }
      } catch (error) {
        if (!controller.signal.aborted) console.log(error);
      }
    };
    fetchCart();
    return () => controller.abort();
  }, [token]);

  const value = {
    addToCart,
    backendUrl,
    cartItems,
    currency,
    deliveryFee,
    getCartAmount,
    getCartCount,
    getUserCart,
    products,
    search,
    setCartItems,
    setSearch,
    setShowSearch,
    setToken,
    showSearch,
    token,
    updateQuantity,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
