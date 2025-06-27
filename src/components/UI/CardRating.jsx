import React from "react";
import logo from "../../assets/bonny_the_parrot.png";

function CardRating() {
  return (
    <div className="flex flex-row gap-4 bg-white rounded-lg p-4 w-2/5 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
      <img src={logo} alt="rating" className="w-10 h-10" />
      <div>
        <h2 className="text-lg font-bold">Jean</h2>
        <p className="font-stretch-extra-condensed text-sm/6 text-left">
          Ce PC est tellement bien c'est un truc de fou il fait tout tourner !
          Bon par contre il chauffe tellement qu'il a fait monter la température
          à Mérignac de 2°C !!!!
        </p>
      </div>
    </div>
  );
}

export default CardRating;
