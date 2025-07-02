import React, { useState, useEffect } from "react";
import logo from "../../assets/logoe.png";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../UI/Notification";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

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
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/lacaverne/accounts/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        console.error("Erreur lors de la déconnexion:", err);
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);

    showNotification("Déconnexion réussie !", "success");

    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="bg-white mx-5 pt-5 rounded-2xl p-5 border-[#0F2E19] border-2">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={3000}
      />

      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="w-35 h-9" />
        </Link>
        <div className="flex items-center justify-center gap-5">
          <Link
            to="/immobilier"
            className="hover:text-[#346644] transition-colors duration-200"
          >
            <h1>Immobilier</h1>
          </Link>
          <Link
            to="/electromenager"
            className="hover:text-[#346644] transition-colors duration-200"
          >
            <h1>Électroménager</h1>
          </Link>
          <Link
            to="/vehicules"
            className="hover:text-[#346644] transition-colors duration-200"
          >
            <h1>Véhicules</h1>
          </Link>
          <Link
            to="/informatique"
            className="hover:text-[#346644] transition-colors duration-200"
          >
            <h1>Informatique</h1>
          </Link>
          <Link
            to="/bricolage"
            className="hover:text-[#346644] transition-colors duration-200"
          >
            <h1>Bricolage</h1>
          </Link>
          <Link
            to="/divers"
            className="hover:text-[#346644] transition-colors duration-200"
          >
            <h1>Divers</h1>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          {!isLoggedIn && (
            <button className="bg-[#346644] text-white px-4 py-2 rounded-md hover:bg-[#0F2E19] transition-colors duration-200">
              <Link to="/connexion">Connexion</Link>
            </button>
          )}

          <button className="bg-[#346644] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#0F2E19] transition-colors duration-200">
            <Link to="/panier" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Panier
            </Link>
          </button>

          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="bg-[#346644] text-white p-2 rounded-full hover:bg-[#0F2E19] transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium text-center">
                      {user?.username || "Utilisateur"}
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      {user?.email}
                    </div>
                  </div>
                  <Link
                    to="/profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Mon Profil
                  </Link>
                  <Link
                    to="/vendeur"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    Profil Vendeur
                  </Link>
                  <Link
                      to="/vendeur-ob"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                      onClick={() => setShowProfileMenu(false)}
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    Devenir Vendeur
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16,17 21,12 16,7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  );
}

export default Header;
