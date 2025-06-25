import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Connexion from "./pages/Connexion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
