import { z } from "zod";

export const addProductSchema = z.object({
  bestseller: z.string().optional(),
  category: z.string().trim().min(1, "Danh mục sản phẩm không được để trống"),
  description: z
    .string()
    .trim()
    .min(1, "Mô tả sản phẩm không được để trống")
    .max(200, "Mô tả không được vượt quá 200 ký tự"),
  name: z
    .string()
    .trim()
    .min(1, "Tên sản phẩm không được để trống")
    .min(10, "Tên sản phẩm phải có ít nhất 10 ký tự")
    .max(120, "Tên sản phẩm không được vượt quá 120 ký tự"),
  price: z
    .string()
    .min(1, "Giá sản phẩm không được để trống")
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
      message: "Giá sản phẩm phải là số dương",
    }),
  sizes: z
    .string()
    .min(1, "Kích cỡ sản phẩm không được để trống")
    .refine(
      (val) => {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) && parsed.length > 0;
        } catch {
          return false;
        }
      },
      { message: "Kích cỡ sản phẩm không hợp lệ" },
    ),
  subCategory: z.string().trim().min(1, "Danh mục phụ không được để trống"),
});

export const editProductSchema = z.object({
  bestseller: z.string().optional(),
  category: z.string().trim().min(1, "Danh mục không được để trống").optional(),
  description: z
    .string()
    .trim()
    .min(1, "Mô tả sản phẩm không được để trống")
    .max(200, "Mô tả không được vượt quá 200 ký tự")
    .optional(),
  existingImages: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(10, "Tên sản phẩm phải có ít nhất 10 ký tự")
    .max(120, "Tên sản phẩm không được vượt quá 120 ký tự")
    .optional(),
  price: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
      message: "Giá sản phẩm phải là số dương",
    })
    .optional(),
  sizes: z
    .string()
    .refine(
      (val) => {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) && parsed.length > 0;
        } catch {
          return false;
        }
      },
      { message: "Kích cỡ sản phẩm không hợp lệ" },
    )
    .optional(),
  subCategory: z
    .string()
    .trim()
    .min(1, "Danh mục phụ không được để trống")
    .optional(),
});
