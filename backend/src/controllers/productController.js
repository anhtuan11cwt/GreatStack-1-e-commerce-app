import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const getPublicId = (url) => {
  const segments = url.split("/");
  const versionIndex = segments.findIndex((s) => /^v\d+$/.test(s));
  return segments
    .slice(versionIndex + 1)
    .join("/")
    .replace(/\.[^.]+$/, "");
};

const deleteCloudImages = (urls) =>
  Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(getPublicId(url), (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        }),
    ),
  );

const addProduct = async (req, res) => {
  try {
    const {
      bestseller,
      category,
      description,
      name,
      price,
      sizes,
      subCategory,
    } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined,
    );

    const imagesUrl = await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "1-e-commerce-app/products", resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              },
            );
            stream.end(img.buffer);
          }),
      ),
    );

    const productData = {
      bestseller: bestseller === "true",
      category,
      date: Date.now(),
      description,
      image: imagesUrl,
      name,
      price: Number(price),
      sizes: JSON.parse(sizes),
      subCategory,
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      data: { product },
      message: "Thêm sản phẩm thành công",
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

const listProducts = async (_req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      data: { products },
      message: "Lấy danh sách sản phẩm thành công",
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

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        data: null,
        message: "Không tìm thấy sản phẩm",
        success: false,
      });
    }

    await deleteCloudImages(product.image);

    await productModel.findByIdAndDelete(id);
    res.status(200).json({
      data: null,
      message: "Xóa sản phẩm thành công",
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

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await productModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        data: null,
        message: "Không tìm thấy sản phẩm",
        success: false,
      });
    }

    const {
      bestseller,
      category,
      description,
      name,
      price,
      sizes,
      subCategory,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory;
    if (price !== undefined) updateData.price = Number(price);
    if (bestseller !== undefined) updateData.bestseller = bestseller === "true";
    if (sizes !== undefined) updateData.sizes = JSON.parse(sizes);

    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : null;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const newImages = [image1, image2, image3, image4].filter(
      (img) => img !== undefined,
    );

    if (existingImages || newImages.length > 0) {
      const toDelete = existingImages
        ? existing.image.filter((url) => !existingImages.includes(url))
        : existing.image;
      if (toDelete.length > 0) await deleteCloudImages(toDelete);
    }

    if (newImages.length > 0) {
      const imagesUrl = await Promise.all(
        newImages.map(
          (img) =>
            new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "1-e-commerce-app/products", resource_type: "image" },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result.secure_url);
                },
              );
              stream.end(img.buffer);
            }),
        ),
      );
      updateData.image = [...(existingImages ?? existing.image), ...imagesUrl];
    } else if (existingImages) {
      updateData.image = existingImages;
    }

    const product = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json({
      data: { product },
      message: "Cập nhật sản phẩm thành công",
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

const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        data: null,
        message: "Không tìm thấy sản phẩm",
        success: false,
      });
    }
    res.status(200).json({
      data: { product },
      message: "Lấy thông tin sản phẩm thành công",
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

export { addProduct, editProduct, listProducts, removeProduct, singleProduct };
