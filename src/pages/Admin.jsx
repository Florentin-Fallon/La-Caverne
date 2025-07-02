import Header from "../components/layout-components/Header.jsx";
import Footer from "../components/layout-components/Footer.jsx";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {AdminArticlesPage} from "./admin/AdminArticlesPage.jsx";
import {AdminSellersPage} from "./admin/AdminSellersPage.jsx";

const pages = [
    {name: "Articles", comp: <AdminArticlesPage />},
    {name: "Sellers", comp: <AdminSellersPage />},
]

export function Admin() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [comp, setComp] = useState(<AdminArticlesPage />);

    if (!user || !user.admin) {
        return (
            <div className="bg-[#0F2E19] min-h-screen pt-5">
                <Header/>
                <h1 className="text-center text-2xl text-white mt-5">Panneau administrateur</h1>
                <p className="text-center text-md text-white mt-5 opacity-70">Vous n'êtes pas administrateur</p>
                <Link to="/">
                    <p className="text-center text-md text-white mt-5 opacity-70">Retour</p>
                </Link>
                <Footer/>
            </div>
        )
    }

    return (
        <div className="bg-[#0F2E19] min-h-screen pt-5 flex flex-col">
            <Header/>
            <h1 className="text-center text-2xl text-white mt-5">Panneau administrateur</h1>
            <div className="flex flex-row items-center justify-center">
                {
                    pages.map(page => (
                        <button key={page.name} className={"bg-white rounded-md px-5 border-1 p-2 cursor-pointer"} onClick={() => { setComp(page.comp) }}>{page.name}</button>
                    ))
                }
            </div>
            <div className="border-1 border-white mt-2 mx-5 h-10 flex-auto overflow-y-scroll overflow-hidden">
                {comp}
            </div>
            <Footer/>
        </div>
    )
}