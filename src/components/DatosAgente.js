/**
 * @author Noh Ah Kim Kwon
 * Component that shows the information, such as the photo, name, schedule, answered calls, abandoned calls and average handle time of an agent
 */

import { useParams } from "react-router-dom";
import "../styles/datosAgente.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { ColorTipografiaContexto } from "./ColorTipografia";

/* Component that shows the information of a specific agent */
const Datos = ({ info }) => {
  /* Context that provides the colors and typography of the application */
  const { colores, tipografia } = useContext(ColorTipografiaContexto);

  /* The agent's name is obtained from the URL */
  let { nombreAgente } = useParams();

  /* State that stores the agent's information */
  const [agente, setAgente] = useState(null);

  /* Function that downloads the agent's information */
  const descargarInfoAgente = useCallback(async () => {
    if (!nombreAgente) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/agente/infoAgente/${nombreAgente}`
      );
      if (!response.ok) {
        throw new Error("No se pudo conectar con el servidor");
      }
      const data = await response.json();
      setAgente(data);
    } catch (error) {
      console.log(error);
      setAgente("Agente no encontrado");
    }
  }, [nombreAgente, setAgente]);

  /* Download the agent's information every 10 seconds */
  useEffect(() => {
    descargarInfoAgente();
    const intervalo = setInterval(descargarInfoAgente, 15000);
    return () => clearInterval(intervalo);
  }, [descargarInfoAgente, nombreAgente]);

  /* If the agent does not exist, has not been found, agent has not been selected or the agent has no data, a container with default information is shown */
  if (agente === null || !nombreAgente || agente === "Agente no encontrado" || agente[0]?.data?.MetricResults?.length === 0) {
    return (
      <div className="cajacontenedor">
        <div className="izqdatos">
          <img src={info.imagen} alt="Foto" className="foto" />
        </div>
        <div className="derdatos">
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>-</th>
              </tr>
              <tr>
                <td>Schedule</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Answered Calls</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Abandoned Calls</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Handle Time (AVG)</td>
                <td>-m -s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* The average handle time is calculated */
  const duracionPromedio = Math.round(
    agente[0]?.data?.MetricResults[0]?.Collections?.find(
      (collection) => collection.Metric.Name === "AVG_HANDLE_TIME"
    )?.Value || 0
  );
  /* The minutes and seconds are calculated */
  const minutos = duracionPromedio ? Math.floor(duracionPromedio / 60) : "-";
  const segundos = duracionPromedio ? duracionPromedio % 60 : "-";

  /* The agent's image is obtained */
  let img;
  try {
    img = require(`../images/${nombreAgente}.png`);
  } catch (err) {
    img = info.imagen; /* It uses info.image if the agent's image is not found */
  }

  /* Returns a container with the agent's information */
  return (
    <div className="cajacontenedor">
      <div className="izqdatos">
        <img src={img} alt="Foto" className="foto" />
      </div>
      <div className="derdatos">
        <table>
          <tbody>
            <tr>
              <th colSpan={2} style={{color: colores.primarioM, fontFamily: tipografia.tipo2}}>
                <h3>{agente[0]?.nombre || "-"}</h3>
              </th>
            </tr>
            <tr>
              <td>Schedule</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Answered Calls</td>
              <td>
                {agente[0]?.data?.MetricResults[0]?.Collections?.find(
                  (collection) => collection.Metric.Name === "CONTACTS_HANDLED"
                )?.Value || 0}
              </td>
            </tr>
            <tr>
              <td>Abandoned Calls</td>
              <td>
                {agente[0]?.data?.MetricResults[0]?.Collections?.find(
                  (collection) =>
                    collection.Metric.Name === "CONTACTS_ABANDONED"
                )?.Value || 0}
              </td>
            </tr>
            <tr>
              <td>Handle Time (AVG)</td>
              <td>
                <span
                  style={{
                    margin: "0",
                    color:
                      minutos >= 3 && segundos > 0
                        ? "red"
                        : minutos === 3 || (minutos === 2 && segundos >= 31)
                        ? "orange"
                        : minutos >= 0 || (minutos <= 2 && segundos <= 30)
                        ? "#03C04A"
                        : "black",
                  }}
                >
                  {minutos}m {segundos}s
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datos;
