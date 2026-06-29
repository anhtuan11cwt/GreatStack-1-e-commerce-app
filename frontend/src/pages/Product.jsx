import { ShoppingCart } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Breadcrumb from "../components/Breadcrumb";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../context/ShopContextValue";
import formatCurrency from "../utils/formatCurrency";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState("");

  const productData = useMemo(
    () => products.find((p) => p._id === productId) || false,
    [products, productId],
  );

  const displayImage = selectedImage || productData?.image[0];

  if (!productData) {
    return <div className="py-10 text-center">Đang tải sản phẩm...</div>;
  }

  return (
    <>
      <div className="border-t">
        <Breadcrumb
          items={[
            { label: "Bộ sưu tập", to: "/collection" },
            { label: productData.name },
          ]}
        />
        <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
          <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
            <div className="flex shrink-0 justify-between gap-3 overflow-x-auto sm:flex-col sm:justify-start">
              {productData.image.map((img) => (
                <button
                  className="shrink-0 cursor-pointer"
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  type="button"
                >
                  <img
                    alt=""
                    className="h-[5rem] w-[5rem] object-cover"
                    src={img}
                  />
                </button>
              ))}
            </div>
            <div className="w-full sm:w-4/5">
              <img alt="" className="w-full" src={displayImage || ""} />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  alt=""
                  className="w-3.5"
                  key={i}
                  src={i <= 4 ? assets.star_icon : assets.star_dull_icon}
                />
              ))}
              <p className="ml-2">(122)</p>
            </div>
            <p className="mt-5 font-medium text-3xl">
              {formatCurrency(productData.price)}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <p className="font-medium">Chọn kích cỡ</p>
              <div className="flex gap-2">
                {productData.sizes.map((s) => (
                  <button
                    className={`cursor-pointer border px-4 py-2 ${
                      s === size ? "border-orange-500" : "border-gray-300"
                    }`}
                    key={s}
                    onClick={() => setSize(s)}
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-3 text-sm text-white active:bg-gray-700 sm:w-1/2"
              onClick={() => addToCart(productData._id, size)}
              type="button"
            >
              <ShoppingCart size={16} /> THÊM VÀO GIỎ HÀNG
            </button>

            <hr className="mt-8 sm:w-4/5" />
            <div className="mt-5 flex flex-col gap-2 text-gray-500 text-sm">
              <p>Giao hàng miễn phí cho đơn từ 500.000₫.</p>
              <p>Đổi trả dễ dàng trong 7 ngày.</p>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </>
  );
};

export default Product;
