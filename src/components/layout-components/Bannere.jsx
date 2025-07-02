import React from "react";
import perroquetImg from "../../assets/bonny_the_parrot.png";

function Bannere() {
  return (
    <div
      className="relative flex items-end bg-gradient-to-r from-green-300 to-[#0F2E19] w-4/8 ml-17 overflow-visible"
      style={{ minHeight: "30px" }}
    >
      <img
        src={perroquetImg}
        alt="perroquet"
        className="absolute -left-9 w-20 h-20 object-cover bottom-0"
        style={{ bottom: 0 }}
      />
      <div className="pl-20 pb-1 flex items-end">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
          Sélection du Perroquet
        </h2>
      </div>
    </div>
  );
}

export default Bannere;
