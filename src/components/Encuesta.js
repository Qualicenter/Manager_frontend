//Autor: Gerardo Rios Mejía
//Código donde se desarrolla toda la funcionalidad principal para califacar a los agentes

import preguntas from './Preguntas';//obtener el titulo y los estados de las opciones
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
  const [puntajesAcumulados, setPuntajesAcumulados] = useState([]);


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

//Verificar porque no sale el comentario
  function handleComentarioSubmit(comentario) {
    
    const nuevaEntrada = {
      puntaje: puntuacion,
      comentario: comentario,
    };
    setPuntajesYcomentarios([...puntajesYcomentarios, nuevaEntrada]);
    setPuntajesAcumulados([...puntajesAcumulados, puntuacion]);
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
    console.log("Question and comments:");
    puntajesYcomentarios.forEach((entrada, index) => {
      console.log(`Question ${index + 1}: Score ${entrada.puntaje}`);
      if (entrada.comentario) {
        console.log(`Comment: ${entrada.comentario}`);
      }
    });

    const puntajeTotalAcumulado = puntajesAcumulados.reduce((total, puntaje) => total + puntaje, 0);
    console.log(`Total score: ${puntajeTotalAcumulado}`);

    const resultadosJSON = JSON.stringify(puntajesYcomentarios.map((entrada, index) =>({
      score: puntajeTotalAcumulado,
      comment: entrada.comentario,
    })), null, 2 );

    console.log(resultadosJSON);

    return (
      <div className='Encuesta'>
        <div className='finEncuesta'>
          <span className='letrero'>
            SURVEY COMPLETED
          </span>
          <button className="env" onClick={() => (window.location.href="/")}>Submit</button>
        </div>
      </div>
    );
  }

  return (
    <div className="Encuesta">
      {mostrarPregunta && (
        <div className="arriba">
          <div className="numero-pregunta">
            <span>Question {preguntaActual + 1} of {preguntas.length} </span>
          </div>
          <div className="titulo-pregunta">{preguntas[preguntaActual].titulo}</div>
        </div>
      )}

      <div className="abajo">
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button key={respuesta.textoRespuesta} 
                  onClick={() => handlePuntuacion(respuesta.isVerdad, respuesta.isPart, respuesta.isFalso)} 
                  style={{ display: mostrarPregunta ? 'block' : 'none' }}> {respuesta.textoRespuesta}
          </button>
        ))}
      </div>

      {mostrarComentario && <Comentario onSubmit={handleComentarioSubmit}/>}
    </div>
  );
}

export default Encuesta;