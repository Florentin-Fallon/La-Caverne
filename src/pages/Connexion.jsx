import React, { useState } from "react";
import background from "../assets/bgConnexionInscription.png";
import logoe from "../assets/logoe.png";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/UI/Notification";

function Connexion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const API_BASE_URL = "/api/lacaverne";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Tous les champs sont obligatoires");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        showNotification("Connexion réussie ! Redirection...", "success");
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.account));
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        let errorMessage = "Erreur lors de la connexion";
        try {
          const errorData = await response.text();
          try {
            const parsedError = JSON.parse(errorData);
            errorMessage =
              parsedError.message || parsedError.title || errorMessage;
          } catch {
            errorMessage = errorData || errorMessage;
          }
        } catch {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
        setError(
          "Erreur de connexion au serveur. Vérifiez votre connexion internet."
        );
      } else {
        setError("Erreur lors de la connexion");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={3000}
      />
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="space-y-14 w-[700px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div className="flex space-y-4 mt-10">
              <img className="h-14" src={logoe} alt="logo" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
              <div className="flex flex-col space-y-1 w-[375px]">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Entrer votre adresse email"
                  className="border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2"
                  disabled={loading}
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Entrer votre mot de passe"
                  className="border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2"
                  disabled={loading}
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm underline cursor-pointer text-gray-500"
                  onClick={() => alert("Mot de passe oublié")}
                  disabled={loading}
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                  {error}
                </div>
              )}
            </form>

            <div className="flex flex-col space-y-1 w-[375px]">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#346644] text-white rounded-md cursor-pointer px-4 py-2 hover:bg-[#215130] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion en cours..." : "Connexion"}
              </button>
              <div className="flex items-center justify-center pt-2">
                <p className="text-gray-500 rounded-md">
                  Vous n'avez pas de compte ?
                </p>
                <button className="text-[#346644] px-2 underline cursor-pointer">
                  <Link to="/inscription">Inscrivez-vous</Link>
                </button>
              </div>
            </div>
            <div className="bg-gray-400 w-[475px] h-[1px]"></div>
            <div className="flex flex-col space-y-1 w-[375px] mb-20">
              <button className="text-black rounded-md border-2 cursor-pointer px-4 py-2">
                Connexion avec Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
