import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import { getProductById } from "../data/products";
import CardRating from "../components/UI/CardRating";

function Produit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const produit = getProductById(id);

  const [selectedImage, setSelectedImage] = useState(
    produit?.images ? produit.images[0] : produit?.image
  );

  // Tableau des avis clients avec leurs notes
  const avisClients = [
    {
      name: "Jean",
      description:
        "Ce PC est tellement bien c'est un truc de fou il fait tout tourner ! Bon par contre il chauffe tellement qu'il a fait monter la température à Mérignac de 2°C !!!",
      logo: "https://picsum.photos/200",
      rating: 4,
    },
    {
      name: "Florentin",
      description: "TROP BIEN !!!",
      logo: "https://picsum.photos/200",
      rating: 4,
    },
    {
      name: "Grégorie",
      description: "Trop mauvais",
      logo: "https://picsum.photos/200",
      rating: 2,
    },
  ];

  // Calcul de la note moyenne
  const noteMoyenne =
    avisClients.length > 0
      ? Math.round(
          (avisClients.reduce((sum, avis) => sum + avis.rating, 0) /
            avisClients.length) *
            10
        ) / 10
      : 0;

  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (note >= i) {
        stars.push(
          <span key={i + "-full"} className="text-white text-2xl align-middle">
            ★
          </span>
        );
      } else if (note >= i - 0.5) {
        stars.push(
          <span
            key={i + "-half"}
            className="relative inline-block w-7 h-7 align-middle"
          >
            <span className="absolute left-0 top-0 w-full h-full">
              <span className="text-gray-400 text-2xl">★</span>
            </span>
            <span className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
              <span className="text-white text-2xl">★</span>
            </span>
          </span>
        );
      } else {
        stars.push(
          <span
            key={i + "-empty"}
            className="text-gray-400 text-2xl align-middle"
          >
            ★
          </span>
        );
      }
    }
    return stars;
  };

  if (!produit) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0F2E19] pt-5">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#346644] hover:text-[#0F2E19] transition-colors cursor-pointer"
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
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Produit non trouvé
            </h1>
            <p className="text-gray-600">
              Le produit que vous recherchez n'existe pas.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0F2E19] pt-5">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white transition-colors cursor-pointer"
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

        <div className="bg-[#0F2E19] p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-row lg:flex-row gap-4">
              <div className="flex flex-col gap-4 justify-center">
                {produit.images &&
                  produit.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`rounded-lg overflow-hidden border-2 transition-all bg-white ${
                        selectedImage === img
                          ? "border-[#346644]"
                          : "border-transparent"
                      } w-16 h-16 flex items-center justify-center`}
                    >
                      <img
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className="object-cover w-14 h-14"
                      />
                    </button>
                  ))}
              </div>
              <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center ml-4 w-[450px] h-[450px]">
                <img
                  src={selectedImage}
                  alt={produit.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {produit.title}
              </h1>
              <p className="text-2xl text-white mb-6">{produit.price}</p>

              <div
                className="flex items-center mb-3"
                aria-label={`Note : ${noteMoyenne} sur 5`}
              >
                <div className="flex items-center">
                  {renderStars(noteMoyenne)}
                </div>
                <span className="text-white opacity-50 ml-3 text-lg font-extralight">
                  {noteMoyenne} / 5 étoile(s)
                </span>
              </div>
              <p className="text-white text-lg">Vendu par {produit.seller}</p>

              <button className=" bg-white text-[#0F2E19] py-2 my-3 mb-5 px-9 rounded-lg cursor-pointer transition-colors">
                Ajouter au panier
              </button>
              <div>
                <p className="text-white font-stretch-extra-condensed text-sm/6 text-left">
                  {produit.details}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Avis & Notations
          </h1>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Votre commentaire..."
              className="bg-white text-[#0F2E19] text-sm py-2 my-3 mb-5 px-2 w-80 rounded-lg cursor-pointer transition-colors"
            />
            <button className="bg-white text-[#0F2E19] py-1 my-3 mb-5 px-12 rounded-lg cursor-pointer font-extralight transition-colors">
              Envoyer
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            {avisClients.map((avis, index) => (
              <CardRating
                key={index}
                name={avis.name}
                description={avis.description}
                logo={avis.logo}
                rating={avis.rating}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Produit;
