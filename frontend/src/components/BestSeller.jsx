import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContextValue";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestSeller = useMemo(
    () => products.filter((item) => item.bestseller).slice(0, 5),
    [products],
  );

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="BÁN CHẠY" text2="NHẤT" />
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-sm md:text-base">
          Những sản phẩm được yêu thích nhất bởi hàng ngàn khách hàng.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSeller.map((item) => (
          <ProductItem
            id={item._id}
            image={item.image}
            key={item._id}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
