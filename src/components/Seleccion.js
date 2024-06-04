/**
 * Autor: Ingrid García 
 * Componente que permite seleccionar el tipo de busqueda que se desea realizar, ya sea por fecha o por minutos 
 * u horas del mismo día.
 */
import React, { useState, useRef, forwardRef } from "react";
import "../styles/seleccion.css";

/**
 * Se indica que el componente es un forwardRef para poder acceder a los valores de los inputs
 */
const Seleccion = forwardRef((props, ref) => {

  /**
   * Se crean los estados para controlar la visibilidad de los botones y los inputs
   */

  const [btnDiario, setBtnDiario] = useState(true);
  const [btnFecha, setBtnFecha] = useState(true);
  const [btnRgresar, setBtnRgresar] = useState(false);
  const [inDiario, setInDiario] = useState(false);
  const [inFecha, setInFecha] = useState(false);

  /**
   * Se obtiene la fecha actual y se consideran las 6 horas de diferencia para que la fecha sea la correcta
   */
  const hoy = new Date(new Date().getTime() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];

  /**
   * Se crean los ref para los inputs de fecha y diario
   */
  const fechaInputRef = useRef();
  const diarioInputRef = useRef();

  /**
   * Obtiene el vlalor del input seleccionado
   */
  const getValor = () => {
    if (inFecha) {
      return fechaInputRef.current.value;
    } else if (inDiario) {
      return diarioInputRef.current.value;
    } else {
      return null; 
    }
  };


/**
 * Obtiene la fecha minima que se puede seleccionar en el input de fecha, que 
 * debe de ser 60 días antes de la fecha actual.
 */
  const getMinDate = () => {
    const hoy = new Date(new Date().getTime() - 6 * 60 * 60 * 1000);
    const sesentaDias = new Date(hoy.getTime() - (60 * 24 * 60 * 60 * 1000));
    return sesentaDias.toISOString().split("T")[0]; 
  };

  /**
   * Obtiene el valor del input seleccionado y lo envía al componente padre
   */
  const handleInputChange = (event) => {
    if (props.onInputChange) {
      props.onInputChange(getValor()); 
    }
  };

  /*
   * Funciones que controlan la visibilidad de los botones e inputs
   */
  const handlerVerDiario = () => {
    setBtnDiario(!btnDiario);
    setInDiario(!inDiario);
    setBtnRgresar(true);
    setBtnFecha(false);
    setInFecha(false);
  };

  const handlerVerFecha = () => {
    setBtnFecha(!btnFecha);
    setInFecha(!inFecha);
    setBtnRgresar(true);
    setBtnDiario(false);
    setInDiario(false);
  };

  const handlerRegresar = () => {
    setBtnDiario(true);
    setInDiario(false);
    setBtnFecha(true);
    setInFecha(false);
    setBtnRgresar(false);
  };



  return (
    <div className="btnWrapper">
      <button
        className="btnBusqueda"
        onClick={handlerVerFecha}
        style={{ display: btnFecha ? "flex" : "none" }}
      >
        Date
      </button>
      <input
        className="fecha"
        ref={fechaInputRef}
        onChange={handleInputChange}
        style={{ display: inFecha ? "flex" : "none" }}
        type="date"
        max={hoy}
        min={getMinDate()}
      ></input>

      <button className="btnBusqueda" onClick={handlerRegresar} style={{ display: btnRgresar ? "flex" : "none" }}>
        Return
      </button>

      <button 
        className="btnBusqueda"
        onClick={handlerVerDiario}
        style={{ display: btnFecha ? "flex" : "none" }}
      >
        Daily
      </button>
      <select
      className="diario"
        name="dia"
        ref={diarioInputRef}
        onChange={handleInputChange}
        style={{ display: inDiario ? "flex" : "none" }}
      >
        <option value={15} defaultValue={15}>
          15 minutes
        </option>
        <option value={30}>30 minutes</option>
        <option value={60}>1 hour</option>
        <option value={120}>2 hours</option>
        <option value={240}>4 hours</option>
        <option value={360}>6 hours</option>
        <option value={480}>8 hours</option>
      </select>
    </div>
  );
}
)
export default Seleccion;





