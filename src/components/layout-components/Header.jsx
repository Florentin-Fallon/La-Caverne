import React from "react";
import logo from "../../assets/logoe.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-white mx-5 pt-5 rounded-2xl p-5">
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
        </div>
        <div className="flex items-center justify-center gap-5">
          <button className="bg-[#346644] text-white px-4 py-2 rounded-md hover:bg-[#0F2E19] transition-colors duration-200">
            <Link to="/sell">Vendez vos articles</Link>
          </button>
          <button className="bg-[#346644] text-white px-4 py-2 rounded-md hover:bg-[#0F2E19] transition-colors duration-200">
            <Link to="/connexion">Connexion</Link>
          </button>
          <button className="bg-[#346644] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#0F2E19] transition-colors duration-200">
            <Link to="/connexion" className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
}

export default Header;
