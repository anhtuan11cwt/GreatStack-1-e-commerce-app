import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, "../../../frontend/src/assets");

const productsData = [
  {
    bestseller: true,
    category: "Women",
    date: 1716634345448,
    description:
      "Áo thun cotton cổ tròn dành cho nữ, chất liệu cotton mềm mại thoáng mát, thiết kế cổ tròn thanh lịch, dễ phối đồ, phù hợp mặc hàng ngày.",
    imageFiles: ["p_img1.png"],
    name: "Áo thun cotton cổ tròn nữ",
    price: 100000,
    sizes: ["S", "M", "L"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Men",
    date: 1716621345448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: [
      "p_img2_1.png",
      "p_img2_2.png",
      "p_img2_3.png",
      "p_img2_4.png",
    ],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 200000,
    sizes: ["M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Kids",
    date: 1716234545448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img3.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 220000,
    sizes: ["S", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Men",
    date: 1716621345448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img4.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 110000,
    sizes: ["S", "M", "XXL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Women",
    date: 1716622345448,
    description:
      "Áo thun cotton cổ tròn dành cho nữ, chất liệu cotton mềm mại thoáng mát, thiết kế cổ tròn thanh lịch, dễ phối đồ, phù hợp mặc hàng ngày.",
    imageFiles: ["p_img5.png"],
    name: "Áo thun cotton cổ tròn nữ",
    price: 130000,
    sizes: ["M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Kids",
    date: 1716623423448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img6.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 140000,
    sizes: ["S", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716621542448,
    description:
      "Quần tây ống côn nam lịch lãm, chất vải cao cấp ít nhăn, form slim-fit hiện đại, phù hợp đi làm và đi chơi.",
    imageFiles: ["p_img7.png"],
    name: "Quần tây ống côn nam",
    price: 190000,
    sizes: ["S", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716622345448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img8.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 140000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716621235448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img9.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 100000,
    sizes: ["M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716622235448,
    description:
      "Quần tây ống côn nam lịch lãm, chất vải cao cấp ít nhăn, form slim-fit hiện đại, phù hợp đi làm và đi chơi.",
    imageFiles: ["p_img10.png"],
    name: "Quần tây ống côn nam",
    price: 110000,
    sizes: ["S", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716623345448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img11.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 120000,
    sizes: ["S", "M", "L"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716624445448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img12.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 150000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716625545448,
    description:
      "Áo thun cotton cổ tròn dành cho nữ, chất liệu cotton mềm mại thoáng mát, thiết kế cổ tròn thanh lịch, dễ phối đồ, phù hợp mặc hàng ngày.",
    imageFiles: ["p_img13.png"],
    name: "Áo thun cotton cổ tròn nữ",
    price: 130000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716626645448,
    description:
      "Áo thun cotton nguyên chất cho bé trai, cổ tròn năng động, vải mềm mịn không gây kích ứng da, form rộng thoải mái vận động.",
    imageFiles: ["p_img14.png"],
    name: "Áo thun cotton nguyên chất cổ tròn bé trai",
    price: 160000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716627745448,
    description:
      "Quần tây ống côn nam lịch lãm, chất vải cao cấp ít nhăn, form slim-fit hiện đại, phù hợp đi làm và đi chơi.",
    imageFiles: ["p_img15.png"],
    name: "Quần tây ống côn nam",
    price: 140000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716628845448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img16.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 170000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716629945448,
    description:
      "Quần tây ống côn nam lịch lãm, chất vải cao cấp ít nhăn, form slim-fit hiện đại, phù hợp đi làm và đi chơi.",
    imageFiles: ["p_img17.png"],
    name: "Quần tây ống côn nam",
    price: 150000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716631045448,
    description:
      "Áo thun cotton nguyên chất cho bé trai, cổ tròn năng động, vải mềm mịn không gây kích ứng da, form rộng thoải mái vận động.",
    imageFiles: ["p_img18.png"],
    name: "Áo thun cotton nguyên chất cổ tròn bé trai",
    price: 180000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716632145448,
    description:
      "Áo thun cotton nguyên chất cho bé trai, cổ tròn năng động, vải mềm mịn không gây kích ứng da, form rộng thoải mái vận động.",
    imageFiles: ["p_img19.png"],
    name: "Áo thun cotton nguyên chất cổ tròn bé trai",
    price: 160000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716633245448,
    description:
      "Quần palazzo nữ ống rộng thời thượng kèm thắt lưng đồng bộ, chất liệu mềm rũ sang trọng, tôn dáng che khuyết điểm.",
    imageFiles: ["p_img20.png"],
    name: "Quần palazzo nữ kèm thắt lưng",
    price: 190000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716634345448,
    description:
      "Áo khoác nữ khóa trước dáng rộng, chất liệu giữ ấm tốt, thiết kế trẻ trung cá tính, layer hoàn hảo cho mùa lạnh.",
    imageFiles: ["p_img21.png"],
    name: "Áo khoác nữ khóa trước dáng rộng",
    price: 170000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716635445448,
    description:
      "Quần palazzo nữ ống rộng thời thượng kèm thắt lưng đồng bộ, chất liệu mềm rũ sang trọng, tôn dáng che khuyết điểm.",
    imageFiles: ["p_img22.png"],
    name: "Quần palazzo nữ kèm thắt lưng",
    price: 200000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716636545448,
    description:
      "Áo thun cotton nguyên chất cho bé trai, cổ tròn năng động, vải mềm mịn không gây kích ứng da, form rộng thoải mái vận động.",
    imageFiles: ["p_img23.png"],
    name: "Áo thun cotton nguyên chất cổ tròn bé trai",
    price: 180000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716637645448,
    description:
      "Áo thun cotton nguyên chất cho bé trai, cổ tròn năng động, vải mềm mịn không gây kích ứng da, form rộng thoải mái vận động.",
    imageFiles: ["p_img24.png"],
    name: "Áo thun cotton nguyên chất cổ tròn bé trai",
    price: 210000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716638745448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img25.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 190000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716639845448,
    description:
      "Áo khoác nữ khóa trước dáng rộng, chất liệu giữ ấm tốt, thiết kế trẻ trung cá tính, layer hoàn hảo cho mùa lạnh.",
    imageFiles: ["p_img26.png"],
    name: "Áo khoác nữ khóa trước dáng rộng",
    price: 220000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716640945448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img27.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 200000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716642045448,
    description:
      "Áo khoác denim nam dáng slim-fit cá tính, chất jeans bền đẹp theo thời gian, phối đồ street-style ấn tượng.",
    imageFiles: ["p_img28.png"],
    name: "Áo khoác denim nam dáng slim",
    price: 230000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716643145448,
    description:
      "Áo thun cotton cổ tròn dành cho nữ, chất liệu cotton mềm mại thoáng mát, thiết kế cổ tròn thanh lịch, dễ phối đồ, phù hợp mặc hàng ngày.",
    imageFiles: ["p_img29.png"],
    name: "Áo thun cotton cổ tròn nữ",
    price: 210000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716644245448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img30.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 240000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716645345448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img31.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 220000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716646445448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img32.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 250000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716647545448,
    description:
      "Áo thun cotton cổ tròn cho bé gái, chất liệu cotton an toàn cho làn da nhạy cảm, kiểu dáng dễ thương, bé thoải mái vui chơi.",
    imageFiles: ["p_img33.png"],
    name: "Áo thun cotton cổ tròn bé gái",
    price: 230000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716648645448,
    description:
      "Áo thun cotton cổ tròn dành cho nữ, chất liệu cotton mềm mại thoáng mát, thiết kế cổ tròn thanh lịch, dễ phối đồ, phù hợp mặc hàng ngày.",
    imageFiles: ["p_img34.png"],
    name: "Áo thun cotton cổ tròn nữ",
    price: 260000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716649745448,
    description:
      "Áo khoác nữ khóa trước dáng rộng, chất liệu giữ ấm tốt, thiết kế trẻ trung cá tính, layer hoàn hảo cho mùa lạnh.",
    imageFiles: ["p_img35.png"],
    name: "Áo khoác nữ khóa trước dáng rộng",
    price: 240000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716650845448,
    description:
      "Áo khoác nữ khóa trước dáng rộng, chất liệu giữ ấm tốt, thiết kế trẻ trung cá tính, layer hoàn hảo cho mùa lạnh.",
    imageFiles: ["p_img36.png"],
    name: "Áo khoác nữ khóa trước dáng rộng",
    price: 270000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716651945448,
    description:
      "Áo thun cotton cổ tròn dành cho nữ, chất liệu cotton mềm mại thoáng mát, thiết kế cổ tròn thanh lịch, dễ phối đồ, phù hợp mặc hàng ngày.",
    imageFiles: ["p_img37.png"],
    name: "Áo thun cotton cổ tròn nữ",
    price: 250000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716653045448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img38.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716654145448,
    description:
      "Áo sơ mi cotton trơn in họa tiết nam, chất liệu cotton thoáng mát, form vừa vặn lịch sự, phù hợp đi làm và dạo phố.",
    imageFiles: ["p_img39.png"],
    name: "Áo sơ mi cotton trơn in họa tiết nam",
    price: 260000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716655245448,
    description:
      "Áo khoác denim nam dáng slim-fit cá tính, chất jeans bền đẹp theo thời gian, phối đồ street-style ấn tượng.",
    imageFiles: ["p_img40.png"],
    name: "Áo khoác denim nam dáng slim",
    price: 290000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716656345448,
    description:
      "Áo thun cotton nguyên chất 100% dành cho nam, cổ tròn basic năng động, chất vải dày dặn thấm hút tốt, form vừa vặn tôn dáng.",
    imageFiles: ["p_img41.png"],
    name: "Áo thun cotton nguyên chất cổ tròn nam",
    price: 270000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716657445448,
    description:
      "Áo thun cotton nguyên chất cho bé trai, cổ tròn năng động, vải mềm mịn không gây kích ứng da, form rộng thoải mái vận động.",
    imageFiles: ["p_img42.png"],
    name: "Áo thun cotton nguyên chất cổ tròn bé trai",
    price: 300000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716658545448,
    description:
      "Quần tây ống côn trẻ em, chất vải co giãn nhẹ cho bé thoải mái vận động, form slim-fit gọn gàng, mặc đi tiệc hay đi học đều đẹp.",
    imageFiles: ["p_img43.png"],
    name: "Quần tây ống côn trẻ em",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716659645448,
    description:
      "Áo khoác nữ khóa trước dáng rộng, chất liệu giữ ấm tốt, thiết kế trẻ trung cá tính, layer hoàn hảo cho mùa lạnh.",
    imageFiles: ["p_img44.png"],
    name: "Áo khoác nữ khóa trước dáng rộng",
    price: 310000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716660745448,
    description:
      "Áo khoác denim nam dáng slim-fit cá tính, chất jeans bền đẹp theo thời gian, phối đồ street-style ấn tượng.",
    imageFiles: ["p_img45.png"],
    name: "Áo khoác denim nam dáng slim",
    price: 290000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716661845448,
    description:
      "Áo khoác denim nam dáng slim-fit cá tính, chất jeans bền đẹp theo thời gian, phối đồ street-style ấn tượng.",
    imageFiles: ["p_img46.png"],
    name: "Áo khoác denim nam dáng slim",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716662945448,
    description:
      "Quần tây ống côn trẻ em, chất vải co giãn nhẹ cho bé thoải mái vận động, form slim-fit gọn gàng, mặc đi tiệc hay đi học đều đẹp.",
    imageFiles: ["p_img47.png"],
    name: "Quần tây ống côn trẻ em",
    price: 300000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716664045448,
    description:
      "Áo khoác denim nam dáng slim-fit cá tính, chất jeans bền đẹp theo thời gian, phối đồ street-style ấn tượng.",
    imageFiles: ["p_img48.png"],
    name: "Áo khoác denim nam dáng slim",
    price: 330000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716665145448,
    description:
      "Quần tây ống côn trẻ em, chất vải co giãn nhẹ cho bé thoải mái vận động, form slim-fit gọn gàng, mặc đi tiệc hay đi học đều đẹp.",
    imageFiles: ["p_img49.png"],
    name: "Quần tây ống côn trẻ em",
    price: 310000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    date: 1716666245448,
    description:
      "Quần tây ống côn trẻ em, chất vải co giãn nhẹ cho bé thoải mái vận động, form slim-fit gọn gàng, mặc đi tiệc hay đi học đều đẹp.",
    imageFiles: ["p_img50.png"],
    name: "Quần tây ống côn trẻ em",
    price: 340000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Women",
    date: 1716667345448,
    description:
      "Áo khoác nữ khóa trước dáng rộng, chất liệu giữ ấm tốt, thiết kế trẻ trung cá tính, layer hoàn hảo cho mùa lạnh.",
    imageFiles: ["p_img51.png"],
    name: "Áo khoác nữ khóa trước dáng rộng",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    date: 1716668445448,
    description:
      "Áo khoác denim nam dáng slim-fit cá tính, chất jeans bền đẹp theo thời gian, phối đồ street-style ấn tượng.",
    imageFiles: ["p_img52.png"],
    name: "Áo khoác denim nam dáng slim",
    price: 350000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
];

function uploadToCloudinary(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: "1-e-commerce-app/products", resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
  });
}

export default async function seedProducts() {
  const count = await productModel.countDocuments();
  if (count > 0) {
    console.log(`DB đã có ${count} sản phẩm, bỏ qua seed.`);
    return;
  }

  console.log("Không tìm thấy sản phẩm nào, bắt đầu seed...");

  const insertedProducts = [];

  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];
    const imageUrls = [];

    for (const fileName of product.imageFiles) {
      const filePath = path.join(ASSETS_DIR, fileName);
      console.log(
        `  [${i + 1}/${productsData.length}] Đang upload ${fileName}...`,
      );
      const url = await uploadToCloudinary(filePath);
      imageUrls.push(url);
    }

    insertedProducts.push({
      bestseller: product.bestseller,
      category: product.category,
      date: product.date,
      description: product.description,
      image: imageUrls,
      name: product.name,
      price: product.price,
      sizes: product.sizes,
      subCategory: product.subCategory,
    });

    console.log(
      `  [${i + 1}/${productsData.length}] Đã thêm: ${product.name} (${imageUrls.length} ảnh)`,
    );
  }

  await productModel.insertMany(insertedProducts);
  console.log(`Seed thành công ${insertedProducts.length} sản phẩm!`);
}
