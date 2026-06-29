import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminLogin = ({ setToken }) => {
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || "");
  const [password, setPassword] = useState(
    import.meta.env.VITE_ADMIN_PASSWORD || "",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem("admin_token", token);
        setToken(token);
        toast.success("Đăng nhập thành công");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center font-semibold text-gray-800 text-xl">
          FASHION ADMIN
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <span className={loading ? "pointer-events-none opacity-50" : ""}>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-400 focus:outline-none"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fashion.com"
                required
                type="email"
                value={email}
              />
            </span>
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block font-medium text-gray-700 text-sm"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <span className={loading ? "pointer-events-none opacity-50" : ""}>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-indigo-400 focus:outline-none"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
              </span>
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-500 py-2.5 font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
