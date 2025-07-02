import React, { useEffect, useState } from "react";
import Header from "../components/layout-components/Header.jsx";
import Footer from "../components/layout-components/Footer.jsx";
import Notification from "../components/UI/Notification.jsx";
import { useNavigate } from "react-router-dom";

function Profil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    cityName: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      showNotification(
        "Vous devez être connecté pour accéder à cette page",
        "error"
      );
      setTimeout(() => {
        navigate("/connexion");
      }, 2000);
      return;
    }

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/lacaverne/accounts/account", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          username: data.username || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          postalCode: data.postalCode || "",
          cityName: data.cityName || "",
        });
      } else if (response.status === 401) {
        showNotification(
          "Session expirée. Veuillez vous reconnecter.",
          "error"
        );
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        showNotification("Erreur lors du chargement des données", "error");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      showNotification("Erreur de connexion au serveur", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/lacaverne/accounts/account", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          postalCode: parseInt(userData.postalCode) || 0,
          cityName: userData.cityName,
        }),
      });

      if (response.ok) {
        showNotification("Informations modifiées avec succès !", "success");
      } else if (response.status === 401) {
        showNotification(
          "Session expirée. Veuillez vous reconnecter.",
          "error"
        );
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        const errorData = await response.text();
        showNotification(
          "Erreur lors de la modification: " + errorData,
          "error"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      showNotification("Erreur de connexion au serveur", "error");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: "username", label: "Nom d'utilisateur", type: "text" },
    { key: "firstName", label: "Prénom", type: "text" },
    { key: "lastName", label: "Nom", type: "text" },
    { key: "email", label: "Adresse email", type: "email", disabled: true },
    { key: "phoneNumber", label: "Numéro de téléphone", type: "tel" },
    { key: "address", label: "Adresse", type: "text" },
    { key: "postalCode", label: "Code Postal", type: "text" },
    { key: "cityName", label: "Ville", type: "text" },
  ];

  if (loading) {
    return (
      <div className="bg-[#0F2E19] min-h-screen flex flex-col">
        <div className="pt-5">
          <Header />
        </div>
        <div className="flex items-center justify-center mt-10 flex-1">
          <div className="text-white text-xl">
            Chargement de votre profil...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#0F2E19] min-h-screen flex flex-col">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={3000}
      />
      <div className="pt-5">
        <Header />
      </div>
      <div className="flex items-center justify-center mt-10 flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[1250px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div>
              <h1 className="text-4xl font-medium text-center mt-5">
                Mon Profil
              </h1>
            </div>
            <div className="flex flex-col items-start justify-left w-full mt-10 px-10">
              <p className="text-2xl text-center mt-5">Mes informations</p>
              <div className="bg-[#0F2E19] ml-7 mt-1 w-[130px] h-[2px]"></div>
            </div>
            <div className="flex flex-col items-center w-full mt-10 space-y-6">
              <div className="grid grid-cols-2 grid-rows-4 gap-7 w-[950px] mt-6">
                {fields.map((input, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      value={userData[input.key]}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          [input.key]: e.target.value,
                        })
                      }
                      disabled={input.disabled}
                      className={`border-[#0F2E19] border-2 rounded-md pl-4 p-2 ${
                        input.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
              <button
                className={`my-8 px-6 py-3 rounded-md ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0F2E19] cursor-pointer hover:bg-[#1a4a2a]"
                } text-white`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Modification en cours..."
                  : "Modifier mes informations"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profil;
