/**
 * @author Ingrid Garcia Hernandez
 * Component that allows to visualize the historical KPI's according to the period chosen by the user.
 * These are shown in line charts dependign of the selection made.
 */
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/historicos.css";
import Seleccion from "./Seleccion";

/* Imports made for the use of the chart.js library*/
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

/**
 * Function that generates the times according to the period selected by the user,
 * it is formed in 15 minute increments.
 */

function generarTiempo(value) {
  const ahora = new Date();
  const metaTiempo = new Date(ahora.getTime() - value * 60 * 1000);

  function tiempoCadaQuinze(inicio, fin) {
    const inicioMin = inicio.getHours() * 60 + inicio.getMinutes();
    const finMin = fin.getHours() * 60 + fin.getMinutes();

    const times = [];
    let minAct = inicioMin;

    while (minAct <= finMin) {
      /*Gets the hours and minutes of the current time and with the more adequate format */
      const horas = Math.floor(minAct / 60);
      const minutos = minAct % 60;
      const formattedTime = `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}`;
      times.push(formattedTime);

      /* It adds the 15 minutes in each iteration*/
      minAct += 15;
    }

    return times;
  }

  let prueba = tiempoCadaQuinze(metaTiempo, ahora);
  return prueba.reverse();
}

/**
 * Component that allows to visualize the historical KPI's according to the period chosen by the user.
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Function that given the specific data of each KPI,
 * creates line charts with the data given, as wells as the color.
 */
function createChartData(jsonData, labelName, valor, color, labelsT) {
  const labels = labelsT.slice(0, valor);
  const data = jsonData;
  return {
    labels,
    datasets: [
      {
        label: labelName,
        data,
        borderColor: color,
        backgroundColor: "rgba(15, 15, 15, 0.5)",
        color: "rgba(15, 15, 15)",
      },
    ],
  };
}

/*
 * It specifies the elements of the graph, such as the position of the legend and the responsiveness of the graph.
 */
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const TitleF = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const TitleH = styled.h2`
  font-size: 200%;
  font-weight: 600;
`;

const Historicos = () => {
  const valRef = useRef(null);

  const [timeLabels, setTimeLabels] = useState(generarTiempo(15));
  const [valorBus, setValorBus] = useState(2);
  const [infoAbandono, setInfoAbandono] = useState();
  const [infoNivel, setInfoNivel] = useState();
  const [infoV, setInfoV] = useState();
  const [infoOc, setInfoOc] = useState();
  const [infoTiempo, setInfoTiempo] = useState();

  const dataAbandono = createChartData(
    infoAbandono,
    "Abandonment rate percentage",
    valorBus,
    "rgb(249, 37, 37)",
    timeLabels
  );
  const dataNivel = createChartData(
    infoNivel,
    "Service level percentage",
    valorBus,
    "rgb(194, 226, 141)",
    timeLabels
  );
  const dataVelocidad = createChartData(
    infoV,
    "Customer hold time (sec)",
    valorBus,
    "rgb(54, 162, 235)",
    timeLabels
  );
  const dataOcupacion = createChartData(
    infoOc,
    "Occupancy percentage",
    valorBus,
    "rgb(153, 102, 255)",
    timeLabels
  );
  const dataTiempo = createChartData(
    infoTiempo,
    "Contact duration (min)",
    valorBus,
    "rgb(75, 192, 149)",
    timeLabels
  );

  /**
   * useEffect hook that allows to update the KPI's historical data according to the period selected by the user.
   */
  const kpisHistoricos = async (value) => {
    try {
      /**
       * For each KPI, a request is made to the server to obtain the data corresponding to the selected date.
       * Since each one will return the same amount of data, the amount of data is assigned to the variable valorBus
       * so that the same amount of data can be displayed in all the graphs.
       */
      const resAbandono = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/consultaAbandono/?start=${value}`
      );
      const dataAbandono = await resAbandono.json();

      /**
       * It gets the abandonment values and the date of each of the data obtained.
       */
      const valAbandono = dataAbandono.map((el) => el[0]);
      const fecha = dataAbandono.map((el) => el[2]);

      const cantidadDatos = valAbandono.length;
      /**
       * With each set of data obtained, the data is reversed so that the most recent data is displayed first.
       * The data is assigned to the corresponding state.
       */
      setInfoAbandono(valAbandono.reverse());
      setValorBus(cantidadDatos);
      setTimeLabels(fecha.reverse());

      /**
       * Data obtained from the service level
       */
      const resNivel = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/consultaServicio/?start=${value}`
      );
      const dataNivel = await resNivel.json();
      const valNivel = dataNivel.map((el) => el[0]);
      setInfoNivel(valNivel.reverse());

      /**
       * Data obtained from the occupancy
       */
      const resOc = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/consultaOcupacion/?start=${value}`
      );
      const dataOc = await resOc.json();
      const valOc = dataOc.map((el) => el[0]);
      setInfoOc(valOc.reverse());

      /**
       * Data obtained from the contact duration
       */
      const resTiempo = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/consultaTiempo/?start=${value}`
      );
      const dataTiempo = await resTiempo.json();
      const valTiempo = dataTiempo.map((el) => el[0]);
      setInfoTiempo(valTiempo.reverse());

      /**
       * Data obtained from the customer hold time
       */
      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/consultaEspera/?start=${value}`
      );
      const data = await res.json();
      const valVel = data.map((el) => el[0]);
      setInfoV(valVel.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * useEffect hook that allows to update the KPI's historical data according to the period, of minutes, selected by the user,
   * the default value is 15 minutes.
   */
  const kpisMinutos = async (value) => {
    try {
      /*
       * The lavels are assigned according to the period selected by the user
       * using the HH:MM format, more suitable for the visualization of the graphs.
       */
      setTimeLabels(generarTiempo(value));

      const resAbandono = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/abandonoMn/?cantidad=${value}`
      );
      const dataAbandono = await resAbandono.json();
      const valAbandono = dataAbandono.map((el) => el[0]);
      const cantidadDatos = valAbandono.length;
      setValorBus(cantidadDatos);
      setInfoAbandono(valAbandono.reverse());

      const resNivel = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/servicioMn/?cantidad=${value}`
      );
      const dataNivel = await resNivel.json();
      const valNivel = dataNivel.map((el) => el[0]);
      setInfoNivel(valNivel.reverse());

      const resOc = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/ocupacionMn/?cantidad=${value}`
      );
      const dataOc = await resOc.json();
      const valOc = dataOc.map((el) => el[0]);
      setInfoOc(valOc.reverse());

      const resTiempo = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/tiempoMn/?cantidad=${value}`
      );
      const dataTiempo = await resTiempo.json();
      const valTiempo = dataTiempo.map((el) => el[0]);
      setInfoTiempo(valTiempo.reverse());

      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL ? process.env.REACT_APP_FETCH_URL : 'http://localhost:8080'}/historico/esperaMn/?cantidad=${value}`
      );
      const data = await res.json();
      const valVel = data.map((el) => el[0]);
      setInfoV(valVel.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * The useEffect hook is used to call the function that obtains the historical KPI's of the last 15 minutes from
   * the moment the component is rendered.
   */
  useEffect(() => {
    kpisMinutos(15);
  }, []);

  /*
   * It is a function that is executed when the user selects a period of time,
   */
  const handlerCambio = (value) => {
    if (value > 0 && value <= 480) {
      kpisMinutos(value);
    } else {
      kpisHistoricos(value);
    }
  };

  return (
    <div className="historico">
      <TitleH>Historical KPI</TitleH>
      <Seleccion ref={valRef} onInputChange={handlerCambio} id="vlRes" />
      <div className="row">
        <div className="cards-wrapper">
          <TitleF>Abandonment rate</TitleF>
          <Line options={options} data={dataAbandono} />
        </div>

        <div className="cards-wrapper">
          <TitleF>Service level</TitleF>
          <Line options={options} data={dataNivel} />
        </div>
      </div>

      <div className="row">
        <div className="cards-wrapper">
          <TitleF>Occupancy</TitleF>
          <Line options={options} data={dataOcupacion} />
        </div>

        <div className="cards-wrapper">
          <TitleF>Contact duration</TitleF>
          <Line options={options} data={dataTiempo} />
        </div>
      </div>

      <div className="row">
        <div className="cards-wrapper">
          <TitleF>Customer hold time</TitleF>
          <Line options={options} data={dataVelocidad} />
        </div>
      </div>
    </div>
  );
};

export default Historicos;
