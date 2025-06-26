import React from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";

function Immobilier() {
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
          <CardProductFull
            id="appartement-t3-paris"
            title="Appartement T3"
            description="Paris, 15ème arrondissement"
            price="450 000 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="maison-jardin-lyon"
            title="Maison avec jardin"
            description="Lyon, 69000"
            price="650 000 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="studio-meuble-marseille"
            title="Studio meublé"
            description="Marseille, 13001"
            price="180 000 €"
            image="https://picsum.photos/200"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Immobilier;
