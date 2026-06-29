import express from "express";
import {
  addProduct,
  editProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/admin.js";
import upload from "../middleware/multer.js";
import validate from "../middleware/validate.js";
import {
  addProductSchema,
  editProductSchema,
} from "../validators/productValidator.js";

const productRouter = express.Router();

/**
 * @swagger
 * http://localhost:4000/api/v1/product/add:
 *   post:
 *     summary: Thêm sản phẩm mới
 *     tags: [Product]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, description, price, category, subCategory, sizes]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 120
 *                 example: Áo thun nam cổ tròn chất liệu cotton
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 description: Mô tả sản phẩm (tùy chọn)
 *                 example: Áo thun chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt
 *               price:
 *                 type: number
 *                 example: 250000
 *               category:
 *                 type: string
 *                 example: Thời trang nam
 *               subCategory:
 *                 type: string
 *                 example: Áo thun
 *               sizes:
 *                 type: string
 *                 description: Mảng JSON các kích cỡ
 *                 example: '["S","M","L","XL"]'
 *               bestseller:
 *                 type: string
 *                 example: "true"
 *               image1:
 *                 type: string
 *                 format: binary
 *               image2:
 *                 type: string
 *                 format: binary
 *               image3:
 *                 type: string
 *                 format: binary
 *               image4:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: "message: Thêm sản phẩm thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Thêm sản phẩm thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: object
 *                       example:
 *                         _id: "665abc123def456..."
 *                         name: "Áo thun nam cổ tròn chất liệu cotton"
 *                         description: "Áo thun chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt"
 *                         price: 250000
 *                         category: "Thời trang nam"
 *                         subCategory: "Áo thun"
 *                         sizes: ["S", "M", "L", "XL"]
 *                         bestseller: true
 *                         image: ["https://res.cloudinary.com/demo/image/upload/v1/1-e-commerce-app/products/ao-thun-1.jpg"]
 *                         date: 1719532800000
 *       400:
 *         description: "message: Lỗi xác thực dữ liệu | Phải có ít nhất một ảnh sản phẩm"
 *       401:
 *         description: "message: Không có quyền truy cập"
 */
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { maxCount: 1, name: "image1" },
    { maxCount: 1, name: "image2" },
    { maxCount: 1, name: "image3" },
    { maxCount: 1, name: "image4" },
  ]),
  validate(addProductSchema),
  addProduct,
);

/**
 * @swagger
 * http://localhost:4000/api/v1/product/list:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: "message: Lấy danh sách sản phẩm thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách sản phẩm thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                       example:
 *                         - _id: "665abc123def456..."
 *                           name: "Áo thun nam cổ tròn chất liệu cotton"
 *                           description: "Áo thun chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt"
 *                           price: 250000
 *                           category: "Thời trang nam"
 *                           subCategory: "Áo thun"
 *                           sizes: ["S", "M", "L", "XL"]
 *                           bestseller: true
 *                           image: ["https://res.cloudinary.com/demo/image/upload/v1/1-e-commerce-app/products/ao-thun-1.jpg"]
 *                           date: 1719532800000
 *                         - _id: "667def456abc789..."
 *                           name: "Quần jean nam ống thẳng"
 *                           description: "Quần jean chất liệu denim cao cấp, form ống thẳng"
 *                           price: 450000
 *                           category: "Thời trang nam"
 *                           subCategory: "Quần jean"
 *                           sizes: ["28", "29", "30", "31", "32"]
 *                           bestseller: false
 *                           image: ["https://res.cloudinary.com/demo/image/upload/v1/1-e-commerce-app/products/quan-jean-1.jpg"]
 *                           date: 1719619200000
 */
productRouter.get("/list", listProducts);

/**
 * @swagger
 * http://localhost:4000/api/v1/product/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Product]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123def456...
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: "message: Xóa sản phẩm thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Xóa sản phẩm thành công
 *                 data:
 *                   type: null
 *       400:
 *         description: "message: Lỗi xác thực dữ liệu"
 *       401:
 *         description: "message: Không có quyền truy cập"
 *       404:
 *         description: "message: Không tìm thấy sản phẩm"
 */
productRouter.delete("/:id", adminAuth, removeProduct);

/**
 * @swagger
 * http://localhost:4000/api/v1/product/{id}:
 *   patch:
 *     summary: Cập nhật sản phẩm
 *     tags: [Product]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123def456...
 *         description: ID của sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Áo thun nam cổ tròn
 *               description:
 *                 type: string
 *                 example: Áo thun chất liệu cotton 100%, thoáng mát
 *               price:
 *                 type: number
 *                 example: 250000
 *               category:
 *                 type: string
 *                 example: Thời trang nam
 *               subCategory:
 *                 type: string
 *                 example: Áo thun
 *               sizes:
 *                 type: string
 *                 example: '["S","M","L","XL"]'
 *               bestseller:
 *                 type: string
 *                 example: "true"
 *               existingImages:
 *                 type: string
 *                 description: Mảng JSON các URL ảnh cũ muốn giữ lại
 *                 example: '["https://res.cloudinary.com/.../img1.jpg","https://res.cloudinary.com/.../img2.jpg"]'
 *               image1:
 *                 type: string
 *                 format: binary
 *               image2:
 *                 type: string
 *                 format: binary
 *               image3:
 *                 type: string
 *                 format: binary
 *               image4:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: "message: Cập nhật sản phẩm thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cập nhật sản phẩm thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: object
 *                       example:
 *                         _id: "665abc123def456..."
 *                         name: "Áo thun nam cổ tròn chất liệu cotton"
 *                         description: "Áo thun chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt"
 *                         price: 250000
 *                         category: "Thời trang nam"
 *                         subCategory: "Áo thun"
 *                         sizes: ["S", "M", "L", "XL"]
 *                         bestseller: true
 *                         image: ["https://res.cloudinary.com/demo/image/upload/v1/1-e-commerce-app/products/ao-thun-1.jpg"]
 *                         date: 1719532800000
 *       400:
 *         description: "message: Lỗi xác thực dữ liệu | Phải có ít nhất một ảnh sản phẩm"
 *       401:
 *         description: "message: Không có quyền truy cập"
 *       404:
 *         description: "message: Không tìm thấy sản phẩm"
 */
productRouter.patch(
  "/:id",
  adminAuth,
  upload.fields([
    { maxCount: 1, name: "image1" },
    { maxCount: 1, name: "image2" },
    { maxCount: 1, name: "image3" },
    { maxCount: 1, name: "image4" },
  ]),
  validate(editProductSchema),
  editProduct,
);

/**
 * @swagger
 * http://localhost:4000/api/v1/product/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết sản phẩm
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123def456...
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: "message: Lấy thông tin sản phẩm thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy thông tin sản phẩm thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: object
 *                       example:
 *                         _id: "665abc123def456..."
 *                         name: "Áo thun nam cổ tròn chất liệu cotton"
 *                         description: "Áo thun chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt"
 *                         price: 250000
 *                         category: "Thời trang nam"
 *                         subCategory: "Áo thun"
 *                         sizes: ["S", "M", "L", "XL"]
 *                         bestseller: true
 *                         image: ["https://res.cloudinary.com/demo/image/upload/v1/1-e-commerce-app/products/ao-thun-1.jpg"]
 *                         date: 1719532800000
 *       404:
 *         description: "message: Không tìm thấy sản phẩm"
 */
productRouter.get("/:id", singleProduct);

export default productRouter;
