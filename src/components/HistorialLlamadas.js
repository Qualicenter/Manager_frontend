import React, { useState } from 'react';
import '../styles/historialLlamadas.css';

const Historial = (props) => {
  const { llamadas } = props;
  const [popupVisible, setPopupVisible] = useState(false);
  const [transcripcionActual, setTranscripcionActual] = useState('');

  const abrirTranscripcion = (transcripcion) => {
    setTranscripcionActual(transcripcion);
    setPopupVisible(true);
  };

  const cerrarTranscripcion = () => {
    setPopupVisible(false);
  };

  return (
    <div className="historial">
      <h3>Llamadas Respondidas</h3>
      <table>
        <thead>
          <tr>
            <th>Caso ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Duración</th>
            <th>Transcripción</th>
          </tr>
        </thead>
        <tbody>
          {llamadas.map((llamada, index) => (
            <tr key={index}>
              <td>{llamada.casoId}</td>
              <td>{llamada.fecha}</td>
              <td>{llamada.cliente}</td>
              <td>{llamada.duracion}</td>
              <td><button onClick={() => abrirTranscripcion(llamada.transcripcion)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {popupVisible && (
        <div className="popup">
          <button onClick={cerrarTranscripcion}>Cerrar</button>
          <p>{transcripcionActual}</p>
        </div>
      )}
    </div>
  );
};

export default Historial;