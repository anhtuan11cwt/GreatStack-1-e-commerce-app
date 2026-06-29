import { FilterX } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextValue";
import removeVietnameseTones from "../utils/removeVietnameseTones";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const categoryMap = { Kids: "Trẻ em", Men: "Nam", Women: "Nữ" };
  const subcategoryMap = {
    Bottomwear: "Quần",
    Topwear: "Áo",
    Winterwear: "Đồ đông",
  };

  const filterProducts = useMemo(() => {
    let copy = products.slice();

    if (category.length > 0) {
      copy = copy.filter((item) => category.includes(item.category));
    }
    if (subcategory.length > 0) {
      copy = copy.filter((item) => subcategory.includes(item.subCategory));
    }
    if (showSearch && search) {
      copy = copy.filter((item) =>
        removeVietnameseTones(item.name).includes(
          removeVietnameseTones(search),
        ),
      );
    }

    if (sortType === "low-high") copy.sort((a, b) => a.price - b.price);
    if (sortType === "high-low") copy.sort((a, b) => b.price - a.price);

    return copy;
  }, [category, subcategory, search, showSearch, products, sortType]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <div className="flex flex-col gap-10 border-t pt-10 sm:flex-row">
      <div className="min-w-60">
        <button
          className="my-2 flex cursor-pointer items-center gap-2 text-xl"
          onClick={() => setShowFilter((prev) => !prev)}
          type="button"
        >
          BỘ LỌC
          <img
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
          />
        </button>

        <div className={`${showFilter ? "" : "hidden"} sm:block`}>
          <div className="mt-6 border border-gray-300 py-3 pl-5">
            <p className="mb-3 font-medium text-sm">DANH MỤC</p>
            <div className="flex flex-col gap-2 text-sm">
              {Object.entries(categoryMap).map(([value, label]) => (
                <label className="flex gap-2" key={value}>
                  <input
                    checked={category.includes(value)}
                    onChange={toggleCategory}
                    type="checkbox"
                    value={value}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-10 border border-gray-300 py-3 pl-5">
            <p className="mb-3 font-medium text-sm">DANH MỤC PHỤ</p>
            <div className="flex flex-col gap-2 text-sm">
              {Object.entries(subcategoryMap).map(([value, label]) => (
                <label className="flex gap-2" key={value}>
                  <input
                    checked={subcategory.includes(value)}
                    onChange={toggleSubcategory}
                    type="checkbox"
                    value={value}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <button
            className="flex w-full cursor-pointer items-center justify-center gap-1 bg-black py-2 text-sm text-white"
            onClick={() => {
              setCategory([]);
              setSubcategory([]);
            }}
            type="button"
          >
            Xóa bộ lọc
            <FilterX size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-4 flex flex-col gap-2 text-base sm:flex-row sm:justify-between sm:text-2xl">
          <Title text1="TẤT CẢ" text2="SẢN PHẨM" />
          <select
            className="border-2 border-gray-300 px-3 py-1.5 sm:px-2 sm:py-0"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Mặc định</option>
            <option value="low-high">Giá: Thấp đến Cao</option>
            <option value="high-low">Giá: Cao đến Thấp</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {filterProducts.map((item) => (
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
    </div>
  );
};

export default Collection;
