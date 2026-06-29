import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        data: null,
        message: "Người dùng đã tồn tại",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ email, name, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({
      data: { token },
      message: "Đăng ký tài khoản thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        data: null,
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        data: null,
        message: "Thông tin đăng nhập không hợp lệ",
        success: false,
      });
    }

    const token = createToken(user._id);
    res.status(200).json({
      data: { token },
      message: "Đăng nhập thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        data: null,
        message: "Thông tin đăng nhập quản trị viên không hợp lệ",
        success: false,
      });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(200).json({
      data: { token },
      message: "Đăng nhập quản trị viên thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

export { adminLogin, loginUser, registerUser };
