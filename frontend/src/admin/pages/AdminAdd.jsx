import axios from "axios";
import { Loader2, PackagePlus, Upload, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminAdd = ({ token }) => {
  const navigate = useNavigate();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const categoryMap = {
    Kids: "Trẻ em",
    Men: "Nam",
    Women: "Nữ",
  };

  const subCategoryMap = {
    Bottomwear: "Quần",
    Topwear: "Áo",
    Winterwear: "Đồ đông",
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleImageChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error("Vui lòng chọn ít nhất một kích cỡ");
      return;
    }

    if (!image1 && !image2 && !image3 && !image4) {
      toast.error("Phải có ít nhất một ảnh sản phẩm");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller.toString());

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      const response = await axios.post("/api/v1/product/add", formData, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Thêm sản phẩm thành công");
        navigate("/admin/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h2 className="pb-4 font-medium text-lg">Thêm sản phẩm mới</h2>
      <div className="relative max-w-lg">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <p className="font-medium text-base">Ảnh sản phẩm</p>
            <div
              className={`mt-2 flex flex-wrap items-center gap-3 ${loading ? "pointer-events-none opacity-50" : ""}`}
            >
              {[
                { img: image1, label: "one", setter: setImage1 },
                { img: image2, label: "two", setter: setImage2 },
                { img: image3, label: "three", setter: setImage3 },
                { img: image4, label: "four", setter: setImage4 },
              ].map(({ img, setter, label }) => {
                return (
                  <label
                    className="relative max-w-24 cursor-pointer"
                    key={`image-slot-${label}`}
                  >
                    <input
                      accept="image/*"
                      hidden
                      id={`image-${label}`}
                      onChange={(e) => handleImageChange(e, setter)}
                      type="file"
                    />
                    {img ? (
                      <div className="relative">
                        <img
                          alt=""
                          className="h-24 w-24 rounded border border-gray-300 object-cover"
                          height={96}
                          src={URL.createObjectURL(img)}
                          width={96}
                        />
                        <button
                          className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                          onClick={(e) => {
                            e.preventDefault();
                            setter(null);
                          }}
                          type="button"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex h-24 w-24 flex-col items-center justify-center rounded border border-gray-300 border-dashed text-gray-400">
                        <Upload size={24} />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-base" htmlFor="product-name">
              Tên sản phẩm
            </label>
            <span className={loading ? "pointer-events-none opacity-50" : ""}>
              <input
                className="w-full rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
                id="product-name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên sản phẩm"
                required
                type="text"
                value={name}
              />
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-base" htmlFor="product-desc">
              Mô tả
            </label>
            <span className={loading ? "pointer-events-none opacity-50" : ""}>
              <textarea
                className="w-full resize-none rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
                id="product-desc"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả sản phẩm"
                rows={4}
                value={description}
              />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-medium text-base" htmlFor="category">
                Danh mục
              </label>
              <span className={loading ? "pointer-events-none opacity-50" : ""}>
                <select
                  className="w-full rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {Object.entries(categoryMap).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-medium text-base" htmlFor="subcategory">
                Danh mục con
              </label>
              <span className={loading ? "pointer-events-none opacity-50" : ""}>
                <select
                  className="w-full rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
                  id="subcategory"
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                >
                  {Object.entries(subCategoryMap).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-base" htmlFor="product-price">
              Giá (VND)
            </label>
            <span className={loading ? "pointer-events-none opacity-50" : ""}>
              <input
                className="w-full rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
                id="product-price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="250000"
                required
                type="number"
                value={price}
              />
            </span>
          </div>

          <div>
            <p className="mb-2 font-medium text-base">Kích cỡ</p>
            <div
              className={`flex gap-2 ${loading ? "pointer-events-none opacity-50" : ""}`}
            >
              {sizeOptions.map((size) => (
                <button
                  className={`cursor-pointer rounded border px-4 py-1.5 text-sm transition-colors ${
                    sizes.includes(size)
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400"
                  }`}
                  key={size}
                  onClick={() => toggleSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={loading ? "pointer-events-none opacity-50" : ""}>
              <input
                checked={bestseller}
                className="h-4 w-4 accent-indigo-500"
                id="bestseller"
                onChange={(e) => setBestseller(e.target.checked)}
                type="checkbox"
              />
            </span>
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="bestseller"
            >
              Thêm vào danh sách bán chạy
            </label>
          </div>

          <button
            className="flex cursor-pointer items-center justify-center gap-2 rounded bg-indigo-500 px-8 py-2.5 font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <PackagePlus size={18} />
            )}
            {loading ? "ĐANG THÊM..." : "THÊM SẢN PHẨM"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAdd;
