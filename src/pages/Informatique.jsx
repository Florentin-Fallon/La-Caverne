import React from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";

function Informatique() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Informatique
          </h1>
          <p className="text-lg text-gray-600">
            Ordinateurs, smartphones et accessoires
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardProductFull
            id="macbook-pro-13"
            title="MacBook Pro 13"
            description="M2, 8GB RAM, 256GB SSD"
            price="1 299 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="iphone-15-pro"
            title="iPhone 15 Pro"
            description="128GB, Titane naturel"
            price="1 199 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="dell-xps-15"
            title="Dell XPS 15"
            description="Intel i7, 16GB RAM, 512GB SSD"
            price="1 599 €"
            image="https://picsum.photos/200"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Informatique;
