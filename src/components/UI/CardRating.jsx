import React from "react";

function CardRating({ name, description, logo, rating }) {
  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (note >= i) {
        stars.push(
          <span
            key={i + "-full"}
            className="text-yellow-400 text-sm align-middle"
          >
            ★
          </span>
        );
      } else if (note >= i - 0.5) {
        stars.push(
          <span
            key={i + "-half"}
            className="relative inline-block w-4 h-4 align-middle"
          >
            <span className="absolute left-0 top-0 w-full h-full">
              <span className="text-gray-300 text-sm">★</span>
            </span>
            <span className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
              <span className="text-yellow-400 text-sm">★</span>
            </span>
          </span>
        );
      } else {
        stars.push(
          <span
            key={i + "-empty"}
            className="text-gray-300 text-sm align-middle"
          >
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-row gap-4 bg-white rounded-lg p-4 w-[calc(50%-0.5rem)] transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
      <img src={logo} alt="rating" className="w-10 h-10 rounded-lg" />
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-bold">{name}</h2>
          <div className="flex items-center">{renderStars(rating)}</div>
        </div>
        <p className="font-stretch-extra-condensed text-sm/6 text-left">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CardRating;
