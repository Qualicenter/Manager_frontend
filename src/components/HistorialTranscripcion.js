/**
 * Componente que muestra el historial de transcripciones de una llamada
 * Autor: Ángel Armando Márquez Curiel 
 * Editado por: Noh Ah Kim Kwon 
 */
import "../styles/historial-transcripcion.css";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Transcripcion from "./Transcripcion";


const HistorialTranscripcion = ( { contactId }) => {

  const [arrTranscripcion, setTranscripcion] = useState([]);

  const descargar = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/agente/consultaTranscripcion2/${contactId}`);
      const data = await response.json();
      const arrNuevo = data[0].Segments.map((segment) => {
        const transcripcion = {
          id: uuidv4(),
          descripcion: segment.Transcript.Content,
          sentiment: segment.Transcript.Sentiment,
          rol: segment.Transcript.ParticipantRole,
        };
        return transcripcion;
      });

      setTranscripcion(arrNuevo);
    } catch (error) {
      console.error("Error al descargar los datos:", error);
    }
  }, [contactId]);

  useEffect(() => {
    descargar();
    const interval = setInterval(descargar, 3000);
    return () => clearInterval(interval);
  }, [descargar]);

  return (
    <div>
      <h1>
        <div className=".ventana-transcripcion">
          {arrTranscripcion.length !== 0 ? (
            arrTranscripcion.map((transcripcion) => {
              return (
                <Transcripcion
                  transcripcion={transcripcion}
                  key={transcripcion.id}
                />
              );
            })
          ) : (
            <h1>...</h1>
          )}
        </div>
      </h1>
    </div>
  );
};

export default HistorialTranscripcion;
