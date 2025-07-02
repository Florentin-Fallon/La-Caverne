import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import Header from "../components/layout-components/Header.jsx";
import CardProductFull from "../components/UI/CardProductFull.jsx";
import axios from "axios";

function ProfilVendeur() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    const fetchArticlesVendeur = async () => {
      if (!isLoggedIn()) {
        message.warning("Vous devez être connecté pour accéder à votre profil.");
        navigate("/connexion");
        return;
      }

      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("/api/lacaverne/sellers/me/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setArticles(res.data);
      } catch (err) {
        console.error(err);
        message.error("Erreur lors du chargement de vos articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesVendeur();
  }, [navigate]);

  return (
      <div className="bg-[#0F2E19] min-h-screen">
        <div className="pt-5">
          <Header />
        </div>
        <div className="container mx-auto px-5 py-8">
          <div className=" mx-auto">
            <div className="text-center mb-8">
              <div className='grid grid-cols-2'>
                <div className='flex flex-col items-start justify-between'>
                  <h1 className="text-4xl font-bold text-white mb-2">Profil vendeur</h1>
                  <p className="text-gray-300">Retrouvez tous vos biens en vente et gérez vos annonces</p>
                </div>
                <div className='flex items-center justify-end'>
                  <button className="bg-white text-[#346644] font-semibold px-4 py-2 rounded-md transition-colors duration-200">
                    <Link to="/vendre" className="flex items-center gap-2">
                      Vendre un article
                    </Link>
                  </button>
                </div>
              </div>


            </div>
            {loading ? (
                <div className="text-white text-center">Chargement des articles...</div>
            ) : articles.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Aucun article publié pour le moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-6 mt-10">
                  {articles.map((article) => (
                      <CardProductFull
                          key={article.id}
                          id={article.id}
                          title={article.title}
                          description={article.description}
                          price={`${article.price} €`}
                          image={
                            article.imageCount > 0
                                ? `/api/lacaverne/articles/${article.id}/images/0`
                                : "https://picsum.photos/400/300"
                          }
                      />
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default ProfilVendeur;