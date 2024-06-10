//Autor: Gerardo Rios Mejía
//Código donde se desarrolla la funcion de los comentarios

import React, { useState } from 'react';

function Comentario({ onSubmit }) {
  const [comentario, setComentario] = useState('');//Se almacena el texto del comentario
  const [comentarioValido, setComentarioValido] = useState(false); // indica si el comentario es válido

  //función que actualiza el estado de comentario e indica si el comentario no esta vacío
  const handleChangeComentario = (event) => {
    const comentarioText = event.target.value;
    setComentario(comentarioText);
    setComentarioValido(comentarioText.trim() !== ''); 
  };

  //función que verifica si el comentario es valído y reinicia el estado del comentario y su validación
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