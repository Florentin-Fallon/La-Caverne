import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";

function Produit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulation de données produit (dans un vrai projet, cela viendrait d'une API)
  const produit = {
    id: id,
    title: id.charAt(0).toUpperCase() + id.slice(1),
    description: id,
    price: "299 €",
    image: "https://picsum.photos/400",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    specifications: ["Spécification 1", "Spécification 2", "Spécification 3"],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#346644] hover:text-[#0F2E19] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image du produit */}
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={produit.image}
                alt={produit.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Informations du produit */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {produit.title}
              </h1>
              <p className="text-gray-600 mb-4">{produit.description}</p>
              <p className="text-3xl font-bold text-[#346644] mb-6">
                {produit.price}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700">{produit.details}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Spécifications</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {produit.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-[#346644] text-white py-3 px-6 rounded-lg hover:bg-[#0F2E19] transition-colors font-semibold">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Produit;
