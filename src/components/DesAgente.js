/**
 * Componente que muestra el desempeño, como el nivel de servicio y la tasa de respuesta, de un agente
 * Autor: Noh Ah Kim Kwon
 * Fecha: 2024-05-10
 */

import { useParams } from "react-router-dom";
import "../styles/desAgente.css";
import { useCallback, useEffect, useState } from "react";

const Desempenio = ({ label, porcentaje, color, obj }) => {
  let { nombreAgente } = useParams();
  const [agente, setAgente] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      if (!nombreAgente) {
        return; // Si nombreAgente no existe, detén la ejecución de la función
      }
      const response = await fetch(`http://localhost:8080/agente/infoAgente/${nombreAgente}`);
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

  


  if (agente === null || !nombreAgente || agente === "not found" || agente[0]?.data?.MetricResults?.length === 0) {
    return (
      <div className="desempenio">
        <p className="label">{label}</p>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `0%`, backgroundColor: `${color}` }}
          >
          </div>
          {obj && (
            <div
              className="threshold-marker"
              style={{ left: `${obj}%`, zIndex: 0 }}
            >
              <span className="threshold-text" title="Objetivo">
                {obj}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  

  const nivelServicio = agente[0]?.data?.MetricResults[0]?.Collections?.find(collection => collection.Metric.Name === 'SERVICE_LEVEL')?.Value?.toFixed(2) || '';
  const tasaRespuesta = agente[0]?.data?.MetricResults[0]?.Collections?.find(collection => collection.Metric.Name === 'AGENT_ANSWER_RATE')?.Value?.toFixed(2) || '' ;
  
  if (label === "Nivel de Servicio") {
    porcentaje = nivelServicio;
  } else if (label === "Tasa de respuesta") {
    porcentaje = tasaRespuesta;
  }

  return (
    <div className="desempenio">
      <p className="label">{label}</p>
      <div className="progress-bar-container">
        <div
          className="progress-bar progress-transition"
          style={{ width: `${porcentaje}%`, backgroundColor: `${color}` }}
        >
          {/* Mostrar el texto de porcentaje en el lado derecho de la barra de progreso */}
          {porcentaje >= 0 && porcentaje <= 15 ? (
            <span
              className="porcentaje-text"
              style={{ transform: "translateX(120%)" }}
            >
              {porcentaje}%
            </span>
          ) : (
            <span className="porcentaje-text porcentaje-transition" style={{ zIndex: 1 }}>
              {porcentaje}%
            </span>
          )}
        </div>
        {obj && (
          <div
            className="threshold-marker"
            style={{ left: `${obj}%`, zIndex: 0 }}
          >
            <span className="threshold-text" title="Objetivo">
              {obj}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Desempenio;
