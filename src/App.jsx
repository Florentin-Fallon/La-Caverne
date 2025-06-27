import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Connexion from "./pages/Connexion";
import Immobilier from "./pages/Immobilier";
import Electromenager from "./pages/Electromenager";
import Vehicules from "./pages/Vehicules";
import Informatique from "./pages/Informatique";
import Bricolage from "./pages/Bricolage";
import Produit from "./pages/Produit";
import Sell from "./pages/Sell";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/immobilier" element={<Immobilier />} />
        <Route path="/electromenager" element={<Electromenager />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/informatique" element={<Informatique />} />
        <Route path="/bricolage" element={<Bricolage />} />
        <Route path="/produit/:id" element={<Produit />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
