/**
 * @author Ingrid García Hernández
 * @author Noh Ah Kim Kwon
 * Component that shows the available, in call, at rest and absent agents.
 */

import React, { useState, useEffect, useCallback } from "react";
import "../styles/agentes.css";
import "../images/1.png";
import AgentesIndividual from "./AgentesIndividual";
import agente1 from "../images/gustavotellez.png";

const Agentes = () => {
  const [arrAgDisponibles, setArrAgDisponibles] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      // const response = await fetch('localhost/agente/agenteEsp?estado=En llamada');
      const data = await response.json();

      const arrNuevo = data.map((todo) => {
        const agenteNuevo = {
          id: todo.id, // Use the existing ID from the data
          nombre: todo.name,
          apellido: todo.username,
        };
        console.log(agenteNuevo);
        return agenteNuevo;
      });
      setArrAgDisponibles(arrNuevo);
    } catch (error) {
      console.error("Error al descargar datos:", error);
    }
  }, [setArrAgDisponibles]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="agentesW">
      <div className="column" data-color="blue">
        <h1 className="tiposEstado">Available</h1>

        <div className="alinear">
          <div className="alinear">
            <AgentesIndividual nombre="Gustavo" apellido="Tellez" im={ agente1 }
            />
            <AgentesIndividual nombre="Angel" apellido="Marquez" im="" />
            <AgentesIndividual nombre="Aldehil" apellido="Sanchez" im="" />
            <AgentesIndividual nombre="Juan" apellido="Perez" im="" />
            <AgentesIndividual nombre="Ana" apellido="Rodriguez" im="" />
            {/* {arrAgDisponibles.length > 0 && ( 
                        arrAgDisponibles.map((agente) => (
                        <AgentesIndividual key={agente.id} nombre={agente.nombre} apellido={agente.apellido} />
                        ))
                    )}
            {arrAgDisponibles.length === 0 && <p>No hay agentes actualmente</p>} */}
            {arrAgDisponibles.length > 0 &&
              arrAgDisponibles
                .slice(0, 1)
                .map((agente) => (
                  <AgentesIndividual
                    key={agente.id}
                    nombre={agente.nombre}
                    apellido={agente.apellido}
                  />
                ))}
            {arrAgDisponibles.length === 0 && <p>No hay agentes actualmente</p>}
          </div>
        </div>
      </div>

      <div className="column" data-color="green">
        <h1 className="tiposEstado">In Call</h1>
        <div className="alinear">
          <div className="alinear">
            <AgentesIndividual nombre="Carlos" apellido="Sanchez" im="" />
            <AgentesIndividual nombre="Sofia" apellido="Ramirez" im="" />
            <AgentesIndividual nombre="Diego" apellido="Martinez" im="" />
            <AgentesIndividual nombre="Laura" apellido="Gonzales" im="" />
          </div>
        </div>
      </div>

      <div className="column" data-color="yellow">
        <h1 className="tiposEstado">At Rest</h1>

        <div className="alinear">
          <div className="alinear">
            {arrAgDisponibles.length > 0 &&
              arrAgDisponibles
                .slice(7, 8)
                .map((agente) => (
                  <AgentesIndividual
                    key={agente.id}
                    nombre={agente.nombre}
                    apellido={agente.apellido}
                  />
                ))}
            {arrAgDisponibles.length === 0 && <p>No hay agentes actualmente</p>}
          </div>
        </div>
      </div>

      <div className="column" data-color="gray">
        <h1 className="tiposEstado">Absent</h1>

        <div className="alinear">
          <div className="alinear">
            {arrAgDisponibles.length > 0 &&
              arrAgDisponibles
                .slice(9, 10)
                .map((agente) => (
                  <AgentesIndividual
                    key={agente.id}
                    nombre={agente.nombre}
                    apellido={agente.apellido}
                  />
                ))}
            {arrAgDisponibles.length === 0 && <p>No hay agentes actualmente</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agentes;
