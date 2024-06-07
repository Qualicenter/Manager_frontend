/**
 * @author Noh Ah Kim Kwon
 * Component that shows the performance, such as the service level and the response rate, of an agent
 */

import { useParams } from "react-router-dom";
import "../styles/desAgente.css";
import { useCallback, useEffect, useState } from "react";

/* Component that shows the performance of a specific agent */	
const Desempenio = ({ etiqueta, porcentaje, color }) => {
  /* The agent's name is obtained from the URL */
  let { nombreAgente } = useParams();

  /* State that stores the agent's information */
  const [agente, setAgente] = useState(null);

  /* Function that downloads the agent's information */
  const descargarInfoAgente = useCallback(async () => {
    try {
      if (!nombreAgente) {
        return;
      }
      const response = await fetch(`http://localhost:8080/agente/infoAgente/${nombreAgente}`);
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
    const intervalo = setInterval(descargarInfoAgente, 10000);
    return () => clearInterval(intervalo);
  }, [descargarInfoAgente, nombreAgente]);

  /* If the agent does not exist, has not been found, agent has not been selected or the agent has no data, a container with default information is shown */
  if (agente === null || !nombreAgente || agente === "Agente no encontrado" || agente[0]?.data?.MetricResults?.length === 0) {
    return (
      <div className="desempenio">
        <p className="etiqueta">{etiqueta}</p>
        <div className="contenedor-barra-de-progreso">
          <div
            className="barra-de-progreso porcentaje-transicion"
            style={{ width: `0%`, backgroundColor: `${color}` }}
          >
          </div>
        </div>
      </div>
    );
  }
  
  /* If the agent has data, the service level and response rate are shown */
  const nivelServicio = agente[0]?.data?.MetricResults[0]?.Collections?.find(collection => collection.Metric.Name === 'SERVICE_LEVEL')?.Value?.toFixed(2) || '';
  const tasaRespuesta = agente[0]?.data?.MetricResults[0]?.Collections?.find(collection => collection.Metric.Name === 'AGENT_ANSWER_RATE')?.Value?.toFixed(2) || '' ;
  
  if (etiqueta === "Service Level") {
    porcentaje = nivelServicio;
  } else if (etiqueta === "Response Rate") {
    porcentaje = tasaRespuesta;
  }

  /* Return the performance bar */
  return (
    <div className="desempenio">
      <p className="etiqueta">{etiqueta}</p>
      <div className="contenedor-barra-de-progreso">
        <div
          className="barra-de-progreso porcentaje-transicion"
          style={{ width: `${porcentaje}%`, backgroundColor: `${color}` }}
        >
          {/* Show the percentage text on the right side of the progress bar */}
          {porcentaje >= 0 && porcentaje <= 15 ? (
            <span
              className="porcentaje-texto"
              style={{ transform: "translateX(120%)" }}
            >
              {porcentaje}%
            </span>
          ) : (
            <span className="porcentaje-texto porcentaje-transicion" style={{ zIndex: 1 }}>
              {porcentaje}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Desempenio;
