/**
 * @author Noh Ah Kim Kwon
 * Component that shows the history of answered calls, with the possibility of sorting them by time or duration
 */

import { useCallback, useContext, useEffect, useState } from "react";
import "../styles/historialLlamadas.css";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { useParams } from "react-router-dom";
import HistorialTranscripcion from "./HistorialTranscripcion";
import { ColorTipografiaContexto } from "./ColorTipografia";

/* Component that shows the history of answered calls */
const Historial = ({ llamadas }) => {
  /* State that stores the transcription of a call */
  const [popupVisible, setPopupVisible] = useState(false);

  /* State that stores the transcription of a call */
  const [transcripcionActual, setTranscripcionActual] = useState("");

  /* Function to open the transcription of a call */
  const abrirTranscripcion = (transcripcion) => {
    setTranscripcionActual(transcripcion);
    setPopupVisible(true);
  };

  /* Function to close the transcription of a call */
  const cerrarTranscripcion = () => {
    setPopupVisible(false);
  };

  /* State that stores the sorting order */
  const [ordenarPor, setOrdenarPor] = useState(null);

  /* State that stores the sorting order */
  const [ordenarAscDesc, setOrdenarAscDesc] = useState(null);

  /* The agent's name is obtained from the URL */
  let { nombreAgente } = useParams();

  /* State that stores the agent's information */
  const [agente, setAgente] = useState(null);

  /* Context that provides the colors and typography of the application */
  const { tipografia } = useContext(ColorTipografiaContexto);

  /* Component that shows the information of a specific agent */
  const descargarInfoAgente = useCallback(async () => {
    try {
      if (!nombreAgente) {
        return;
      }
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
      setAgente("not found");
    }
  }, [nombreAgente, setAgente]);

  /* Download the agent's information every 10 seconds */
  useEffect(() => {
    descargarInfoAgente();
    const interval = setInterval(descargarInfoAgente, 15000);
    return () => clearInterval(interval);
  }, [descargarInfoAgente, nombreAgente]);

  /* Function that sorts the calls by time or duration */
  const manejarOrden = (field) => {
    if (ordenarPor === field) {
      setOrdenarAscDesc(ordenarAscDesc === "asc" ? "desc" : "asc");
    } else {
      setOrdenarPor(field);
      setOrdenarAscDesc("asc");
    }
  };

  /* If the agent does not exist, has not been found, agent has not been selected or the agent has no data, a container with default information is shown */
  if (
    agente === null ||
    !nombreAgente ||
    agente === "not found" ||
    agente.length === 0 ||
    agente[0]?.llamadas.length === 0
  ) {
    return (
      <div className="historial">
        <h3 className="titulo" style={{ fontFamily: tipografia.tipo2 }}>
          Answered Calls
        </h3>
        <table>
          <thead>
            <tr>
              <th
                style={{ width: "100px" }}
                onClick={() => manejarOrden("hora")}
              >
                Time
              </th>
              <th>Client</th>
              <th
                style={{ width: "110px" }}
                onClick={() => manejarOrden("duracion")}
              >
                Duration
              </th>
              <th>Transcription</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "200px" }}>
              <td style={{ borderBottom: "none" }} colSpan="4">
                {" "}
                <h3>No calls recorded</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  /* Return the history of answered calls if the agent has data */
  return (
    <div className="historial">
      <h3 className="titulo" style={{ fontFamily: tipografia.tipo2 }}>
        Answered Calls
      </h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }} onClick={() => manejarOrden("hora")}>
              Time{" "}
              {/* It shows an arrow up or down depending on the sorting order */}
              {ordenarPor === "hora" && (
                <span className="filtro">
                  {ordenarAscDesc === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
              {ordenarPor !== "hora" && (
                <span className="filtro" style={{color: "silver"}}>
                  <FaSort />
                </span>
              )}
            </th>
            <th>Client</th>
            <th
              style={{ width: "110px" }}
              onClick={() => manejarOrden("duracion")}
            >
              Duration{" "}
              {/* It shows an arrow up or down depending on the sorting order */}
              {ordenarPor === "duracion" && (
                <span className="filtro">
                  {" "}
                  {ordenarAscDesc === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
              {ordenarPor !== "duracion" && (
                <span className="filtro" style={{color: "silver"}}>
                  <FaSort />
                </span>
              )}
            </th>
            <th>Transcription</th>
          </tr>
        </thead>
        <tbody>
          {agente[0]?.llamadas
            .sort((a, b) => {
              /* Ordenar por hora */
              if (ordenarPor === "hora") {
                return ordenarAscDesc === "asc"
                  ? a.ConnectedToAgentTimestamp.localeCompare(
                      b.ConnectedToAgentTimestamp
                    )
                  : b.ConnectedToAgentTimestamp.localeCompare(
                      a.ConnectedToAgentTimestamp
                    );
              } else if (ordenarPor === "duracion") {
              /* Ordenar por duración */
                return ordenarAscDesc === "asc"
                  ? new Date(a.DisconnectTimestamp) -
                      new Date(a.InitiationTimestamp) -
                      (new Date(b.DisconnectTimestamp) -
                        new Date(b.InitiationTimestamp))
                  : new Date(b.DisconnectTimestamp) -
                      new Date(b.InitiationTimestamp) -
                      (new Date(a.DisconnectTimestamp) -
                        new Date(a.InitiationTimestamp));
              } else {
                return 0;
              }
            })
            .map((contacto, index) => (
              <tr key={index}>
                <td>
                  {new Date(
                    contacto.ConnectedToAgentTimestamp
                  ).toLocaleTimeString()}
                </td>
                <td>{contacto.CustomerName}</td>
                <td
                  style={{
                    color:
                      contacto.DisconnectTimestamp &&
                      contacto.InitiationTimestamp
                        ? new Date(contacto.DisconnectTimestamp).getTime() -
                            new Date(contacto.InitiationTimestamp).getTime() >=
                          180000
                          ? "red"
                          : new Date(contacto.DisconnectTimestamp).getTime() -
                              new Date(
                                contacto.InitiationTimestamp
                              ).getTime() >=
                            151000
                          ? "orange"
                          : new Date(contacto.DisconnectTimestamp).getTime() -
                              new Date(
                                contacto.InitiationTimestamp
                              ).getTime() >=
                            0
                          ? "#03C04A"
                          : "black"
                        : "black",
                  }}
                >
                  {contacto.DisconnectTimestamp &&
                  contacto.InitiationTimestamp ? (
                    `${
                      Math.floor(
                        (new Date(contacto.DisconnectTimestamp).getTime() -
                          new Date(contacto.InitiationTimestamp).getTime()) /
                          60000
                      ) || 0
                    }m ${
                      Math.floor(
                        (new Date(contacto.DisconnectTimestamp).getTime() -
                          new Date(contacto.InitiationTimestamp).getTime()) /
                          1000
                      ) % 60 || 0
                    }s`
                  ) : (
                    <span>on contact</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      abrirTranscripcion(
                        <HistorialTranscripcion
                          contactId={contacto.ContactId}
                        />
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* If the popup is visible, it shows the transcription of the call */}
      {popupVisible && (
        <div className="popup">
          {/* Button to close the transcription popup */}
          <button onClick={cerrarTranscripcion}>Close</button>
          {/* Container with the transcription */}
          <div className="cajatranscripcion">{transcripcionActual}</div>
        </div>
      )}
    </div>
  );
};

export default Historial;
