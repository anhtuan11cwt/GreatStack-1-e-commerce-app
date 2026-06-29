import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, "Tên không được để trống")
  .max(50, "Tên không được vượt quá 50 ký tự")
  .transform((val) => val.replace(/\s+/g, " "))
  .pipe(
    z
      .string()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được vượt quá 50 ký tự")
      .regex(
        /^[\p{L}\s'-]+$/u,
        "Tên chỉ được chứa chữ cái, dấu cách, dấu gạch ngang (-) và dấu nháy đơn (')",
      ),
  );

const emailSchema = z
  .string()
  .min(1, "Email không được để trống")
  .max(254, "Email không được vượt quá 254 ký tự")
  .email("Email không hợp lệ");

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(64, "Mật khẩu không được vượt quá 64 ký tự")
  .refine((val) => /[A-Z]/.test(val), "Mật khẩu phải có ít nhất 1 chữ hoa")
  .refine((val) => /[a-z]/.test(val), "Mật khẩu phải có ít nhất 1 chữ thường")
  .refine((val) => /\d/.test(val), "Mật khẩu phải có ít nhất 1 chữ số")
  .refine(
    (val) => /[!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]/.test(val),
    "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
  )
  .regex(
    /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{}|;:',.<>?/~`]+$/,
    "Mật khẩu chỉ được chứa chữ cái (A-Z, a-z), chữ số (0-9) và ký tự đặc biệt",
  );

export const registerSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export const adminLoginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});
