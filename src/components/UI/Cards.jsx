import React, { useState, useEffect } from "react";
import logo from "../../assets/Carousel.png";

function Cards() {
  const originalImages = [logo, logo, logo, logo, logo];

  const images = [...originalImages, ...originalImages, ...originalImages];

  const [currentIndex, setCurrentIndex] = useState(originalImages.length);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= images.length) {
        return originalImages.length;
      }
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        return images.length - originalImages.length - 1;
      }
      return newIndex;
    });
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
              onClick={() => setCurrentIndex(index + originalImages.length)}
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
