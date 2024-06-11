/**
 * @author Ángel Armando Márquez Curiel
 * @author 
 * @author
 * 
 * Component to display the transcription of the conversation
 */

import "../styles/transcripcion.css";
import '../styles/lista-transcripcion.css'

const Transcripcion = ({ transcripcion }) => {
  
  /*Assigns the sentiment style of a messaage*/
  const estiloTranscripcion =
    "mensaje " +
    (transcripcion.sentiment === "POSITIVE"
      ? "positivo"
      : transcripcion.sentiment === "NEGATIVE"
      ? "negativo"
      : transcripcion.sentiment === "NEUTRAL"
      ? "neutral"
      : "");

  /*Assigns the place of a message*/
  const lugarTranscripcion =
    transcripcion.rol === "AGENT"
      ? "agente"
      : transcripcion.rol === "CUSTOMER"
      ? "cliente"
      : "";

  /*Assigns an emoji to a message depending on its sentiment*/
  let emoji;
  switch (transcripcion.sentiment) {
    case "POSITIVE":
      emoji = "😊";
      break;
    case "NEGATIVE":
      emoji = "😠";
      break;
    case "NEUTRAL":
      emoji = "😐";
      break;
    default:
      emoji = "";
  }
  
  /*Returns all the messages with the style and place assigned*/
  return (
    <div className="ventana-transcripcion">
      <div className={lugarTranscripcion}>
        <div className={estiloTranscripcion}>
          {emoji} {transcripcion.descripcion}
        </div>
      </div>
      
    </div>
    
  );
};

export default Transcripcion;