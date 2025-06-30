import React, { useState, useEffect } from "react";
import Header from "../components/layout-components/Header";
import Cards from "../components/UI/Cards";
import CardProduct from "../components/UI/CardProduct";
import Bannere from "../components/layout-components/Bannere";
import Footer from "../components/layout-components/Footer";
import Notification from "../components/UI/Notification";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({
      isVisible: true,
      message,
      type,
    });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/lacaverne/articles");

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError("Erreur lors du chargement des produits");
          showNotification("Erreur lors du chargement des produits", "error");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
        setError("Erreur de connexion au serveur");
        showNotification("Erreur de connexion au serveur", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const selectedProducts = products.slice(0, 5);

  return (
    <div className="bg-[#0F2E19] min-h-screen pt-5">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={3000}
      />

      <Header />
      <Cards />
      <div className="flex flex-col mt-30">
        <Bannere />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-xl">Chargement des produits...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-red-400 text-xl">{error}</div>
          </div>
        ) : selectedProducts.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-xl">Aucun produit disponible</div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-10 ml-13">
            {selectedProducts.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                category={product.category || "Divers"}
                image={
                  product.imageCount > 0
                    ? `/api/lacaverne/articles/${product.id}/images/1`
                    : null
                }
                tags={product.tags}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
