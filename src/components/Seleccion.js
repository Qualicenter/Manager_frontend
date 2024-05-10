import React, { useState, useRef, useEffect, forwardRef } from "react";
import styled from "styled-components";
import "../styles/historicos.css";

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Seleccion = forwardRef((props, ref) => {

  const [btnDiario, setBtnDiario] = useState(true);
  const [btnFecha, setBtnFecha] = useState(true);
  const [inDiario, setInDiario] = useState(false);
  const [inFecha, setInFecha] = useState(false);

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
    setBtnFecha(false);
    setInFecha(false);
  };

  const handlerVerFecha = () => {
    setBtnFecha(!btnFecha);
    setInFecha(!inFecha);
    setBtnDiario(false);
    setInDiario(false);
  };

  const handlerRegresar = () => {
    setBtnDiario(true);
    setInDiario(false);
    setBtnFecha(true);
    setInFecha(false);
  };

  return (
    <div className="btnWrapper">
      <button
        className="btnSeleccion"
        onClick={handlerVerFecha}
        style={{ display: btnFecha ? "flex" : "none" }}
      >
        Fecha
      </button>
      <input
        className="fecha"
        ref={fechaInputRef}
        onChange={handleInputChange}
        style={{ display: inFecha ? "flex" : "none" }}
        type="date"
        max={new Date().toISOString().split("T")[0]}
        min={getMinDate()}
      ></input>

      <button className="btnSeleccion" onClick={handlerRegresar}>
        Regresar
      </button>

      <button 
        className="btnSeleccion"
        onClick={handlerVerDiario}
        style={{ display: btnFecha ? "flex" : "none" }}
      >
        Diario
      </button>
      <select
        name="dia"
        ref={diarioInputRef}
        onChange={handleInputChange}
        style={{ display: inDiario ? "flex" : "none" }}
      >
        <option value="15" defaultValue={15}>
          15 minutos
        </option>
        <option value="30">30 minutos</option>
        <option value="60">1 hora</option>
        <option value="120">2 hora</option>
        <option value="240">4 hora</option>
        <option value="360">6 hora</option>
        <option value="480">8 hora</option>
      </select>
    </div>
  );
}
)
export default Seleccion;




// const Seleccion = () => {
//     const [btnDiario, setBtnDiario] = useState(true);
//     const [btnFecha, setBtnFecha] = useState(true);
//     const [inDiario, setInDiario] = useState(false);
//     const [inFecha, setInFecha] = useState(false);

//     const handlerVerDiario = () => {
//       setBtnDiario(!btnDiario);
//       setInDiario(!inDiario);
//       setBtnFecha(false);
//       setInFecha(false);
//     };

//     const handlerVerFecha = () => {
//       setBtnFecha(!btnFecha);
//       setInFecha(!inFecha);
//       setBtnDiario(false);
//       setInDiario(false);
//     };

//     const handlerRegresar = () => {
//       setBtnDiario(true);
//       setInDiario(false);
//       setBtnFecha(true);
//       setInFecha(false);
//     };

//     return (
//       <div className="btnWrapper">
//         <button
//           className="btnSeleccion"
//           onClick={handlerVerFecha}
//           style={{ display: btnFecha ? "flex" : "none" }}
//         >
//           Fecha
//         </button>
//         <input
//           className="fecha"
//           style={{ display: inFecha ? "flex" : "none" }}
//           type="date"
//           max={new Date().toISOString().split("T")[0]}
//         />

//         <button className="btnSeleccion" onClick={handlerRegresar}>
//           Regresar
//         </button>

//         <button
//           className="btnSeleccion"
//           onClick={handlerVerDiario}
//           style={{ display: btnFecha ? "flex" : "none" }}
//         >
//           Diario
//         </button>
//         <select name="dia"  style={{ display: inDiario ? "flex" : "none" }}>
//           <option value="15" defaultValue={15}>15 minutos</option>
//           <option value="30">
//             30 minutos
//           </option>
//           <option value="60">1 hora</option>
//           <option value="120">2 hora</option>
//           <option value="240">4 hora</option>
//         </select>
//       </div>
//     );
//   };

//   export default Seleccion;
//   const [btnRegresar, setBtnRegresar] = useState(true);
// const fechaInputRef = useRef();
// const diarioInputRef = useRef();

// const handleChange = (event) => {
//     setValReg(event.target.value);
//     if (props.onInputChange) {
//       props.onInputChange(); // Trigger parent function
//     }
// };

// const getInputValue = () => {
//     if (inFecha) {
//         console.log(fechaInputRef.current.value);
//         setValReg(fechaInputRef.current.value);
//       return fechaInputRef.current.value;
//     } else if (inDiario) {
//         console.log(diarioInputRef.current.value);
//         setValReg(diarioInputRef.current.value);
//       return diarioInputRef.current.value;
//     } else {
//       return null; // Or any default value
//     }
//   };

//   const [valReg, setValReg] = useState("");
