/**
 * Componente que muestra los KPIs de un agente
 * Autor: Noh Ah Kim Kwon
 * Fecha: 2024-05-10
 */

import "../styles/datosAgente.css";
import Datos from "./DatosAgente";
import Historial from "./HistorialLlamadas";
import Desempenio from "./DesAgente";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { ColorTipografiaContexto } from "./ColorTipografia";
import { useContext } from "react";
import fotoPerfil from "../images/profile.png";

const Info = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  left: calc(16%);
  gap: 5%;
  flex-direction: column;
`;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

const Box = styled.div`
  flex: auto;
  overflow: auto;
  margin: 15px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  display: grid;
  place-items: center;
`;

const Left = styled.div`
  flex: 40%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Right = styled.div`
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

const KpiAgente = () => {
  const { tipografia } = useContext(ColorTipografiaContexto);
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault(); //
    navigate("/agentes");
  };

  return (
    <Info style={{ fontFamily: tipografia.tipo1 }}>
      <Container>
        <BotonRegresar onClick={handleGoBack}>
          <FaIcons.FaArrowLeft />
        </BotonRegresar>
        <Left>
          <Box>
            <Datos
              info={{
                imagen: fotoPerfil,
              }}
            />
          </Box>
          <Box>
            <Desempenio
              label="Nivel de Servicio"
              porcentaje={89}
              color="#1096b8"
              obj={""}
            />
            <Desempenio
              label="Tasa de respuesta"
              porcentaje={80}
              color="#da6075"
              obj={""}
            />
          </Box>
        </Left>
        <Right>
          <Historial />
        </Right>
      </Container>
    </Info>
  );
};

export default KpiAgente;
