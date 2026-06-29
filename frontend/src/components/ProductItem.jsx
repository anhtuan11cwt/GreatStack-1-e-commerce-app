import { Link } from "react-router-dom";
import formatCurrency from "../utils/formatCurrency";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link className="cursor-pointer text-gray-700" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          alt=""
          className="transition duration-500 ease-in-out hover:scale-110"
          src={image[0]}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">{formatCurrency(price)}</p>
    </Link>
  );
};

export default ProductItem;
