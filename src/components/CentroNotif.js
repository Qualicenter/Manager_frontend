import "../styles/centro-notif.css";
import Mensaje from "./Mensaje";

const CentroNotif = (props) => {
    const { cancelar, notificaciones } = props;

    const onclikHandlerdivexterno = (e) => {
        cancelar();
    }

    const onClickHandlerdivinterno = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="div-exterior-notif" onClick={onclikHandlerdivexterno}>
            <div className="div-interno-notif" onClick={onClickHandlerdivinterno}>
                <h1>Centro de notificaciones</h1>
                <ul className="lista-mensajes">
                    {notificaciones.map((notificacion) => {
                        const mensaje = notificacion.Message ? notificacion.Message : "Mensaje de prueba";
                        return (
                            <li key={notificacion.id}>
                                <Mensaje mensaje={mensaje} sender={notificacion.Sender}></Mensaje>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={cancelar}>Cerrar</button>
            </div>
        </div>
    )
};

export default CentroNotif;