import React from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";

function Vehicules() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Véhicules</h1>
          <p className="text-lg text-gray-600">
            Trouvez votre prochain véhicule
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardProductFull
            id="peugeot-208"
            title="Peugeot 208"
            description="2021, 45 000 km, Essence"
            price="15 500 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="renault-clio"
            title="Renault Clio"
            description="2020, 32 000 km, Diesel"
            price="13 800 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="citroen-c3"
            title="Citroën C3"
            description="2022, 18 000 km, Essence"
            price="18 200 €"
            image="https://picsum.photos/200"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Vehicules;
