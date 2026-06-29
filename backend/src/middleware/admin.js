import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        data: null,
        message: "Không có quyền truy cập",
        success: false,
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      tokenDecode.email !== process.env.ADMIN_EMAIL ||
      tokenDecode.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        data: null,
        message: "Không có quyền truy cập",
        success: false,
      });
    }

    next();
  } catch {
    res.status(401).json({
      data: null,
      message: "Không có quyền truy cập",
      success: false,
    });
  }
};

export default adminAuth;
