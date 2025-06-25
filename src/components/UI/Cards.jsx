import React, { useState, useEffect } from "react";
import Carousel2 from "../../assets/Carousel2.png";
import Carousel3 from "../../assets/Carousel3.png";
import Carousel from "../../assets/Carousel.png";
import Carousel5 from "../../assets/Carousel5.png";
import Carousel4 from "../../assets/Carousel4.png";

function Cards() {
  const originalImages = [
    Carousel,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5,
    Carousel,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5,
  ];

  const images = Array(100)
    .fill(null)
    .map((_, index) => originalImages[index % originalImages.length]);

  const [currentIndex, setCurrentIndex] = useState(50);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const getRealIndex = (index) => {
    return index % originalImages.length;
  };

  return (
    <div className="mt-5 h-50 p-5 mx-5 rounded-2xl  shadow-lg">
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              style={{ width: "100%" }}
            >
              <img
                src={image}
                alt={`Produit ${getRealIndex(index) + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {originalImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(50 + index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                getRealIndex(currentIndex) === index
                  ? "bg-white"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
