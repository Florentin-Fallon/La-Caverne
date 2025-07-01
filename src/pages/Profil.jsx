import React, {useEffect, useState} from "react";
import Header from "../components/layout-components/Header.jsx";
import Footer from "../components/layout-components/Footer.jsx";

function Profil() {
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        codePostal: '',
        ville: ''
    });

    useEffect(() => {
        const fakeApiData = {
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean.dupont@email.com',
            telephone: '0601020304',
            adresse: '123 Rue Exemple',
            codePostal: '75001',
            ville: 'Paris'
        };
        setUserData(fakeApiData);
    }, []);

    const fields = [
        { key: 'nom', label: 'Nom', type: 'text' },
        { key: 'prenom', label: 'Prénom', type: 'text' },
        { key: 'email', label: 'Adresse email', type: 'email' },
        { key: 'telephone', label: 'Numéro de téléphone', type: 'tel' },
        { key: 'adresse', label: 'Adresse', type: 'text' },
        { key: 'codePostal', label: 'Code Postal', type: 'text' },
        { key: 'ville', label: 'Ville', type: 'text' }
    ];
    return (
        <div className='bg-[#0F2E19] h-[100vh]'>
            <div className='pt-5'>
                <Header />
            </div>
            <div className='flex items-center justify-center mt-10'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-[1250px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center'>
                        <div>
                            <h1 className='text-4xl font-medium text-center mt-5'>Mon Profil</h1>
                        </div>
                        <div className='flex flex-col items-start justify-left w-full mt-10 px-10'>
                            <p className='text-2xl text-center mt-5'>Mes informations</p>
                            <div className='bg-[#0F2E19] ml-7 mt-1 w-[130px] h-[2px]'>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full mt-10 space-y-6">
                            <div className="grid grid-cols-2 grid-rows-3 gap-7 w-[950px] mt-6">
                                {fields.map((input, index) => (
                                    <div key={index} className="flex flex-col space-y-1">
                                        <label className="text-sm text-gray-400">{input.label}</label>
                                        <input
                                            type={input.type}
                                            value={userData[input.key]}
                                            onChange={(e) =>
                                                setUserData({ ...userData, [input.key]: e.target.value })
                                            }
                                            className="border-[#0F2E19] border-2 rounded-md pl-4 p-2"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="my-8 bg-[#0F2E19] cursor-pointer text-white px-6 py-3 rounded-md" onClick={() => alert("Informations modifiées !")}>
                                Modifier mes informations
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
