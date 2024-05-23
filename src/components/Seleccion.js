import React, { useState, useRef, forwardRef } from "react";
import "../styles/seleccion.css";



const Seleccion = forwardRef((props, ref) => {

  const [btnDiario, setBtnDiario] = useState(true);
  const [btnFecha, setBtnFecha] = useState(true);
  const [btnRgresar, setBtnRgresar] = useState(false);

  const [inDiario, setInDiario] = useState(false);
  const [inFecha, setInFecha] = useState(false);
  const maxDate = `${new Date().getUTCFullYear()}-${
    String(new Date().getUTCMonth() + 1).padStart(2, '0')
  }-${new Date().getUTCDate().toString().padStart(2, '0')}`;

  const fechaInputRef = useRef();
  const diarioInputRef = useRef();

  const getInputValue = () => {
    if (inFecha) {
      return fechaInputRef.current.value;
    } else if (inDiario) {
      return diarioInputRef.current.value;
    } else {
      return null; // Or any default value
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const sixtyDaysAgo = new Date(today.getTime() - (60 * 24 * 60 * 60 * 1000));
    // return sixtyDaysAgo;
    return sixtyDaysAgo.toISOString().split("T")[0]; // Get the date part only
  };

  const handleInputChange = (event) => {
    // You can optionally update a state variable here (if needed)
    if (props.onInputChange) {
      props.onInputChange(getInputValue()); // Trigger parent function with current value
    }
  };

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
        max={maxDate}
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
        <option value={2} defaultValue={2}>
          15 minutes
        </option>
        <option value={3}>30 minutes</option>
        <option value={4}>1 hour</option>
        <option value={5}>2 hours</option>
        <option value={6}>4 hours</option>
        <option value={7}>6 hours</option>
        <option value={8}>8 hours</option>
      </select>
    </div>
  );
}
)
export default Seleccion;





