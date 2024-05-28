//Autor: Gerardo Rios Mejía
//Código donde se desarrolla la funcion de los comentarios

import React, { useState } from 'react';

function Comentario({ onSubmit }) {
  const [comentario, setComentario] = useState('');
  const [comentarioValido, setComentarioValido] = useState(false);

  const handleChangeComentario = (event) => {
    const comentarioText = event.target.value;
    setComentario(comentarioText);
    setComentarioValido(comentarioText.trim() !== ''); 
  };

  const handleSubmit = () => {
    if (!comentarioValido) {
      return 
    }

    onSubmit(comentario);
    setComentario('');
    setComentarioValido(false);
  };

  return (
    <div className="seccion-comentario">
      <textarea
        className='comment'
        value={comentario}
        onChange={handleChangeComentario}
        placeholder="Write a comment"
      />
      <button
      className='env' 
      onClick={handleSubmit} disabled={!comentarioValido}>
        Submit comment
      </button>
    </div>
  );
}

export default Comentario;