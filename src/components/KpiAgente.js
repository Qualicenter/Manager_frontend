// Componente que muestra los KPIs de un agente

import "../styles/datosAgente.css";
import Datos from "./DatosAgente";
import Historial from "./HistorialLlamadas";
import styled from "styled-components";
import Horario from "./HorarioAgente";
import { useNavigate } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';

const Info = styled.div`
  position: absolute;
  display: flex;
  align-items: left;
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
  left: 16%;
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
  flex: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Right = styled.div`
  flex: 50%;
  overflow: auto;
  margin: 15px;
  padding: 0 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;
const Boton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #000;
`;

const KpiAgente = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Info>
      <Container>
        <Boton onClick={handleGoBack}>
          <FaIcons.FaArrowLeft/>
        </Boton>
        <Left>
          
          <Box>
            <Datos
              agente={{
                imagen: "https://via.placeholder.com/170",
                nombre: "Juan Pérez",
                turno: "Lun-Vie 9:00-17:00",
                llamadasRespondidas: 15,
                llamadasAbandonadas: 5,
                promedio: "3m 21s",
                nivelDeServicio: "90%",
              }}
            />
          </Box>
          <Box>
            <Horario
              eventos={[
                {
                  tipo: "Horario laboral",
                  horaInicio: "08:00",
                  horaFin: "16:00",
                  color: "lightblue",
                },
                {
                  tipo: "Descansos",
                  horaInicio: "10:00 12:00",
                  horaFin: "10:15 12:30",
                  color: "lightgreen",
                  horarios: ["10:00-10:15", "12:00-12:30"],
                },
                {
                  tipo: "Llamadas Respondidas",
                  horaInicio: "08:30",
                  horaFin: "09:30",
                  color: "lightyellow",
                },
                {
                  tipo: "Llamadas en Espera",
                  horaInicio: "11:00",
                  horaFin: "11:30",
                  color: "lightcoral",
                },
              ]}
            />
          </Box>
        </Left>
        <Right>
          <Historial
            llamadas={[
              {
                casoId: 1,
                fecha: "2021-08-01",
                cliente: "Cliente 1",
                duracion: "2m 30s",
                transcripcion:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                casoId: 2,
                fecha: "2021-08-02",
                cliente: "Cliente 2",
                duracion: "3m 45s",
                transcripcion:
                  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
              {
                casoId: 3,
                fecha: "2021-08-03",
                cliente: "Cliente 3",
                duracion: "1m 15s",
                transcripcion:
                  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                casoId: 4,
                fecha: "2021-08-04",
                cliente: "Cliente 4",
                duracion: "4m 20s",
                transcripcion:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
              },
              {
                casoId: 5,
                fecha: "2021-08-05",
                cliente: "Cliente 5",
                duracion: "3m 10s",
                transcripcion:
                  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                casoId: 6,
                fecha: "2021-08-06",
                cliente: "Cliente 6",
                duracion: "2m 50s",
                transcripcion:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                casoId: 7,
                fecha: "2021-08-07",
                cliente: "Cliente 7",
                duracion: "1m 30s",
                transcripcion:
                  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
              {
                casoId: 8,
                fecha: "2021-08-08",
                cliente: "Cliente 8",
                duracion: "4m 40s",
                transcripcion:
                  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                casoId: 9,
                fecha: "2021-08-09",
                cliente: "Cliente 9",
                duracion: "3m 20s",
                transcripcion:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
              },
              {
                casoId: 10,
                fecha: "2021-08-10",
                cliente: "Cliente 10",
                duracion: "2m 30s",
                transcripcion:
                  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                casoId: 11,
                fecha: "2021-08-11",
                cliente: "Cliente 11",
                duracion: "1m 40s",
                transcripcion:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                casoId: 12,
                fecha: "2021-08-12",
                cliente: "Cliente 12",
                duracion: "3m 30s",
                transcripcion:
                  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              },
              {
                casoId: 13,
                fecha: "2021-08-13",
                cliente: "Cliente 13",
                duracion: "2m 20s",
                transcripcion:
                  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                casoId: 14,
                fecha: "2021-08-14",
                cliente: "Cliente 14",
                duracion: "4m 10s",
                transcripcion:
                  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
              },
              {
                casoId: 15,
                fecha: "2021-08-15",
                cliente: "Cliente 15",
                duracion: "3m 50s",
                transcripcion:
                  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
          />
        </Right>
      </Container>
    </Info>
  );
};

export default KpiAgente;
