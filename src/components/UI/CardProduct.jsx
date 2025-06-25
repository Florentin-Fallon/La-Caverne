import React from "react";
import { Tag } from "antd";

function CardProduct() {
  return (
    <div className="flex flex-col items-start justify-center gap-2 mt-35 border-2 border-transparent hover:border-white cursor-pointer rounded-2xl p-5 my-5">
      <div>
        <img
          src="https://picsum.photos/200"
          alt="logo"
          className="w-50 h-50 rounded-sm"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <h1 className="text-white text-left">Tour gaming</h1>
        <p className="text-white text-left font-bold">300€</p>
        <div>
          <p className="text-[#66C183] border-1 border-[#66C183] mt-2 rounded-lg px-2 py-1 text-xs">
            Informatique
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
