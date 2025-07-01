import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardRating from "../components/UI/CardRating";
import Notification from "../components/UI/Notification";

function Produit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [notations, setNotations] = useState([]);
  const [overallNotation, setOverallNotation] = useState(0);
  const [userNotation, setUserNotation] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [submittingNotation, setSubmittingNotation] = useState(false);
  const [showNotationModal, setShowNotationModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleLikeToggle = async () => {
    if (!isLoggedIn()) {
      console.warn("Utilisateur non connecté, impossible de liker");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`https://services.cacahuete.dev/api/lacaverne/articles/${id}/like`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLiked(prev => !prev);
      } else if (response.status === 401) {
        console.warn("Token invalide ou expiré");
      } else {
        console.warn("Impossible de liker l'article:", response.status);
      }
    } catch (err) {
      console.error("Erreur lors du like:", err);
    }
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

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/lacaverne/articles/${id}`);

        if (response.ok) {
          const data = await response.json();
          setProduit(data);
          if (data.imageCount > 0) {
            setSelectedImage(`/api/lacaverne/articles/${id}/images/0`);
          } else {
            setSelectedImage(null);
          }
        } else {
          setError("Produit non trouvé");
          showNotification("Produit non trouvé", "error");
        }
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
        setError("Erreur de connexion au serveur");
        showNotification("Erreur de connexion au serveur", "error");
      } finally {
        setLoading(false);
      }
    };

    const fetchNotations = async () => {
      try {
        const overallResponse = await fetch(
          `/api/lacaverne/notations/articles/${id}/overall`
        );
        if (overallResponse.ok) {
          const overallData = await overallResponse.json();
          setOverallNotation(overallData.notation || 0);
        } else {
          console.warn(
            "Impossible de récupérer la note globale:",
            overallResponse.status
          );
        }

        const notationsResponse = await fetch(
          `/api/lacaverne/notations/articles/${id}`
        );
        if (notationsResponse.ok) {
          const notationsData = await notationsResponse.json();
          setNotations(notationsData);
        } else {
          console.warn(
            "Impossible de récupérer les notations:",
            notationsResponse.status
          );
        }
      } catch (err) {
        console.error("Erreur lors du chargement des notations:", err);
      }
    };

    if (id) {
      fetchProduct();
      fetchNotations();
    }
  }, [id]);

  const submitNotation = async () => {
    if (!isLoggedIn()) {
      showNotification(
        "Vous devez être connecté pour noter un produit",
        "error"
      );
      return;
    }

    if (userNotation === 0) {
      showNotification("Veuillez sélectionner une note", "error");
      return;
    }

    setSubmittingNotation(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Token présent:", !!token);
      console.log("Token:", token ? token.substring(0, 20) + "..." : "Aucun");

      if (!token) {
        showNotification("Token d'authentification manquant", "error");
        setSubmittingNotation(false);
        return;
      }

      const response = await fetch(`/api/lacaverne/notations/articles/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notation: userNotation,
          text: userComment.trim() || null,
        }),
      });

      console.log("Réponse API:", response.status, response.statusText);

      if (response.ok) {
        showNotification("Votre avis a été ajouté avec succès !", "success");
        setUserNotation(0);
        setUserComment("");
        setShowNotationModal(false);

        const notationsResponse = await fetch(
          `/api/lacaverne/notations/articles/${id}`
        );
        if (notationsResponse.ok) {
          const notationsData = await notationsResponse.json();
          setNotations(notationsData);
        }

        const overallResponse = await fetch(
          `/api/lacaverne/notations/articles/${id}/overall`
        );
        if (overallResponse.ok) {
          const overallData = await overallResponse.json();
          setOverallNotation(overallData.notation || 0);
        }
      } else if (response.status === 401) {
        console.log("Erreur 401 - Token invalide ou expiré");
        localStorage.removeItem("token");
        showNotification(
          "Session expirée. Veuillez vous reconnecter.",
          "error"
        );
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else if (response.status === 400) {
        const errorText = await response.text();
        if (errorText.includes("already noted")) {
          showNotification("Vous avez déjà noté cet article", "error");
        } else {
          showNotification("Erreur lors de l'ajout de votre avis", "error");
        }
      } else {
        const errorText = await response.text();
        console.error("Erreur API:", response.status, errorText);
        showNotification("Erreur lors de l'ajout de votre avis", "error");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de la notation:", err);
      showNotification("Erreur de connexion au serveur", "error");
    } finally {
      setSubmittingNotation(false);
    }
  };

  const addToCart = () => {
    if (!produit) return;

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === produit.id
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      const cartItem = {
        id: produit.id,
        title: produit.title,
        price: produit.price,
        category: produit.seller?.name || "Vendeur",
        image: selectedImage,
        quantity: 1,
      };
      currentCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    setShowAddedMessage(true);
    showNotification("Produit ajouté au panier !", "success");
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

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

  const renderInteractiveStars = (note, onStarClick) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => onStarClick(i)}
          className={`text-2xl transition-colors ${
            note >= i ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-300`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  const formatPrice = (price) => {
    return typeof price === "number"
      ? `${price.toFixed(2)}€`
      : price || "Prix non disponible";
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0F2E19] pt-5">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-xl">Chargement du produit...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !produit) {
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
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={3000}
      />

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
                {produit.imageCount > 0 &&
                  Array.from({ length: produit.imageCount }, (_, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setSelectedImage(
                          `/api/lacaverne/articles/${id}/images/${idx}`
                        )
                      }
                      className={`rounded-lg overflow-hidden border-2 transition-all bg-white ${
                        selectedImage ===
                        `/api/lacaverne/articles/${id}/images/${idx}`
                          ? "border-[#346644]"
                          : "border-transparent"
                      } w-16 h-16 flex items-center justify-center`}
                    >
                      <img
                        src={`/api/lacaverne/articles/${id}/images/${idx}`}
                        alt={`Miniature ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
              </div>
              <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center ml-4 w-full max-w-[450px] h-[450px] min-h-[300px]">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={produit.title}
                    className="object-contain w-full h-full max-w-full max-h-full"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    <p>Aucune image disponible</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {produit.title}
              </h1>
              <p className="text-2xl text-white mb-6">
                {formatPrice(produit.price)}
              </p>

              {produit.parrot && (
                <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                  🦜 Sélection Perroquet
                </div>
              )}

              <div
                className="flex items-center mb-3"
                aria-label={`Note : ${overallNotation} sur 5`}
              >
                <div className="flex items-center">
                  {renderStars(overallNotation)}
                </div>
                <span className="text-white opacity-50 ml-3 text-lg font-extralight">
                  {overallNotation.toFixed(1)} / 5 étoile(s) ({notations.length}{" "}
                  avis)
                </span>
              </div>

              <p className="text-white text-lg mb-3">
                Vendu par {produit.seller?.name || "Vendeur"}
              </p>

              {produit.tags && produit.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {produit.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[#66C183] border border-[#66C183] px-2 py-1 rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="relative">
                <div className='grid grid-cols-2 gap-4 w-[60%]'>
                  <button
                    onClick={addToCart}
                    className="bg-white text-[#0F2E19] py-2 my-3 mb-5 px-9 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                  >
                    Ajouter au panier
                  </button>
                  <button
                      onClick={handleLikeToggle}
                      className="bg-white text-[#0F2E19] w-[40px] my-3 mb-5 p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center"
                  >
                    {liked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="#E0245E"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5
                            2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
                            22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="#0F2E19"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28
                            2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81
                            4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3
                            22 5.42 22 8.5c0 3.78-3.4 6.86-8.55
                            11.54L12 21.35z"
                          />
                        </svg>
                    )}
                  </button>
                  {showAddedMessage && (
                      <div className="absolute top-0 left-0 right-0 bg-[#66C183] text-white py-2 px-4 rounded-lg text-center transform -translate-y-full transition-transform duration-300">
                        ✓ Produit ajouté au panier !
                      </div>
                    )}
                </div>
              </div>

              <div>
                <p className="text-white font-stretch-extra-condensed text-sm/6 text-left">
                  {produit.description}
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
            {isLoggedIn() ? (
              <button
                onClick={() => setShowNotationModal(true)}
                className="bg-white text-[#0F2E19] py-1 my-3 mb-5 px-12 rounded-lg cursor-pointer font-extralight transition-colors hover:bg-gray-100"
              >
                Ajouter un avis
              </button>
            ) : (
              <button
                onClick={() => navigate("/connexion")}
                className="bg-white text-[#0F2E19] py-1 my-3 mb-5 px-12 rounded-lg cursor-pointer font-extralight transition-colors hover:bg-gray-100"
              >
                Se connecter pour noter
              </button>
            )}
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            {notations.length === 0 ? (
              <div className="text-white text-center w-full py-8">
                Aucun avis pour le moment. Soyez le premier à donner votre avis
                !
              </div>
            ) : (
              notations.map((notation, index) => {
                return (
                  <CardRating
                    key={index}
                    name={notation.username || "Utilisateur"}
                    description={notation.description || "Aucun commentaire"}
                    logo={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      notation.username || index
                    }`}
                    rating={notation.stars || 0}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />

      {showNotationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0F2E19]">
                Ajouter votre avis
              </h2>
              <button
                onClick={() => setShowNotationModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-[#0F2E19] font-semibold mb-3">
                Votre note :
              </label>
              <div className="flex gap-2 justify-center">
                {renderInteractiveStars(userNotation, setUserNotation)}
              </div>
              <p className="text-center text-gray-600 mt-2">
                {userNotation > 0
                  ? `${userNotation} étoile${userNotation > 1 ? "s" : ""}`
                  : "Sélectionnez une note"}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-[#0F2E19] font-semibold mb-3">
                Votre commentaire (optionnel) :
              </label>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Partagez votre expérience avec ce produit..."
                className="w-full p-4 rounded-lg border border-gray-300 text-[#0F2E19] resize-none focus:outline-none focus:ring-2 focus:ring-[#346644]"
                rows="4"
                maxLength="500"
              />
              <div className="text-gray-500 text-sm mt-2 text-right">
                {userComment.length}/500 caractères
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowNotationModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg cursor-pointer transition-colors hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={submitNotation}
                disabled={submittingNotation || userNotation === 0}
                className="flex-1 bg-[#346644] text-white py-3 px-6 rounded-lg cursor-pointer transition-colors hover:bg-[#0F2E19] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingNotation ? "Envoi en cours..." : "Envoyer mon avis"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Produit;
