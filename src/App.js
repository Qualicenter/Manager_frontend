import "./App.css";
// import styled from 'styled-components';
import Historicos from "./components/Historicos";
import Agentes from "./components/Agentes";
import Menu from "./components/Menu";
import Encuesta from "./components/Encuesta";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarraNav from "./components/BarraNav";
import KpiAgente from "./components/KpiAgente";
import { ColorTipografiaProveedor } from "./components/ColorTipografia";

function App() {
  return (
    <div className="App">
      <div>
        <ColorTipografiaProveedor>
          <Router>
            <BarraNav />

            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/agentes" element={<Agentes />} />
              <Route path="/agente/kpi/:nombreAgente" element={<KpiAgente />} />
              <Route path="/encuesta" element={<Encuesta />} />
              <Route path="/historicos" element={<Historicos />} />
            </Routes>
          </Router>
        </ColorTipografiaProveedor>
      </div>
    </div>
  );
}

export default App;
