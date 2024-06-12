/**
 * @author Aldehil Sánchez
 * Component that shows the notification center, with messages received,
 * of the application.
 */

import { useState } from "react";
import "../styles/centro-notif.css";
import Mensaje from "./Mensaje";
import DetallesMensaje from "./DetallesMensaje";

const CentroNotif = (props) => {
  const { cancelar, notificaciones, funcShowTranscript } = props;
  const [showDetallesMensaje, setDetallesMensaje] = useState(false);
  const [idMensajeSeleccionado, setIdMensajeSeleccionado] = useState();

  // Function to close the notification center
  const onclikHandlerdivexterno = (e) => {
    cancelar();
  };

  // Function to avoid closing the notification center when clicking on the internal div
  const onClickHandlerdivinterno = (e) => {
    e.stopPropagation();
  };

  // Function to show the details of a message
  const handleMensajeClick = (mensajeSeleccionado) => {
    setDetallesMensaje(!showDetallesMensaje);
    setIdMensajeSeleccionado(mensajeSeleccionado);
  };

  return (
    <div className="div-exterior-notif" onClick={onclikHandlerdivexterno}>
      <div className="div-interno-notif" onClick={onClickHandlerdivinterno}>
        <h1>Notification center</h1>
        <ul className="lista-mensajes">
          {notificaciones.map((notificacion) => {
            const mensaje = notificacion.Message
              ? notificacion.Message
              : "Test message";
            return (
              <li
                key={notificacion.id}
                onClick={() => handleMensajeClick(notificacion)}
              >
                <Mensaje
                  mensaje={mensaje}
                  sender={notificacion.Sender}
                ></Mensaje>
              </li>
            );
          })}
        </ul>
        {showDetallesMensaje ? (
          <DetallesMensaje
            mensaje={idMensajeSeleccionado}
            cerrar={handleMensajeClick}
            funcShowTranscript={funcShowTranscript}
            closeAll={cancelar}
          />
        ) : (
          <div />
        )}
        <button onClick={cancelar}>Close</button>
      </div>
    </div>
  );
};

export default CentroNotif;
