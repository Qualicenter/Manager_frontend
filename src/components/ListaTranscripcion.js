import '../styles/lista-transcripcion.css'
import '../styles/ventana-transcripcion.css'
import {useCallback, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Transcripcion from './Transcripcion';



const ListaTranscripcion = (props) => {
  // Datos temporales
 
  const cancelar = props.cancelar;
  const {setSentimiento} = props;
  const [arrTranscripcion, setTranscripcion] = useState([]);
  const [url] = useState("http://localhost:8080/agente/consultaTranscripcionActiva");

  const descargar = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data  = await response.json();
      console.log("DATA:", data[0].Segments[data[0].Segments.length - 1].Transcript.Sentiment)
      setSentimiento( data[0].Segments[data[0].Segments.length - 1].Transcript.Sentiment)
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
      console.error('Error al descargar los datos:', error);
    }
  }, [url, setSentimiento]);

  useEffect(() => {
    const interval = setInterval(descargar, 4000); // Descargar cada 5 segundos
    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [descargar]);

    return(
      <div className="ventana-transcripcion-completa" onClick={cancelar}>
        <h1 className="ventana-transcripcion2">
        <div className="ventana">
             
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
        
  )
  
}

export default ListaTranscripcion;