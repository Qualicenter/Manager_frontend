import { IoPersonSharp } from "react-icons/io5";
import '../styles/detalles-mensaje.css';
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const DetallesMensaje = ({ mensaje, cerrar, funcShowTranscript, closeAll}) => {
    const [message, setMessage] = useState("");

    const buttonTranscriptHandler = () => {
        funcShowTranscript();
        closeAll();
    }

    const messageHandler = (e) => {
        setMessage(e.target.value)
        console.log(message)
    }

    const enviarMensaje = async () => {
        await fetch("http://localhost:8080/messages/createMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Message: message.toString(),
                Sender: "supervisor",
                Receiver: mensaje.Sender,
            }),
        }).then((response) => {
            if (response.ok) {
                console.log("Mensaje enviado");
                alert("Mensaje enviado correctamente");
            }
        }).catch((error) => {
            alert("Error al enviar mensaje");
            console.log("Error al enviar mensaje: " + error);
        });
        console.log(message)
        closeAll()
    }

    return (
        <div className="detalles-mensaje">
            <h1>Detalles del mensaje:{mensaje.Sender}</h1>
            <p>{mensaje.Message ? mensaje.Message : "Mensaje de prueba"}</p>
            <h2>Datos del cliente</h2>
            <div className="datos-cliente-detalles-mensaje">
                <IoPersonSharp className="imagen-cliente-detalles" />
                <ul>
                    <li>Nombre: {mensaje.nombreCliente ? mensaje.nombreCliente : "No especificado"}</li>
                    <li>Género: {mensaje.generoCliente ? mensaje.generoCliente : "No especificado"}</li>
                    <li>Póliza: {mensaje.polizaCliente ? mensaje.polizaCliente : "00000"}</li>
                    <li>Tipo cliente: {mensaje.tipoCliente ? mensaje.tipoCliente : "No especificado"}</li>
                </ul>
            </div>
            <div className="botones-detalle-mensaje">
                <div className="form-mensaje">
                    <div>
                        <label htmlFor="message">Responder mensaje:</label>
                        <textarea type="text" id="message" onChange={messageHandler}></textarea>
                    </div>
                    <button onClick={enviarMensaje}><IoMdSend /></button>
                </div>
                <button onClick={buttonTranscriptHandler}>Transcripción</button>
            </div>
            <div><button onClick={cerrar}>Cerrar Detalles</button></div>
        </div>
    )
};

export default DetallesMensaje;