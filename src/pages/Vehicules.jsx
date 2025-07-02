import React, { useState, useEffect } from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";

function Vehicules() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/lacaverne/articles?pageCount=100");

        if (response.ok) {
          const data = await response.json();
          const vehiculesProducts = data.filter(
            (product) =>
              product.category && product.category.toLowerCase() === "véhicules"
          );
          setProducts(vehiculesProducts);
        } else {
          setError("Erreur lors du chargement des produits");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return typeof price === "number"
      ? `${price.toFixed(2)}€`
      : price || "Prix non disponible";
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className={"mt-5"}>
          <Header />
        </div>
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-xl">Chargement des produits...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className={"mt-5"}>
          <Header />
        </div>
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className={"mt-5"}>
        <Header />
      </div>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Véhicules</h1>
          <p className="text-lg text-gray-600">
            Trouvez votre prochain véhicule
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">
                Aucun véhicule disponible pour le moment.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <CardProductFull
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={formatPrice(product.price)}
                image={
                  product.imageCount > 0
                    ? `/api/lacaverne/articles/${product.id}/images/0`
                    : "https://picsum.photos/400/300"
                }
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Vehicules;
