/**
 * @author Ingrid Garcia Hernandez
 * Component that allows to select the type of search to be performed, either by date or by minutes
 * or hours of the same day.
 */

import React, { useState, useRef, forwardRef } from "react";
import "../styles/seleccion.css";

/**
 * Component that allows to select the type of search to be performed, either by date or by minutes.
 */
const Seleccion = forwardRef((props, ref) => {

  /**
   * It creates the states to control the visibility of the buttons and the inputs
   */

  const [btnDiario, setBtnDiario] = useState(true);
  const [btnFecha, setBtnFecha] = useState(true);
  const [btnRgresar, setBtnRgresar] = useState(false);
  const [inDiario, setInDiario] = useState(false);
  const [inFecha, setInFecha] = useState(false);

  /**
   * It creates the state to store the current date, 
   */

  const hoy = new Date(new Date().getTime() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];

  /**
   * It creates the references for the inputs
   */
  const fechaInputRef = useRef();
  const diarioInputRef = useRef();

  /**
   * Function that returns the value of the selected input
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
 * Function that returns the minimum date that can be selected
 * 60 days before the current date and formats it correctly
 */
  const getMinDate = () => {
    const hoy = new Date(new Date().getTime() - 6 * 60 * 60 * 1000);
    const sesentaDias = new Date(hoy.getTime() - (60 * 24 * 60 * 60 * 1000));
    return sesentaDias.toISOString().split("T")[0]; 
  };

  /**
   * Function that is executed when the input changes
   */
  const handleInputChange = (event) => {
    if (props.onInputChange) {
      props.onInputChange(getValor()); 
    }
  };

  /*
   * Functions that change the visibility of the buttons and inputs, 
   * depending on the button that is pressed
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





