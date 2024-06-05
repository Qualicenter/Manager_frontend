import { IoPersonSharp } from "react-icons/io5";
import '../styles/detalles-mensaje.css';

const DetallesMensaje = ({ mensaje, cerrar }) => {
    return (
        <div className="detalles-mensaje">
            <h1>Detalles del mensaje:{mensaje.Sender}</h1>
            <p>{mensaje.Message ? mensaje.Message : "Mensaje de prueba"}</p>
            <h2>Datos del cliente</h2>
            <div className="datos-cliente-detalles-mensaje">
                <IoPersonSharp className="imagen-cliente-detalles" />
                <ul>
                    <li>Nombre: {mensaje.nombreCliente ? mensaje.nombreCliente : "Juán Pérez"}</li>
                    {/* TODO: Poner el genero del cliente */}
                    <li>Género: M</li>
                    <li>Póliza: {mensaje.polizaCliente ? mensaje.polizaCliente : "00000"}</li>
                    <li>Tipo cliente: {mensaje.tipoCliente ? mensaje.tipoCliente : "Regular"}</li>
                </ul>
            </div>
            <div className="botones-detalle-mensaje"><button>Responder</button><button>Transcripción</button></div>
            <div><button onClick={cerrar}>Cerrar</button></div>
        </div>
    )
};

export default DetallesMensaje;