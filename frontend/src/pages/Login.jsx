import axios from "axios";
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContextValue";

const Login = () => {
  const { backendUrl, setToken, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Đăng nhập");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Đăng nhập") {
        const response = await axios.post(`${backendUrl}/api/v1/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Đăng nhập thành công");
          setToken(response.data.data.token);
          localStorage.setItem("token", response.data.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/v1/user/register`,
          {
            email,
            name,
            password,
          },
        );
        if (response.data.success) {
          toast.success("Đăng ký thành công, vui lòng đăng nhập");
          setCurrentState("Đăng nhập");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mx-auto flex min-h-[70vh] w-[90%] flex-col items-center justify-center gap-4 border-t pt-10 text-gray-800 sm:max-w-md"
      onSubmit={onSubmitHandler}
    >
      <div className="mt-10 mb-2 inline-flex items-center gap-2">
        <p className="text-3xl">{currentState}</p>
        <p className="h-[2px] w-8 bg-gray-800" />
      </div>

      {currentState === "Đăng nhập" ? null : (
        <input
          className="w-full border border-gray-300 px-3 py-2 outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          placeholder="Họ tên"
          type="text"
          value={name}
        />
      )}

      <input
        className="w-full border border-gray-300 px-3 py-2 outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        value={email}
      />
      <div className="relative w-full">
        <input
          className="w-full border border-gray-300 px-3 py-2 pr-10 outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={password}
        />
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="mt-[-8px] flex w-full justify-between text-sm">
        <p className="cursor-pointer">Quên mật khẩu?</p>
        {currentState === "Đăng nhập" ? (
          <p>
            Chưa có tài khoản?{" "}
            <button
              className="cursor-pointer text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              onClick={() => setCurrentState("Đăng ký")}
              type="button"
            >
              Đăng ký ngay
            </button>
          </p>
        ) : (
          <p>
            Đã có tài khoản?{" "}
            <button
              className="cursor-pointer text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              onClick={() => setCurrentState("Đăng nhập")}
              type="button"
            >
              Đăng nhập
            </button>
          </p>
        )}
      </div>

      <button
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loading}
        type="submit"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : currentState === "Đăng nhập" ? (
          <LogIn size={18} />
        ) : (
          <UserPlus size={18} />
        )}
        {loading
          ? "Đang xử lý..."
          : currentState === "Đăng nhập"
            ? "Đăng nhập"
            : "Đăng ký"}
      </button>
    </form>
  );
};

export default Login;
