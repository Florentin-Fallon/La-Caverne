import React, { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import { Card, Image, Tag, message } from "antd";
import Header from "../components/layout-components/Header.jsx";

function ProfilVendeur() {
  const location = useLocation();
  const [newArticle, setNewArticle] = useState(null);
  const [articles, setArticles] = useState([]); // Liste existante des articles

  useEffect(() => {
    // Récupérer l'article transmis lors de la navigation
    if (location.state?.newArticle) {
      setNewArticle(location.state.newArticle);
      
      // Ajouter le nouvel article à la liste existante
      setArticles(prev => [location.state.newArticle, ...prev]);
      
      // Message de confirmation
      message.success("Votre nouvel article a été ajouté !");
      
      // Nettoyer l'état de navigation pour éviter de réafficher le message
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
      <div className="bg-[#0F2E19] min-h-screen">
        <div className='pt-5'>
          <Header />
        </div>
        <div className="container mx-auto px-5 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Profil venteur</h1>
              <p className="text-gray-300">
                Retrouvez tous vos biens en vente et gérez vos annonces
              </p>
              <div className='flex items-center justify-center mt-10'>
                <div className='flex flex-col items-center justify-center'>
                  <div className='bg-white rounded-lg shadow-lg flex flex-col items-center justify-center'>
                    {/* Section spéciale pour le nouvel article si disponible */}
                    {newArticle && (
                      <div className="new-article-section">
                        <h3>Votre nouvel article :</h3>
                        <Card
                          title={newArticle.title}
                          style={{ width: '100%', marginBottom: 20 }}
                          cover={
                            newArticle.images?.length > 0 && (
                              <Image.PreviewGroup>
                                <Image src={newArticle.images[0].url} />
                              </Image.PreviewGroup>
                            )
                          }
                        >
                          <p>{newArticle.description}</p>
                          <Tag color="green">{newArticle.price} €</Tag>
                          <Tag>{newArticle.category}</Tag>
                          <p>Localisation : {newArticle.city} ({newArticle.postalCode})</p>
                        </Card>
                      </div>
                    )}

                    {/* Liste de tous les articles */}
                    <div className="all-articles">
                      <h3>Mes articles en vente</h3>
                      {articles.map((article, index) => (
                        <Card
                          key={index}
                          title={article.title}
                          style={{ width: '100%', marginBottom: 20 }}
                          cover={
                            article.images?.length > 0 && (
                              <Image.PreviewGroup>
                                <Image src={article.images[0].url} />
                              </Image.PreviewGroup>
                            )
                          }
                        >
                          {/* ... même structure que pour newArticle ... */}
                        </Card>
                      ))}
                    </div>

                    <button className="bg-[#346644] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#0F2E19] transition-colors duration-200">
                      <Link to="/vendre" className="flex items-center gap-2">
                        Ventre un article
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default ProfilVendeur//Changer de couleur;