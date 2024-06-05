/**
 * Componente que muestra la información, como la foto, nombre, horario, llamadas respondidas, llamadas abandonadas y duración promedio de un agente
 * Autor: Noh Ah Kim Kwon
 * Fecha: 2024-05-10
 */

import { useParams } from "react-router-dom";
import "../styles/datosAgente.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { ColorTipografiaContexto } from "./ColorTipografia";

const Datos = ({ info }) => {
  const { colores, tipografia } = useContext(ColorTipografiaContexto);

  let { nombreAgente } = useParams();
  const [agente, setAgente] = useState(null);

  const fetchData = useCallback(async () => {
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
      //console.log(error);
      setAgente("not found");
    }
  }, [nombreAgente, setAgente]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData, nombreAgente]);


  if (agente === null || !nombreAgente || agente === "not found") {
    return (
      <div className="containerbox">
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
                <td>Horario</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Llamadas Respondidas</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Llamadas Abandonadas</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Duración Promedio</td>
                <td>-m -s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const duracionPromedio = Math.round(
    agente[0]?.data?.MetricResults[0]?.Collections?.find(
      (collection) => collection.Metric.Name === "AVG_HANDLE_TIME"
    )?.Value || 0
  );
  const minutos = duracionPromedio ? Math.floor(duracionPromedio / 60) : "-";
  const segundos = duracionPromedio ? duracionPromedio % 60 : "-";

  let imgSrc;
  try {
    imgSrc = require(`../images/${nombreAgente}.png`);
  } catch (err) {
    imgSrc = info.imagen; // Usa info.imagen si la imagen del agente no se encuentra
  }

  /* Se regresa un contenedor con la información del agente */
  return (
    <div className="containerbox">
      <div className="izqdatos">
        <img src={imgSrc} alt="Foto" className="foto" />
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
              <td>Horario</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Llamadas Respondidas</td>
              <td>
                {agente[0]?.data?.MetricResults[0]?.Collections?.find(
                  (collection) => collection.Metric.Name === "CONTACTS_HANDLED"
                )?.Value || 0}
              </td>
            </tr>
            <tr>
              <td>Llamadas Abandonadas</td>
              <td>
                {agente[0]?.data?.MetricResults[0]?.Collections?.find(
                  (collection) =>
                    collection.Metric.Name === "CONTACTS_ABANDONED"
                )?.Value || 0}
              </td>
            </tr>
            <tr>
              <td>Duración Promedio</td>
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
