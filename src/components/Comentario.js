import React, { useState } from 'react';

function Comentario({ onSubmit }) {
  const [comentario, setComentario] = useState('');
  const [comentarioValido, setComentarioValido] = useState(false);

  const handleChangeComentario = (event) => {
    const comentarioText = event.target.value;
    setComentario(comentarioText);
    setComentarioValido(comentarioText.trim() !== ''); // Verificar si el comentario no está vacío
  };

  const handleSubmit = () => {
    if (!comentarioValido) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    onSubmit(comentario);
    setComentario('');
    setComentarioValido(false);
  };

  return (
    <div className="seccion-comentario">
      <textarea
        value={comentario}
        onChange={handleChangeComentario}
        placeholder="Comentario"
      />
      <button onClick={handleSubmit} disabled={!comentarioValido}>Enviar comentario</button>
    </div>
  );
}

export default Comentario;