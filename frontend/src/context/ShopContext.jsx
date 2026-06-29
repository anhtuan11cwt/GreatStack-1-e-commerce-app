import { products } from "../assets/assets";
import { ShopContext } from "./ShopContextValue";

const ShopContextProvider = ({ children }) => {
  const currency = "₫";
  const deliveryFee = 10000;

  const value = {
    currency,
    deliveryFee,
    products,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
