import React from "react";
import background from "../assets/bgConnexionInscription.png";
import logoe from "../assets/logoe.png";
import {Link, Links} from "react-router-dom";

function Inscription() {
    return (
        <div style={{ backgroundImage: `url(${background})`, height: "100vh", backgroundSize: "cover" }}>
            <div className='flex items-center justify-center h-full'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='space-y-14 w-[700px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center'>
                        <div className="relative w-full mt-10 h-14">
                            <button className="absolute left-7 top-1/2 -translate-y-1/2 cursor-pointer text-back hover:text-gray-500 transition duration-200">
                                <Link to={"/connexion"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                                    </svg>
                                </Link>
                            </button>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <img className="h-14" src={logoe} alt="logo" />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1 '>
                            <div className='flex flex-col space-y-1 w-[375px]'>
                                <input type="email" placeholder="Entrer votre adresse email" className='border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2'/>
                                <input type="password" placeholder="Entrer votre mot de passe" className='border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2'/>
                                <input type="password" placeholder="Confirmer votre mot de passe" className='border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2'/>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1 w-[375px]'>
                            <button className='bg-[#346644] text-white rounded-md cursor-pointer px-4 py-2 hover:bg-[#215130] transition duration-200'>
                                Inscription
                            </button>
                            <div className='flex items-center justify-center pt-2'>
                                <p className='text-gray-500 rounded-md'>
                                    Vous avez déjà un compte ?
                                </p>
                                <button className='text-[#346644] px-2 underline cursor-pointer'>
                                    <Link to="/connexion">Connectez-vous</Link>
                                </button>
                            </div>
                        </div>
                        <div className='bg-gray-400 w-[475px] h-[1px]'>
                        </div>
                        <div className='flex flex-col space-y-1 w-[375px] mb-20'>
                            <button className='text-black rounded-md border-2 cursor-pointer px-4 py-2'>
                                Connexion avec Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inscription;
