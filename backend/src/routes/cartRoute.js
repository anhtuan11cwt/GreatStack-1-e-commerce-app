import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

/**
 * @swagger
 * http://localhost:4000/api/v1/cart:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [itemId, size]
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của sản phẩm
 *                 example: 665abc123def456...
 *               size:
 *                 type: string
 *                 description: Kích cỡ được chọn
 *                 example: M
 *     responses:
 *       200:
 *         description: "message: Đã thêm vào giỏ hàng"
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
 *                   example: Đã thêm vào giỏ hàng
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: "message: Không có quyền truy cập"
 */
cartRouter.post("/", authUser, addToCart);

/**
 * @swagger
 * http://localhost:4000/api/v1/cart:
 *   patch:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [itemId, size, quantity]
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của sản phẩm
 *                 example: 665abc123def456...
 *               size:
 *                 type: string
 *                 description: Kích cỡ cần cập nhật
 *                 example: M
 *               quantity:
 *                 type: number
 *                 description: Số lượng mới
 *                 example: 3
 *     responses:
 *       200:
 *         description: "message: Đã cập nhật giỏ hàng"
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
 *                   example: Đã cập nhật giỏ hàng
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: "message: Không có quyền truy cập"
 */
cartRouter.patch("/", authUser, updateCart);

/**
 * @swagger
 * http://localhost:4000/api/v1/cart:
 *   get:
 *     summary: Lấy giỏ hàng của người dùng
 *     tags: [Cart]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: "message: Lấy giỏ hàng thành công"
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
 *                   example: Lấy giỏ hàng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     cartData:
 *                       type: object
 *                       description: "Đối tượng giỏ hàng dạng { itemId: { size: quantity } }"
 *                       example:
 *                         "665abc123def456...":
 *                           M: 2
 *                           L: 1
 *       401:
 *         description: "message: Không có quyền truy cập"
 */
cartRouter.get("/", authUser, getUserCart);

export default cartRouter;
