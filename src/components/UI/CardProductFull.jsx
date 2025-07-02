import React from "react";
import { useNavigate } from "react-router-dom";

function CardProductFull({ title, description, price, image, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produit/${id || title.replace(/\s+/g, "-").toLowerCase()}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform transition-transform"
      onClick={handleClick}
    >
      <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2 line-clamp-3 overflow-hidden">
        {description}
      </p>
      <p className="text-2xl font-bold text-[#346644]">{price}</p>
    </div>
  );
}

export default CardProductFull;
