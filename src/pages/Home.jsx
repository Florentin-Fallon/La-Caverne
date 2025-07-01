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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const selectedProducts = products.slice(0, 10);

  useEffect(() => {
    if (selectedProducts.length > 4) {
      const interval = setInterval(() => {
        if (!isScrolling) {
          setScrollPosition((prev) => {
            const maxScroll = (selectedProducts.length - 4) * 280;
            return prev >= maxScroll ? 0 : prev + 280;
          });
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [selectedProducts.length, isScrolling]);

  const handleScroll = (direction) => {
    setIsScrolling(true);
    setScrollPosition((prev) => {
      const maxScroll = (selectedProducts.length - 4) * 280;
      if (direction === "left") {
        return Math.max(0, prev - 280);
      } else {
        return Math.min(maxScroll, prev + 280);
      }
    });
    setTimeout(() => setIsScrolling(false), 1000);
  };

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
        <div className="relative">
          <Bannere />
          {!loading && !error && selectedProducts.length > 0 && (
            <div className="absolute bottom-1 right-8 z-10 flex items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handleScroll("left")}
                  className="bg-[#346644] text-white p-2 rounded-full hover:bg-[#0F2E19] transition-colors shadow-lg"
                  disabled={scrollPosition === 0}
                >
                  <svg
                    className="w-5 h-5"
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
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  className="bg-[#346644] text-white p-2 rounded-full hover:bg-[#0F2E19] transition-colors shadow-lg"
                  disabled={
                    scrollPosition >= (selectedProducts.length - 4) * 280
                  }
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

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
          <div className="relative px-8">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${scrollPosition}px)` }}
              >
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex-shrink-0">
                    <CardProduct
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      category={product.category || "Divers"}
                      image={
                        product.imageCount > 0
                          ? `/api/lacaverne/articles/${product.id}/images/0`
                          : null
                      }
                      tags={product.tags}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
