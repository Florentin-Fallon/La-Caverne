import React from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";

function Bricolage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bricolage</h1>
          <p className="text-lg text-gray-600">
            Outils et matériaux pour tous vos projets
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardProductFull
            id="perceuse-bosch"
            title="Perceuse sans fil Bosch"
            description="18V, 2 batteries incluses"
            price="89 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="scie-circulaire-makita"
            title="Scie circulaire Makita"
            description="1200W, lame 190mm"
            price="149 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="tournevis-electrique"
            title="Tournevis électrique"
            description="4.8V, 30 embouts inclus"
            price="45 €"
            image="https://picsum.photos/200"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Bricolage;
