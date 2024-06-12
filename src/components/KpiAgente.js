/**
 * @author Noh Ah Kim Kwon
 * Component that shows the KPIs of an agent
 */

import "../styles/datosAgente.css";
import Datos from "./DatosAgente";
import Historial from "./HistorialLlamadas";
import Desempenio from "./DesAgente";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ColorTipografiaContexto } from "./ColorTipografia";
import { useContext } from "react";
import fotoPerfil from "../images/profile.png";

/* Styled components for the KPIs of an agent */
const Info = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  left: calc(16%);
  gap: 5%;
  flex-direction: column;
`;

const Contenedor = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

const Caja = styled.div`
  flex: auto;
  overflow: auto;
  margin: 15px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  display: grid;
  place-items: center;
`;

const ContenedorIzq = styled.div`
  flex: 40%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContenedorDer = styled.div`
  flex: 60%;
  width: 100%;
  overflow: auto;
  margin: 15px;
  padding: 0 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;
const BotonRegresar = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #000;
`;

/* Function that returns the KPIs of an agent */
const KpiAgente = () => {
  /* Context to get the typography color */
  const { tipografia } = useContext(ColorTipografiaContexto);

  /* Function that navigates to the agents page */
  const navegar = useNavigate();

  /* Function that returns to the agents page */
  const regresar = (e) => {
    e.preventDefault(); //
    navegar("/agentes");
  };

  return (
    <Info style={{ fontFamily: tipografia.tipo1 }}>
      <Contenedor>
        <BotonRegresar onClick={regresar}>
          <FaArrowLeft />
        </BotonRegresar>
        <ContenedorIzq>
          <Caja>
            <Datos
              info={{
                imagen: fotoPerfil,
                dias: "Monday to Friday",
                horas: "9:00 - 18:00",
              }}
            />
          </Caja>
          <Caja>
            <Desempenio
              etiqueta="Service Level"
              porcentaje={""}
              color="#1096b8"
            />
            <Desempenio
              etiqueta="Response Rate"
              porcentaje={""}
              color="#da6075"
            />
          </Caja>
        </ContenedorIzq>
        <ContenedorDer>
          <Historial />
        </ContenedorDer>
      </Contenedor>
    </Info>
  );
};

export default KpiAgente;
