import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import {
  adminLoginSchema,
  loginSchema,
  registerSchema,
} from "../validators/userValidator.js";

const userRouter = express.Router();

/**
 * @swagger
 * http://localhost:4000/api/v1/user/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Pass@1234
 *     responses:
 *       201:
 *         description: "message: Đăng ký tài khoản thành công"
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
 *                   example: Đăng ký tài khoản thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIs...
 *       400:
 *         description: "message: Người dùng đã tồn tại | Lỗi xác thực dữ liệu"
 */
userRouter.post("/register", validate(registerSchema), registerUser);

/**
 * @swagger
 * http://localhost:4000/api/v1/user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Pass@1234
 *     responses:
 *       200:
 *         description: "message: Đăng nhập thành công"
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
 *                   example: Đăng nhập thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIs...
 *       400:
 *         description: "message: Người dùng không tồn tại | Thông tin đăng nhập không hợp lệ"
 */
userRouter.post("/login", validate(loginSchema), loginUser);

/**
 * @swagger
 * http://localhost:4000/api/v1/user/admin:
 *   post:
 *     summary: Đăng nhập quản trị viên
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@fashion.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: "message: Đăng nhập quản trị viên thành công"
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
 *                   example: Đăng nhập quản trị viên thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIs...
 *       400:
 *         description: "message: Thông tin đăng nhập quản trị viên không hợp lệ"
 */
userRouter.post("/admin", validate(adminLoginSchema), adminLogin);

export default userRouter;
