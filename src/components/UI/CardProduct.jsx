import React from "react";
import { useNavigate } from "react-router-dom";

function CardProduct({ id, title, price, category, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produit/${id}`);
  };

  return (
    <div
      className="flex flex-col items-start justify-center gap-1 border-1 border-white hover:duration-200 hover:border-gray-400 shadow-2xl cursor-pointer rounded-2xl p-3 my-5 transition-transform duration-200 hover:scale-105"
      onClick={handleClick}
    >
      <div>
        <img
          src={image || "https://picsum.photos/200"}
          alt={title || "Produit"}
          className="w-50 h-50 rounded-sm"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <h1 className="text-white text-left">{title || "Tour gaming"}</h1>
        <p className="text-white text-left font-bold">{price || "300€"}</p>
        <div>
          <p className="text-[#66C183] border-1 border-[#66C183] mt-2 rounded-lg px-2 py-1 text-xs">
            {category || "Informatique"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
