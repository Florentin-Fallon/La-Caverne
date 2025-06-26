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
          <button className="bg-[#346644] text-white px-4 py-2 rounded-md">
            <Link to="/connexion">Connexion</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
