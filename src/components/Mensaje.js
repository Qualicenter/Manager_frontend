import { IoPersonSharp } from "react-icons/io5";
import '../styles/mensaje.css';

const Mensaje = ({ mensaje, sender }) => {
    return (
        <div className="mensaje">
            <IoPersonSharp />
            <div>
                <p className="sender">{sender}</p>
                <p className="messageText">{mensaje}</p>
            </div>
        </div>
    )
}

export default Mensaje;