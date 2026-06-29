import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      data: null,
      message: "Đã thêm vào giỏ hàng",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.user;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      data: null,
      message: "Đã cập nhật giỏ hàng",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user;

    const userData = await userModel.findById(userId);

    res.json({
      data: { cartData: userData.cartData },
      message: "Lấy giỏ hàng thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

export { addToCart, getUserCart, updateCart };
