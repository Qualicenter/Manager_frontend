// Componente que muestra el desempeño de un agente
import "../styles/desAgente.css";

const Desempenio = ({ label, porcentaje, color, obj }) => {
  return (
    <div className="desempenio">
      <p className="label">{label}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${porcentaje}%`, backgroundColor: `${color}`}}>
          {/* Mostrar el texto de porcentaje en el lado derecho de la barra de progreso */}
          {porcentaje >= 0 && porcentaje <= 15 ? (
            <span className="porcentaje-text" style={{ transform: 'translateX(120%)' }}>{porcentaje}%</span>
          ) : (
            <span className="porcentaje-text" style={{zIndex: 1}}>{porcentaje}%</span>
          )}
        </div>
        {obj && (
          <div className="threshold-marker" style={{ left: `${obj}%`, zIndex: 0 }}>
            <span className="threshold-text" title="Objetivo">{obj}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Desempenio;
