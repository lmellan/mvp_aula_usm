// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Importa tus páginas (cada HTML que convertirás a componente)
import HomePrincipal from "./pages/HomePrincipal";
import Tareas from "./pages/Tareas";
import Evaluaciones from "./pages/Evaluaciones";
import Foro from "./pages/Foro";
import Modulos from "./pages/Modulos";
import DetalleAviso from "./pages/DetalleAviso";
import HomeCurso from "./pages/HomeCurso";
import Anuncios from "./pages/Anuncios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/evaluaciones" element={<Evaluaciones />} />
        <Route path="/foro" element={<Foro />} />
        <Route path="/modulos" element={<Modulos />} />
        <Route path="/detalle-aviso" element={<DetalleAviso />} />
        <Route path="/curso" element={<HomeCurso />} />
        <Route path="/anuncios" element={<Anuncios />} />
      </Routes>
    </Router>
  );
}

export default App;
