import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContextValue";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);

  const related = useMemo(() => {
    return products
      .filter(
        (item) =>
          item.category === category && item.subCategory === subCategory,
      )
      .slice(0, 5);
  }, [products, category, subCategory]);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="SẢN PHẨM" text2="LIÊN QUAN" />
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.map((item) => (
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

export default RelatedProducts;
