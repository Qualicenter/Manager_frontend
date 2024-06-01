import React, { useState } from 'react';
import '../styles/historialLlamadas.css';
import { FaSortDown, FaSortUp } from "react-icons/fa";

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

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const ordenarLlamadas = llamadas.sort((a, b) => {
    if (sortBy === 'hora') {
      return sortOrder === 'asc' ? a.hora.localeCompare(b.hora) : b.hora.localeCompare(a.hora);
    } else if (sortBy === 'duracion') {
      return sortOrder === 'asc' ? parseInt(a.duracion) - parseInt(b.duracion) : parseInt(b.duracion) - parseInt(a.duracion);
    } else {
      return 0;
    }
  });

  return (
    <div className="historial">
      <h3 className="titulo">Llamadas Respondidas</h3>
      <table>
        <thead>
          <tr>
            <th style={{width: '100px'}} onClick={() => handleSort('hora')}>
              Hora {sortBy === 'hora' && <span className='filtro'>{sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}</span>}
            </th>
            <th>Cliente</th>
            <th style={{width: '110px'}} onClick={() => handleSort('duracion')}>
              Duración {sortBy === 'duracion' && <span className='filtro'> {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}</span>}
            </th>
            <th>Transcripción</th>
          </tr>
        </thead>
        <tbody>
          {ordenarLlamadas.map((llamada, index) => (
            <tr key={index}>
              <td>{llamada.hora}</td>
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