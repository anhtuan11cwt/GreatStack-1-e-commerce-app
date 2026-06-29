import { useState } from "react";
import { products } from "../assets/assets";
import { ShopContext } from "./ShopContextValue";

const ShopContextProvider = ({ children }) => {
  const currency = "₫";
  const deliveryFee = 10000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    currency,
    deliveryFee,
    products,
    search,
    setSearch,
    setShowSearch,
    showSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
