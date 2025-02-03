import { FC } from "react";
import { Product } from "../types/ProductType";


interface PopularProductCardProps {
  product: Product;
}

const PopularProductCard: FC<PopularProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col w-full max-sm:w-full bg-card bg-co p-4 rounded-lg shadow-md">
      <img
        src={product.images?.[0] || "/fallback.jpg"} // ✅ Handle missing images
        alt={product.title}
        className="w-[280px] h-[280px] object-cover rounded-lg"
      />

    </div>
  );
};

export default PopularProductCard;
