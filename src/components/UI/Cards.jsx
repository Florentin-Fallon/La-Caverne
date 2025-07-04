import React, { useState, useEffect, useRef } from "react";
import Carousel2 from "../../assets/Carousel2.png";
import Carousel3 from "../../assets/Carousel3.png";
import Carousel from "../../assets/Carousel.png";
import Carousel5 from "../../assets/Carousel5.png";
import Carousel4 from "../../assets/Carousel4.png";

function Cards() {
  const originalImages = [Carousel, Carousel2, Carousel3, Carousel4, Carousel5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  const images = [
    ...originalImages,
  ];

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex >= images.length-1 ? 0 : prevIndex + 1);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex < 0 ? images.length - 1 : prevIndex - 1);
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      //if (currentIndex === images.length - 1) {
      //  setTimeout(() => {
      //    setCurrentIndex(1);
      //  }, 50);
      //} else if (currentIndex === 0) {
      //  setTimeout(() => {
      //    setCurrentIndex(originalImages.length);
      //  }, 50);
      //}
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        carousel.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentIndex, isTransitioning, images.length, originalImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  return (
    <div className="mt-5 p-5 mx-5">
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={carouselRef}
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
                alt={`Produit ${
                  index === 0
                    ? originalImages.length
                    : index === images.length - 1
                    ? 1
                    : index
                }`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black opacity-50 text-white p-2 rounded-full hover:opacity-100 cursor-pointer transition-all duration-200"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black opacity-50 text-white p-2 rounded-full hover:opacity-100 cursor-pointer transition-all duration-200"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index - 1)}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-200 ${
                (currentIndex) % originalImages.length === index
                  ? "bg-white"
                  : "bg-white opacity-50 hover:opacity-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
