import React, { useState, useEffect, useCallback } from "react";
import "../styles/agentes.css";
import "../images/1.png";
import AgentesIndividual from "./AgentesIndividual";



const Agentes = () => {

  const [arrAgDisponibles, setArrAgDisponibles] = useState([]);
//   const [arrAgLlamada, setArrAgLlamada] = useState([]);
//   const [arrAgDescanso, setArrAgDescanso] = useState([]);
//   const [arrAgAusente, setArrAgAusente] = useState([]);

//   const [urlDis, setUrlDis] = useState("/agente/agenteEsp?estado=Disponible");
//   const [urlLlam, setUrlLlam] = useState("/agente/agenteEsp?estado=En llamada");
//   const [urlDes, setUrlDes] = useState("/agente/agenteEsp?estado=En descanso");
//   const [urlAus, setUrlAus] = useState("/agente/agenteEsp?estado=Ausente");

// const infoDis = useCallback(async () => {
//     try {
//       const response = await fetch(
//         urlDis
//       );
//       // const response = await fetch('localhost/agente/agenteEsp?estado=Disponible');
//       const data = await response.json();

//       const arrNuevo = data.map((todo) => {
//         const agenteNuevo = {
//           id: todo.id, // Use the existing ID from the data
//           nombre: todo.nombew,
//           apellido: todo.apellido,
//         };
//         console.log(agenteNuevo);
//         return agenteNuevo;
//       });
//       setArrAgDisponibles(arrNuevo);
//     } catch (error) {
//       console.error("Error al descargar datos:", error);
//     }
//   }, [setArrAgDisponibles]);

// const infoLlam = useCallback(async () => {
//     try {
//       const response = await fetch(
//         urlLlam
//       );
//       // const response = await fetch('localhost/agente/agenteEsp?estado=En llamada');
//       const data = await response.json();

//       const arrNuevo = data.map((todo) => {
//         const agenteNuevo = {
//           id: todo.id, // Use the existing ID from the data
//           nombre: todo.nombew,
//           apellido: todo.apellido,
//         };
//         console.log(agenteNuevo);
//         return agenteNuevo;
//       });
//       setArrAgDisponibles(arrNuevo);
//     } catch (error) {
//       console.error("Error al descargar datos:", error);
//     }
//   }, [setArrAgLlamada]);

// const infoDes= useCallback(async () => {
//     try {
//       const response = await fetch(
//         urlDes
//       );
//       // const response = await fetch('localhost/agente/agenteEsp?estado=En descanso');
//       const data = await response.json();

//       const arrNuevo = data.map((todo) => {
//         const agenteNuevo = {
//           id: todo.id, // Use the existing ID from the data
//           nombre: todo.nombew,
//           apellido: todo.apellido,
//         };
//         console.log(agenteNuevo);
//         return agenteNuevo;
//       });
//       setArrAgDescanso(arrNuevo);
//     } catch (error) {
//       console.error("Error al descargar datos:", error);
//     }
//   }, [setArrAgDescanso]);

// const infoAus= useCallback(async () => {
    // try {
    //           const response = await fetch(
    //             urlAus
    //           );
    //           // const response = await fetch('localhost/agente/agenteEsp?estado=Ausente');
    //           const data = await response.json();
        
    //           const arrNuevo = data.map((todo) => {
    //             const agenteNuevo = {
    //               id: todo.id, // Use the existing ID from the data
    //               nombre: todo.nombew,
    //               apellido: todo.apellido,
    //             };
    //             console.log(agenteNuevo);
    //             return agenteNuevo;
    //           });
    //           setArrAgAusente(arrNuevo);
    //         } catch (error) {
    //           console.error("Error al descargar datos:", error);
    //         }
    //       }, [setArrAgAusente]);



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
        <h1 className="tiposEstado">Disponibles</h1>

        <div className="alinear">
          <div className="alinear">
            <AgentesIndividual nombre="Juan" apellido="Perez" im = ""/>
            <AgentesIndividual nombre="Ana" apellido="Rodriguez" im = ""/>
            <AgentesIndividual nombre="María" apellido="López" im = ""/>
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
        <h1 className="tiposEstado">En llamada</h1>
        <div className="alinear">
          <div className="alinear">
            <AgentesIndividual nombre="Carlos" apellido="Sanchez" im = ""/>
            <AgentesIndividual nombre="Sofia" apellido="Ramirez" im = ""/>
            <AgentesIndividual nombre="Diego" apellido="Martinez" im = ""/>
            <AgentesIndividual nombre="Laura" apellido="Gonzales" im = ""/>
            

            {/* {arrAgLlamada.length > 0 && ( 
                        arrAgLlamada.map((agente) => (
                        <AgentesIndividual key={agente.id} nombre={agente.nombre} apellido={agente.apellido} />
                        ))
                    )}
            {arrAgLlamada.length === 0 && <p>No hay agentes actualmente</p>} */}
            {/* {arrAgDisponibles.length > 0 &&
              arrAgDisponibles
                .slice(4, 6)
                .map((agente) => (
                  <AgentesIndividual
                    key={agente.id}
                    nombre={agente.nombre}
                    apellido={agente.apellido}
                  />
                ))}
            {arrAgDisponibles.length === 0 && <p>No hay agentes actualmente</p>} */}
          </div>
        </div>
      </div>

      <div className="column" data-color="yellow">
        <h1 className="tiposEstado">En descanso</h1>

        <div className="alinear">
          <div className="alinear">
            
                        {/* {arrAgDescanso.length > 0 && ( 
                        arrAgDescanso.map((agente) => (
                        <AgentesIndividual key={agente.id} nombre={agente.nombre} apellido={agente.apellido} />
                        ))
                    )}
            {arrAgDescanso.length === 0 && <p>No hay agentes actualmente</p>} */}
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
        <h1 className="tiposEstado">Ausente</h1>

        <div className="alinear">
          <div className="alinear">
          
            {/* {arrAgAusente.length > 0 && ( 
                        arrAgAusente.map((agente) => (
                        <AgentesIndividual key={agente.id} nombre={agente.nombre} apellido={agente.apellido} />
                        ))
                    )}
            {arrAgAusente.length === 0 && <p>No hay agentes actualmente</p>} */}
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
