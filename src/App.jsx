import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription.jsx";
import Connexion from "./pages/Connexion";
import Sell from "./pages/Sell";
import Immobilier from "./pages/Immobilier";
import Electromenager from "./pages/Electromenager";
import Vehicules from "./pages/Vehicules";
import Informatique from "./pages/Informatique";
import Bricolage from "./pages/Bricolage";
import Produit from "./pages/Produit";
import Profil from "./pages/Profil";
import Profile from "./pages/Profile.jsx";
import Panier from "./pages/Panier.jsx";
import Divers from "./pages/Divers.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/immobilier" element={<Immobilier />} />
        <Route path="/electromenager" element={<Electromenager />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/informatique" element={<Informatique />} />
        <Route path="/bricolage" element={<Bricolage />} />
        <Route path="/produit/:id" element={<Produit />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/divers" element={<Divers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
