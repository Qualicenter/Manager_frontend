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
                    <li>Nombre: Juán Pérez</li>
                    <li>Género: M</li>
                    <li>Póliza: 6846135468</li>
                    <li>Tipo cliente: Regular</li>
                </ul>
            </div>
            <div className="botones-detalle-mensaje"><button>Responder</button><button>Transcripción</button></div>
            <div><button onClick={cerrar}>Cerrar</button></div>
        </div>
    )
};

export default DetallesMensaje;