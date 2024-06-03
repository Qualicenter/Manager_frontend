import preguntas from './Preguntas'; // obtener el titulo y los estados de las opciones
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
  const puerto = "8085";

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

  function handleComentarioSubmit(comentario) {
    const nuevaEntrada = {
      username: localStorage.getItem('Username'),
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

  useEffect(() => {
    if (fin) {
      const puntajeTotalAcumulado = puntajesAcumulados.reduce((total, puntaje) => total + puntaje, 0);
      const username = localStorage.getItem('Username');
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
          const enviarC = await fetch("http://" + lugar + ":" + puerto + "/EncuestaModel/postEncuestaPipeline", enviar);
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
  }, [fin]);

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
