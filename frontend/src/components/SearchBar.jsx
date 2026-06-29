import { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextValue";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="mx-5 my-3 inline-flex w-3/4 items-center justify-center rounded-full border border-gray-400 px-5 py-2 sm:w-1/2">
        <input
          className="flex-1 bg-transparent text-sm outline-none"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          ref={inputRef}
          type="text"
          value={search}
        />
        <button
          className="cursor-pointer"
          onClick={() => setShowSearch(false)}
          type="button"
        >
          <img alt="" className="w-3" src={assets.cross_icon} />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
