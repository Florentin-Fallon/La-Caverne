import React from "react";
import background from "../assets/bgConnexionInscription.png";
import logoe from "../assets/logoe.png";

function Connexion() {
  return (
    <div style={{ backgroundImage: `url(${background})`, height: "100vh", backgroundSize: "cover" }}>
        <div className='flex items-center justify-center h-full'>
            <div className='flex flex-col items-center justify-center'>
                <div className='space-y-14 w-[700px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center'>
                    <div className='flex space-y-4 mt-10'>
                        <img className='h-14' src={logoe} alt="logo"/>
                    </div>
                    <div className='flex flex-col space-y-1 '>
                        <div className='flex flex-col space-y-1 w-[375px]'>
                            <input type="email" placeholder="Entrer votre adresse email" className='border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2'/>
                            <input type="password" placeholder="Entrer votre mot de passe" className='border-[#0F2E19] border-2 rounded-md placeholder-gray-400 p-2'/>
                        </div>
                        <div className='text-right'>
                            <button className='text-sm underline cursor-pointer text-gray-500' onClick={() => alert("Mot de passe oublié")}>
                                Mot de passe oublié ?
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1 w-[375px]'>
                        <button className='bg-[#346644] text-white rounded-md cursor-pointer px-4 py-2 hover:bg-[#215130] transition duration-200'>
                            Connexion
                        </button>
                        <button className='bg-[#346644] text-white rounded-md cursor-pointer px-4 py-2 hover:bg-[#215130] transition duration-200'>
                            Inscription
                        </button>
                    </div>
                    <div className='bg-gray-400 w-[375px]'>
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

export default Connexion;
