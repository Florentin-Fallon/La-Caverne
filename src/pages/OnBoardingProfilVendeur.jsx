import React, { useState, useEffect } from "react";
import Header from "../components/layout-components/Header";
import Footer from "../components/layout-components/Footer";
import CardProductFull from "../components/UI/CardProductFull";
import Notification from "../components/UI/Notification.jsx";
import {useNavigate} from "react-router-dom";

function OnBoardingProfilVendeur() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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

    async function sendSellerProfile() {
        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(`https://services.cacahuete.dev/api/lacaverne/sellers/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
            })
        });

        if (response.ok) {
            showNotification('Bravo ! Vous êtes maintenant vendeur !', 'success');

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else if (response.status === 401) {
            showNotification("Erreur d'authentification", 'error');
        } else {
            showNotification("Erreur serveur : " + await response.text(), 'error');
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#0F2E19]">
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
                duration={3000}
            />
            <div className='pt-5'>
                <Header />
            </div>
            <div className="text-center mb-8 mt-20">
                <h1 className="text-4xl font-bold text-white mb-2">Devenez vendeur</h1>
                <p className="text-gray-300">
                    Créez votre profil vendeur pour pouvoir vendre des articles sur le site
                </p>
            </div>
            <div className='flex items-center justify-center mt-10'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-[1250px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center'>
                        <div className="flex flex-col space-y-1 w-1/3">
                            <label className="text-sm text-gray-400 mt-10">Nom d'affichage</label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setEnabled(e.target.value.trim() !== "" && description.trim() !== "");
                                }}
                                placeholder="Boutique à momo"
                                className="border-[#0F2E19] border-2 rounded-md pl-4 p-2"
                            />
                        </div>
                        <div className="flex flex-col space-y-1 w-1/3">
                            <label className="text-sm text-gray-400 mt-5">Description</label>
                            <textarea maxLength={500}
                                      placeholder={"Des vendeurs passionnés pour des clients passionnés"}
                                      onChange={(e) => {
                                          setDescription(e.target.value);
                                          setEnabled(e.target.value.trim() !== "" && name.trim() !== "");
                                      }}
                                      className="border-[#0F2E19] border-2 rounded-md pl-4 p-2"
                            />
                        </div>

                        <button disabled={loading || !enabled} className="disabled:opacity-50 disabled:cursor-not-allowed my-8 bg-[#346644] cursor-pointer text-white px-6 py-3 rounded-md w-1/3" onClick={sendSellerProfile}>
                            {loading ? "Chargement en cours..." : "Confirmer"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OnBoardingProfilVendeur;
