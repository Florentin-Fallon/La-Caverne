import React from "react";
import Header from "../components/layout-components/Header";
import Cards from "../components/UI/Cards";
import CardProduct from "../components/UI/CardProduct";
import Bannere from "../components/layout-components/Bannere";
import Footer from "../components/layout-components/Footer";
import { getAllProducts } from "../data/products";

function Home() {
  const allProducts = getAllProducts();

  const selectedProducts = allProducts.slice(0, 5);

  return (
    <div className="bg-[#0F2E19] min-h-screen pt-5">
      <Header />
      <Cards />
      <div className="flex flex-col mt-30">
        <Bannere />
        <div className="flex flex-row flex-wrap gap-10 ml-13">
          {selectedProducts.map((product) => (
            <CardProduct
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
