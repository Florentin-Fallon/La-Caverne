import React from "react";
import { useNavigate } from "react-router-dom";
import {OrbitProgress} from "react-loading-indicators";

function CardProduct({ id, title, price, category, image, tags }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produit/${id}`);
  };

  return (
    <div
      className="flex flex-col items-start justify-center gap-1 border-1 border-white hover:duration-200 hover:border-gray-400 shadow-2xl cursor-pointer rounded-2xl p-3 my-5 transition-transform duration-200 hover:scale-105 w-56"
      onClick={handleClick}
    >
      <div className="w-full flex justify-center relative h-50">
        <div className={"absolute w-full h-50 bg-[#346644] rounded-sm items-center flex justify-center"}>
          <OrbitProgress color="white" size="small" text="" textColor="" dense={true} />
        </div>
        <img
          src={image}
          alt={title || "Produit"}
          className="absolute w-50 h-50 rounded-sm object-cover max-w-full max-h-full"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <h1
          className="text-white text-left truncate w-full max-w-full"
          title={title || "Tour gaming"}
        >
          {title || "Tour gaming"}
        </h1>
        <p className="text-white text-left font-bold">{price || "300€"}€</p>
        <div className="flex flex-wrap gap-1">
          {tags && tags.length > 0 ? (
            tags.slice(0, 2).map((tag, index) => (
              <p
                key={index}
                className="text-[#66C183] border-1 border-[#66C183] mt-2 rounded-lg px-2 py-1 text-xs"
              >
                {tag}
              </p>
            ))
          ) : (
            <p className="text-[#66C183] border-1 border-[#66C183] mt-2 rounded-lg px-2 py-1 text-xs">
              {category || "Informatique"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
