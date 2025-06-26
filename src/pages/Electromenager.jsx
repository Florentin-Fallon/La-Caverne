import React from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";

function Electromenager() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Électroménager
          </h1>
          <p className="text-lg text-gray-600">
            Tous vos appareils électroménagers au meilleur prix
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardProductFull
            id="refrigerateur-samsung"
            title="Réfrigérateur Samsung"
            description="No Frost, 350L"
            price="599 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="machine-laver-bosch"
            title="Machine à laver Bosch"
            description="9kg, Classe A+++"
            price="449 €"
            image="https://picsum.photos/200"
          />
          <CardProductFull
            id="four-electrique-whirlpool"
            title="Four électrique Whirlpool"
            description="Multifonction, 60L"
            price="299 €"
            image="https://picsum.photos/200"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Electromenager;
