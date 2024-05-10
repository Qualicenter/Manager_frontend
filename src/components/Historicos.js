import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import "../styles/historicos.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Seleccion from "./Seleccion";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Historicos = () => {

    const abandonoVal = useRef(null); 
    const servicioVal = useRef(null);
    const velocidadVal = useRef(null);
    const ocupacionVal = useRef(null);
    const tiempoLlamadaVal = useRef(null);
    const resolucionVal = useRef(null);



    const handleInputChange = (value) => {
        console.log("Selected value changed:", value);
    };



  return (
    <div className="historico">
      <div className="row">
        <div className="cards-wrapper">
          <Title>Abandono</Title>
          <Doughnut data={data} />
          <Seleccion ref = {abandonoVal} onInputChange={handleInputChange} id="Abandono"/>
        </div>

        <div className="cards-wrapper">
          <Title>Nivel de servico</Title>
          <Doughnut data={data} />
            <Seleccion ref = {servicioVal} onInputChange={handleInputChange} id="nvlServico"/>
        </div>
      </div>


      <div className="row">
        <div className="cards-wrapper">
          <Title>Velocidad media de respuesta</Title>
          <Doughnut data={data} />
          <Seleccion ref = {velocidadVal} onInputChange={handleInputChange} id="vlRes" />
        </div>
        <div className="cards-wrapper">
          <Title>Ocupacion</Title>
          <Doughnut data={data} />
          <Seleccion ref = {ocupacionVal} onInputChange={handleInputChange} id="Ocupacion" />
        </div>
      </div>


      <div className="row">
        <div className="cards-wrapper">
          <Title>Tiempo promedio de llamada</Title>
          <Doughnut data={data} />
          <Seleccion ref = {tiempoLlamadaVal} onInputChange={handleInputChange} id="tiempoLlamada"/>
        </div>
        <div className="cards-wrapper">
          <Title>Resolución al primer contacto</Title>
          <Doughnut data={data} />
          <Seleccion ref = {resolucionVal} onInputChange={handleInputChange} id="Resolucion"/>
        </div>
      </div>
    </div>
  );
};

export default Historicos;







    

    // const vlResInputRef = useRef(null);


    // console.log("Velocidad media de respuesta value:", vlResInputRef.current?.value);
  
    // const handleGetVlResValue = () => {
    //   if (vlResInputRef.current) {
    //     const fechaValue = vlResInputRef.current.value;
    //     console.log("Velocidad media de respuesta value:", fechaValue);
    //     // Perform actions on the value, e.g., send to server
    //   }
    // };



    // const vlResInputRef = useRef(null);
    // const ocupacionInputRef = useRef(null);
  
    // const handleGetVlResValue = () => {
    //     console.log("Velocidad media de respuesta value:", vlResInputRef.current.value);
    //     if (vlResInputRef.current) {
    //       const fechaValue = vlResInputRef.current.value;
    //       console.log("Velocidad media de respuesta value:", fechaValue);
    //       // Perform actions on the value, e.g., send to server
    //     }
    //   };
    // useEffect(() => {
    //     if (vlResInputRef.current) {
    //       const fechaValue = vlResInputRef.current.value;
    //       console.log("Velocidad media de respuesta value:", fechaValue);
    //     }
    //   }, [vlResInputRef]); // Run only when ref changes

      
    // const handleGetVlResValue = () => {

    // };

    // const handleGetOcupacionValue = () => {
    //   if (ocupacionInputRef.current) {
    //     const selectedValue = ocupacionInputRef.current.value;
    //     console.log("Ocupacion value:", selectedValue);
    //     // Perform actions on the value, e.g., send to server
    //   }
    // };
//   const [btnDiario, setBtnDiario] = useState(true);
//   const [btnFecha, setBtnFecha] = useState(true);
//   const [inDiario, setInDiario] = useState(false);
//   const [inFecha, setInFecha] = useState(false);

//   const [btnRegresar, setBtnRegresar] = useState(true);

//   const handlerVerDiario = () => {
//     setBtnDiario(!btnDiario);
//     setInDiario(!inDiario);
//     setBtnFecha(false);
//     setInFecha(false);
//   };

//   const handlerVerFecha = () => {
//     setBtnFecha(!btnFecha);
//     setInFecha(!inFecha);
//     setBtnDiario(false);
//     setInDiario(false);
//   };

//   const handlerRegresar = () => {
//     setBtnDiario(true);
//     setInDiario(false);
//     setBtnFecha(true);
//     setInFecha(false);
//   }


          {/* <button
            className="btnSeleccion"
            onClick={handlerVerFecha}
            style={{ display: btnFecha ? "flex" : "none" }}
          >
            Fecha
          </button>
          <input
            className="fecha"
            style={{ display: inFecha ? "flex" : "none" }}
            type="date"
            max={new Date().toISOString().split("T")[0]}
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
          <select name="dia" style={{ display: inDiario ? "flex" : "none" }}>
            <option value="15" selected>15 minutos</option>
            <option value="30">
              30 minutos
            </option>
            <option value="60">1 hora</option>
            <option value="120">2 hora</option>
            <option value="240">4 hora</option>
          </select> */}


              // const selectedValueRef = useRef(null);
    // useEffect(() => {
    //   if (selectedValueRef.current) {
    //     const selectedValue = selectedValueRef.current.value;
    //     console.log("Selected value:", selectedValue);
    //   }
    // }, [selectedValueRef]); // Run only when ref changes
