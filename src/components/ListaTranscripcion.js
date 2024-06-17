/**
 * @author Angel Armando Marquez Curiel
 * @author
 * @author
 * Component to download the information of the transcription of the active call and uses Transcripcion.js to display it
*/

import '../styles/lista-transcripcion.css'
import '../styles/ventana-transcripcion.css'
import {useCallback, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Transcripcion from './Transcripcion';



const ListaTranscripcion = (props) => {
 
  /*State variables and props from parent component*/
  const cancelar = props.cancelar;
  const {setSentimiento} = props;
  const {contactId} = props;
  const [arrTranscripcion, setTranscripcion] = useState([]);
  const [url] = useState(`${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/agente/consultaTranscripcion2`);

  /*Function to fetch the transcription of the conversation*/
  const descargar = useCallback(async () => {
    try {
      if (!contactId) {return;}
      const response = await fetch(`${url}/${contactId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data  = await response.json();
      setSentimiento( data[0].Segments[data[0].Segments.length - 1].Transcript.Sentiment)
      const arrNuevo = data[0].Segments.map((segment) => {
        /*Gets the content and the sentiment of a message sent by a customer or agent*/
        const transcripcion = {
          id: uuidv4(),
          descripcion: segment.Transcript.Content,
          sentiment: segment.Transcript.Sentiment,
          rol: segment.Transcript.ParticipantRole,
        };
        return transcripcion;
      });
     
      setTranscripcion(arrNuevo);
    } catch (error) {}
  }, [url, setSentimiento, contactId]);

  /*Fetch transcription data when component mounts*/
  useEffect(() => {
    const interval = setInterval(descargar, 4000); // Descargar cada 5 segundos
    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [descargar]);

  const handleInnerClick = (e) => {
    e.stopPropagation();
  }

  /*Return the transcription of the conversation*/
  return(
    <div className="ventana-transcripcion-completa" onClick={cancelar}>
      <h1 className="ventana-transcripcion2" onClick={handleInnerClick}>
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