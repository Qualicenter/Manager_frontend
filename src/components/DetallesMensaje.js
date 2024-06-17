/**
 * @author Aldehil Sánchez
 * Component that shows the details of a message, such as the message, the sender and the client's information.
 */

import { IoPersonSharp } from "react-icons/io5";
import "../styles/detalles-mensaje.css";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const DetallesMensaje = ({ mensaje, cerrar, funcShowTranscript, closeAll }) => {
  const [message, setMessage] = useState("");

  // Function to show the transcript of the call reusing the function of the active call component
  const buttonTranscriptHandler = () => {
    funcShowTranscript();
    closeAll();
  };

  // Function to handle the message input
  const messageHandler = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  // Function to send the message
  const enviarMensaje = async () => {
    await fetch(`${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/messages/createMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: message.toString(),
        Sender: "supervisor",
        Receiver: mensaje.Sender,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Mensaje enviado correctamente");
        }
      })
      .catch((error) => {
        alert("Error al enviar mensaje");
      });
    console.log(message);
    closeAll();
  };

  return (
    <div className="detalles-mensaje">
      <h1>Message details:{mensaje.Sender}</h1>
      <p>{mensaje.Message ? mensaje.Message : "Mensaje de prueba"}</p>
      <h2>Client information</h2>
      <div className="datos-cliente-detalles-mensaje">
        <IoPersonSharp className="imagen-cliente-detalles" />
        <ul>
          <li>Name: {mensaje.nombreCliente ? mensaje.nombreCliente : "No especificado"}</li>
          <li>Gender: {mensaje.generoCliente ? mensaje.generoCliente : "No especificado"}</li>
          <li>Policy number: {mensaje.polizaCliente ? mensaje.polizaCliente : "00000"}</li>
          <li>Client type: {mensaje.tipoCliente ? mensaje.tipoCliente : "No especificado"}</li>
        </ul>
      </div>
      <div className="botones-detalle-mensaje">
        <div className="form-mensaje">
          <div>
            <label htmlFor="message">Reply message:</label>
            <textarea
              type="text"
              id="message"
              onChange={messageHandler}
            ></textarea>
          </div>
          <button onClick={enviarMensaje}>
            <IoMdSend />
          </button>
        </div>
        <button onClick={buttonTranscriptHandler}>Transcript</button>
      </div>
      <div>
        <button onClick={cerrar}>Close Details</button>
      </div>
    </div>
  );
};

export default DetallesMensaje;
