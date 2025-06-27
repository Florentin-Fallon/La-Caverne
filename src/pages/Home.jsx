import React from "react";
import Header from "../components/layout-components/Header";
import Cards from "../components/UI/Cards";
import CardProduct from "../components/UI/CardProduct";
import Bannere from "../components/layout-components/Bannere";
import Footer from "../components/layout-components/Footer";

function Home() {
  return (
    <div className="bg-[#0F2E19] min-h-screen pt-5">
      <Header />
      <Cards />
      <div className="flex flex-col mt-30">
        <Bannere />
        <div className="flex flex-row flex-wrap gap-10 ml-13">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
