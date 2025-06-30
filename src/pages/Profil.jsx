import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Image, Tag, message } from "antd";

function Profil() {
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
    <div className="profile-container">
      <h2>Mon Profil</h2>
      
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
    </div>
  );
}

export default Profil//Changer de couleur;