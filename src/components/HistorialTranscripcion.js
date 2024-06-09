/**
 * @author Ángel Armando Márquez Curiel
 * @author Noh Ah Kim Kwon
 * Component that shows the transcription history of a call
 */

import "../styles/historial-transcripcion.css";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Transcripcion from "./Transcripcion";

/* Component that shows the transcription history of a call */
const HistorialTranscripcion = ( { contactId }) => {

  /* State that stores the transcription of a call */
  const [arrTranscripcion, setTranscripcion] = useState([]);

  /* Function to download the transcription of a call */
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

  /* Download the transcription of a call every 3 seconds */
  useEffect(() => {
    descargar();
    const interval = setInterval(descargar, 3000);
    return () => clearInterval(interval);
  }, [descargar]);

  return (
    <div>
      <h1>
        <div className=".ventana-transcripcionHistorial">
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
