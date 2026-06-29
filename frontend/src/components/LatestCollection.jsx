import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContextValue";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = useMemo(() => products.slice(0, 10), [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="BỘ SƯU TẬP" text2="MỚI NHẤT" />
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-sm md:text-base">
          Khám phá những thiết kế mới nhất trong bộ sưu tập của chúng tôi, nơi
          phong cách hiện đại gặp gỡ sự tinh tế vượt thời gian.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item) => (
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

export default LatestCollection;
