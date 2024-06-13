/**
* @autor: Gerardo Rios Mejía
* Code where the "Comentario" component is handled
 */

import React, { useState } from 'react';

function Comentario({ onSubmit }) {
  const [comentario, setComentario] = useState('');
  const [comentarioValido, setComentarioValido] = useState(false);

  /**function that updates the comment status and indicates if the comment is not empty*/
  const handleChangeComentario = (event) => {
    const comentarioText = event.target.value;
    setComentario(comentarioText);
    setComentarioValido(comentarioText.trim() !== ''); 
  };

  /**function that checks if the comment is valid and resets the comment state and its validation*/
  const handleSubmit = () => {
    if (!comentarioValido) {
      return 
    }

    onSubmit(comentario);
    setComentario('');
    setComentarioValido(false);
  };

  /**Return of the layout where the manager will write the comments*/
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