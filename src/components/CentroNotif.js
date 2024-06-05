import { useState } from "react";
import "../styles/centro-notif.css";
import Mensaje from "./Mensaje";
import DetallesMensaje from "./DetallesMensaje";

const CentroNotif = (props) => {
    const { cancelar, notificaciones, funcShowTranscript } = props;
    const [showDetallesMensaje,setDetallesMensaje] = useState(false)
    const [idMensajeSeleccionado, setIdMensajeSeleccionado] = useState()

    const onclikHandlerdivexterno = (e) => {
        cancelar();
    }

    const onClickHandlerdivinterno = (e) => {
        e.stopPropagation();
    }

    const handleMensajeClick = (mensajeSeleccionado) => {
        console.log('Click en el mensaje')
        setDetallesMensaje(!showDetallesMensaje)
        setIdMensajeSeleccionado(mensajeSeleccionado)
    }

    return (
        <div className="div-exterior-notif" onClick={onclikHandlerdivexterno}>
            <div className="div-interno-notif" onClick={onClickHandlerdivinterno}>
                <h1>Centro de notificaciones</h1>
                <ul className="lista-mensajes">
                    {notificaciones.map((notificacion) => {
                        const mensaje = notificacion.Message ? notificacion.Message : "Mensaje de prueba";
                        return (
                            <li key={notificacion.id} onClick={() => handleMensajeClick(notificacion)}>
                                <Mensaje mensaje={mensaje} sender={notificacion.Sender}></Mensaje>
                            </li>
                        )
                    })}
                </ul>
                {showDetallesMensaje ? <DetallesMensaje mensaje={idMensajeSeleccionado} cerrar={handleMensajeClick} funcShowTranscript={funcShowTranscript} closeAll={cancelar}/> : <div/>}
                <button onClick={cancelar}>Cerrar</button>
            </div>
        </div>
    )
};

export default CentroNotif;