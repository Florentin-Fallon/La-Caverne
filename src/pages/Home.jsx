import React from "react";
import Header from "../components/layout-components/Header";
import Cards from "../components/UI/Cards";
import CardProduct from "../components/UI/CardProduct";

function Home() {
  return (
    <div className="bg-[#0F2E19] min-h-screen pt-5">
      <Header />
      <Cards />
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 mt-10 max-w-8xl mx-auto">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </div>
  );
}

export default Home;
