//Autor: Gerardo Rios Mejía
//Código donde se maneja el componente de comentarios

import preguntas from './Preguntas'; // obtener el titulo y los estados de las opciones
import '../styles/encuesta.css';
import { useState, useEffect } from 'react';
import Comentario from './Comentario';// obtener el componente para su funcionalidad

function Encuesta() {
  const [preguntaActual, setPreguntaActual] = useState(0);//Seguir la pregunta en la que se encuentra
  const [puntuacion, setPuntuacion] = useState(0);//manteenr la puntuación hasta que acabe la encuesta
  const [fin, setFin] = useState(false);// se indica cuando la encuesta termino
  const [puntajesYcomentarios, setPuntajesYcomentarios] = useState([]);//almacenar la puntuación
  const [mostrarComentario, setMostrarComentario] = useState(false);//mostrar el comentario del formulario
  const [mostrarPregunta, setMostrarPregunta] = useState(true);//mostrar la pregunta del formulario
  const [puntajesAcumulados, setPuntajesAcumulados] = useState([]);//guaradar el total del putaje
  // variables para cambiar el entorno del servidor
  const lugar = "localhost";
  const puerto = "8080";

  //función para manejar la puntuación basada en las respuestas
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

  //función para manejar el envio de comentarios, puntuación y control de las preguntas
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

  //al terminar la encuesta se calcula el puntaje, se acumulan los comentarios y se envian a la base de datos
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
