import '../styles/datosAgente.css';

const Datos = ({agente}) => {

return (
    <div className="containerbox">
        <div className="izqdatos">
            <img src={agente.imagen} alt="Foto" className='foto'/>
        </div>
        <div className="derdatos">
            <p><strong>Nombre:</strong> {agente.nombre}</p>
            <p><strong>Turno:</strong> {agente.turno}</p>
            <p><strong>Llamadas Respondidas:</strong> {agente.llamadasRespondidas}</p>
            <p><strong>Llamadas Abandonadas:</strong> {agente.llamadasAbandonadas}</p>
            <p><strong>Duración Promedio:</strong> {agente.promedio}</p>
            <p><strong>Nivel de Servicio:</strong> {agente.nivelDeServicio}</p>
        </div>
    </div>
);
};

export default Datos;