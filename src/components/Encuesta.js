import preguntas from './Preguntas';
import '../styles/encuesta.css';
import { useState } from 'react';
import Comentario from './Comentario';

function Encuesta() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [fin, setFin] = useState(false);
  const [puntajesYcomentarios, setPuntajesYcomentarios] = useState([]);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [mostrarPregunta, setMostrarPregunta] = useState(true);


  function handlePuntuacion(isVerdad, isPart, isFalso){
    if (isVerdad){
      setPuntuacion(puntuacion + 1);
      setMostrarPregunta(false);
      setMostrarComentario(true);
    }else if (isPart){
      setPuntuacion(puntuacion + 0.5);
      setMostrarPregunta(false);
      setMostrarComentario(true);
    }else if (isFalso){
      setPuntuacion(puntuacion + 0);
      setMostrarPregunta(false);
      setMostrarComentario(true);
  }
 }

  function handleComentarioSubmit(comentario) {
    if (comentario.trim() === ''){
      alert("El comentario no puede estar vacío.");
      return;
    }
    
    const nuevaEntrada = {
      puntaje: puntuacion,
      comentario: comentario,
    };
    setPuntajesYcomentarios([...puntajesYcomentarios, nuevaEntrada]);
    setMostrarPregunta(true);
    setMostrarComentario(false);
    setPuntuacion(0);

    if (preguntaActual === preguntas.length - 1) {
      setFin(true);
    } else {
      setPreguntaActual(preguntaActual + 1);
    }
  }

  if (fin) {
    console.log("Puntajes y comentarios:");
    puntajesYcomentarios.forEach((entrada, index) => {
      console.log(`Pregunta ${index + 1}: Puntaje ${entrada.puntaje}`);
      if (entrada.comentario) {
        console.log(`Comentario: ${entrada.comentario}`);
      }
    });

    return (
      <div className='Encuesta'>
        <div className='finEncuesta'>
          <span className='letrero'>
            ENCUESTA FINALIZADA
          </span>
          <button className="env" onClick={() => (window.location.href="/agentes")}>Enviar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="Encuesta">
      {mostrarPregunta && (
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span>Pregunta {preguntaActual + 1} de {preguntas.length} </span>
          </div>
          <div className="titulo-pregunta">{preguntas[preguntaActual].titulo}</div>
        </div>
      )}

      <div className="lado-derecho">
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button className='env' key={respuesta.textoRespuesta} onClick={() => handlePuntuacion(respuesta.isVerdad, respuesta.isPart, respuesta.isFalso)} style={{ display: mostrarPregunta ? 'block' : 'none' }}>
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>

      {mostrarComentario && <Comentario onSubmit={handleComentarioSubmit}/>}
    </div>
  );
}

export default Encuesta;