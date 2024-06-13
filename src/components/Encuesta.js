/**
* @autor: Gerardo Rios Mejía
* Code where the "Encuesta" component is handled
 */

import preguntas from './Preguntas'; 
import '../styles/encuesta.css';
import { useState, useEffect } from 'react';
import Comentario from './Comentario';

function Encuesta() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [fin, setFin] = useState(false);
  const [puntajesYcomentarios, setPuntajesYcomentarios] = useState([]);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [mostrarPregunta, setMostrarPregunta] = useState(true);
  const [puntajesAcumulados, setPuntajesAcumulados] = useState([]);

  const lugar = "localhost";
  const puerto = "8080";

  /**Function to handle scoring based on answers*/
  function handlePuntuacion(isVerdad, isPart, isFalso) {
    if (isVerdad) {
      setPuntuacion(puntuacion + 1);
      setMostrarPregunta(false);
      setMostrarComentario(true);
    } else if (isPart) {
      setPuntuacion(puntuacion + 0.5);
      setMostrarPregunta(false);
      setMostrarComentario(true);
    } else if (isFalso) {
      setPuntuacion(puntuacion + 0);
      setMostrarPregunta(false);
      setMostrarComentario(true);
    }
  }

  /**Function to manage how to send comments, scoring and control of questions*/
  function handleComentarioSubmit(comentario) {
    const nuevaEntrada = {
      username: localStorage.getItem('username'),
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

  /**At the end of the survey, the score is calculated, the comments are accumumulated and sen to the database*/
  useEffect(() => {
    if (fin) {
      const puntajeTotalAcumulado = puntajesAcumulados.reduce((total, puntaje) => total + puntaje, 0);
      const username = localStorage.getItem('username');
      const comentarios = puntajesYcomentarios.map(entrada => entrada.comentario);

      const resultadosEncuestaJSON = JSON.stringify({
        username: username,
        score: puntajeTotalAcumulado,
        comment: comentarios
      }, null, 2);

      const enviardatos = async (resultadosEncuestaJSON) => {
        const enviar = {
          method: 'POST',
          body: resultadosEncuestaJSON,
          headers: {
            'Content-Type': 'application/json'
          }
        };

        try {
          const enviarC = await fetch("http://" + lugar + ":" + puerto + "/EncuestaModel/postEncuesta", enviar);
          if (!enviarC.ok) {
            const text = await enviarC.text();
            console.log("Error en la respuesta del servidor", enviarC.status, enviarC.statusText, text);
            return;
          }
        } catch (error) {
          console.log('error');
        }
      };
      enviardatos(resultadosEncuestaJSON);
    }
  }, [fin, puntajesAcumulados, puntajesYcomentarios]);

  /**Return of the component "Encuesta" at the end of the survey */
  if (fin) {
    return (
      <div className='Encuesta'>
        <div className='finEncuesta'>
          <span className='letrero'>
            SURVEY COMPLETED
          </span>
          <button className="env" onClick={() => (window.location.href = "/agentes")}>Submit</button>
        </div>
      </div>
    );
  }

  /**Return of the layout where the manager will write the survey*/
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
          <button className="btn" key={respuesta.textoRespuesta}
            onClick={() => handlePuntuacion(respuesta.isVerdad, respuesta.isPart, respuesta.isFalso)}
            style={{ display: mostrarPregunta ? 'block' : 'none' }}> {respuesta.textoRespuesta}
          </button>
        ))}
      </div>

      {mostrarComentario && <Comentario onSubmit={handleComentarioSubmit} />}
    </div>
  );
}

export default Encuesta;
