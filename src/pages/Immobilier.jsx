import React from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";
import { getProductsByCategory } from "../data/products";

function Immobilier() {
  // Récupérer tous les produits de la catégorie Immobilier
  const immobilierProducts = getProductsByCategory("Immobilier");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Immobilier</h1>
          <p className="text-lg text-gray-600">
            Découvrez notre sélection de biens immobiliers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {immobilierProducts.map((product) => (
            <CardProductFull
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Immobilier;
