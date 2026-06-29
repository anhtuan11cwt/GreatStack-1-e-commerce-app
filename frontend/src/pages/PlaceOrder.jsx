import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    street: "",
    zipcode: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate("/orders");
  };

  return (
    <form
      className="flex flex-col gap-16 border-t pt-14 sm:flex-row"
      onSubmit={onSubmitHandler}
    >
      <div className="flex-1">
        <Title text1="THÔNG TIN" text2="GIAO HÀNG" />
        <div className="flex gap-3">
          <input
            className="mb-4 w-1/2 border border-gray-300 px-3 py-2 outline-gray-400"
            name="firstName"
            onChange={onChangeHandler}
            placeholder="Họ"
            required
            type="text"
            value={formData.firstName}
          />
          <input
            className="mb-4 w-1/2 border border-gray-300 px-3 py-2 outline-gray-400"
            name="lastName"
            onChange={onChangeHandler}
            placeholder="Tên"
            required
            type="text"
            value={formData.lastName}
          />
        </div>
        <input
          className="mb-4 w-full border border-gray-300 px-3 py-2 outline-gray-400"
          name="email"
          onChange={onChangeHandler}
          placeholder="Email"
          required
          type="email"
          value={formData.email}
        />
        <input
          className="mb-4 w-full border border-gray-300 px-3 py-2 outline-gray-400"
          name="street"
          onChange={onChangeHandler}
          placeholder="Địa chỉ"
          required
          type="text"
          value={formData.street}
        />
        <div className="flex gap-3">
          <input
            className="mb-4 w-1/2 border border-gray-300 px-3 py-2 outline-gray-400"
            name="city"
            onChange={onChangeHandler}
            placeholder="Thành phố"
            required
            type="text"
            value={formData.city}
          />
          <input
            className="mb-4 w-1/2 border border-gray-300 px-3 py-2 outline-gray-400"
            name="state"
            onChange={onChangeHandler}
            placeholder="Tỉnh"
            required
            type="text"
            value={formData.state}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="mb-4 w-1/2 border border-gray-300 px-3 py-2 outline-gray-400"
            name="zipcode"
            onChange={onChangeHandler}
            placeholder="Mã bưu điện"
            required
            type="number"
            value={formData.zipcode}
          />
          <input
            className="mb-4 w-1/2 border border-gray-300 px-3 py-2 outline-gray-400"
            name="country"
            onChange={onChangeHandler}
            placeholder="Quốc gia"
            required
            type="text"
            value={formData.country}
          />
        </div>
        <input
          className="mb-4 w-full border border-gray-300 px-3 py-2 outline-gray-400"
          name="phone"
          onChange={onChangeHandler}
          placeholder="Số điện thoại"
          required
          type="tel"
          value={formData.phone}
        />

        <div className="mt-8">
          <Title text1="PHƯƠNG THỨC" text2="THANH TOÁN" />
          <div className="flex flex-col gap-3 lg:flex-row">
            {[
              { img: "stripe_logo", key: "stripe", label: "Stripe" },
              { img: "razorpay_logo", key: "razorpay", label: "Razorpay" },
              { key: "cod", label: "COD" },
            ].map(({ key, label }) => (
              <button
                className={`flex w-full cursor-pointer items-center gap-3 border p-3 text-left ${
                  method === key ? "border-green-500" : ""
                }`}
                key={key}
                onClick={() => setMethod(key)}
                type="button"
              >
                <div
                  className={`h-4 min-w-4 rounded-full border ${
                    method === key ? "bg-green-500" : ""
                  }`}
                />
                <p>{label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sm:w-1/3">
        <CartTotal />
        <button
          className="mt-6 w-full cursor-pointer bg-black py-3 text-sm text-white"
          type="submit"
        >
          ĐẶT HÀNG
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
