import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Đăng ký");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
          className="w-full border border-gray-300 px-3 py-2 outline-gray-400"
          placeholder="Họ tên"
          type="text"
        />
      )}

      <input
        className="w-full border border-gray-300 px-3 py-2 outline-gray-400"
        placeholder="Email"
        type="email"
      />
      <div className="relative w-full">
        <input
          className="w-full border border-gray-300 px-3 py-2 pr-10 outline-gray-400"
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
        />
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
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
              className="cursor-pointer text-blue-600"
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
              className="cursor-pointer text-blue-600"
              onClick={() => setCurrentState("Đăng nhập")}
              type="button"
            >
              Đăng nhập
            </button>
          </p>
        )}
      </div>

      <button
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-3 text-white"
        type="submit"
      >
        {currentState === "Đăng nhập" ? (
          <LogIn size={18} />
        ) : (
          <UserPlus size={18} />
        )}
        {currentState === "Đăng nhập" ? "Đăng nhập" : "Đăng ký"}
      </button>
    </form>
  );
};

export default Login;
