/* 
  Componente que muestra un historial de llamadas respondidas, con la posibilidad de ordenarlas por hora o dururación
  Autor: Noh Ah Kim Kwon
  Fecha: 2024-05-10 
 */

import { useCallback, useContext, useEffect, useState } from "react";
import "../styles/historialLlamadas.css";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import HistorialTranscripcion from "./HistorialTranscripcion";
import { ColorTipografiaContexto } from "./ColorTipografia";

const Historial = ({ llamadas }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [transcripcionActual, setTranscripcionActual] = useState("");

  const abrirTranscripcion = (transcripcion) => {
    setTranscripcionActual(transcripcion);
    setPopupVisible(true);
  };

  const cerrarTranscripcion = () => {
    setPopupVisible(false);
  };

  const [ordenarPor, setOrdenarPor] = useState(null);
  const [ordenarAscDesc, setOrdenarAscDesc] = useState(null);

  let { nombreAgente } = useParams();
  const [agente, setAgente] = useState(null);

  const { tipografia } = useContext(ColorTipografiaContexto);

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
      // console.log(error);
      setAgente("not found");
    }
  }, [nombreAgente, setAgente]);
  

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData, nombreAgente]);

  const manejarOrden = (field) => {
    if (ordenarPor === field) {
      setOrdenarAscDesc(ordenarAscDesc === "asc" ? "desc" : "asc");
    } else {
      setOrdenarPor(field);
      setOrdenarAscDesc("asc");
    }
  };

  if (
    agente === null ||
    !nombreAgente ||
    agente === "not found" ||
    agente.length === 0 || agente[0]?.llamadas.length === 0
  ) {
    return (
      <div className="historial">
        <h3 className="titulo" style={{ fontFamily: tipografia.tipo2 }}>Llamadas Respondidas</h3>
        <table>
          <thead>
            <tr>
              <th
                style={{ width: "100px" }}
                onClick={() => manejarOrden("hora")}
              >
                Hora{" "}
                {ordenarPor === "hora" && (
                  <span className="filtro">
                    {ordenarAscDesc === "asc" ? <FaSortUp /> : <FaSortDown />}
                  </span>
                )}
              </th>
              <th>Cliente</th>
              <th
                style={{ width: "110px" }}
                onClick={() => manejarOrden("duracion")}
              >
                Duración{" "}
                {ordenarPor === "duracion" && (
                  <span className="filtro">
                    {" "}
                    {ordenarAscDesc === "asc" ? <FaSortUp /> : <FaSortDown />}
                  </span>
                )}
              </th>
              <th>Transcripción</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "200px" }}>
              <td style={{ borderBottom: "none" }} colSpan="4" > <h3>No hay llamadas registradas</h3></td>
            </tr>
          </tbody>
        </table>
        {popupVisible && (
          <div className="popup">
            <button onClick={cerrarTranscripcion}>Cerrar</button>
            <p>{transcripcionActual}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="historial">
      <h3 className="titulo" style={{ fontFamily: tipografia.tipo2 }}>Llamadas Respondidas</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }} onClick={() => manejarOrden("hora")}>
              Hora{" "}
              {ordenarPor === "hora" && (
                <span className="filtro">
                  {ordenarAscDesc === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
            </th>
            <th>Cliente</th>
            <th
              style={{ width: "110px" }}
              onClick={() => manejarOrden("duracion")}
            >
              Duración{" "}
              {ordenarPor === "duracion" && (
                <span className="filtro">
                  {" "}
                  {ordenarAscDesc === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
            </th>
            <th>Transcripción</th>
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
              }
              /* Ordenar por duración */
              else if (ordenarPor === "duracion") {
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
                <td>{contacto.CustomerName}</td> {/*client name */}
                <td style={{ color: 
                  contacto.DisconnectTimestamp &&
                  contacto.InitiationTimestamp ? (
                    (new Date(contacto.DisconnectTimestamp).getTime() -
                      new Date(contacto.InitiationTimestamp).getTime()) >= 180000 ? 'red' :
                    (new Date(contacto.DisconnectTimestamp).getTime() -
                      new Date(contacto.InitiationTimestamp).getTime()) >= 151000 ? 'orange' :
                    (new Date(contacto.DisconnectTimestamp).getTime() -
                      new Date(contacto.InitiationTimestamp).getTime()) >= 0 ? '#03C04A' :
                    'black'
                  ) : 'black'
                }}>
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
                        <HistorialTranscripcion contactId={contacto.ContactId} />
                      )
                    }
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {popupVisible && (
        <div className="popup">
          <button onClick={cerrarTranscripcion}>Cerrar</button>
          <div className="cajatranscripcion">{transcripcionActual}</div>
        </div>
      )}
    </div>
  );
};

export default Historial;
