/*
Autor: Ingrid Garcia 
Componente que permite visualizar los KPI's historicos de acuerdo al periodo elegido por el usuario.
Estos se muestran en gráficos de líneas.  
 */
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/historicos.css";
import Seleccion from "./Seleccion";

/*
Elementos necesarios para la creación de los gráficos de líneas
 */
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

/*
Función que genera los tiempos de acuerdo al periodo seleccionado por el usuario
en incrementos de 15 minutos
*/
function generarTiempo(value) {
  const ahora = new Date();
  const metaTiempo = new Date(ahora.getTime() - value * 60 * 1000);

  function tiempoCadaQuinze(inicio, fin) {
    // Convert times to minutes past midnight
    const inicioMin = inicio.getHours() * 60 + inicio.getMinutes();
    const finMin = fin.getHours() * 60 + fin.getMinutes();

    const times = [];
    let minAct = inicioMin;

    while (minAct <= finMin) {
      /**
       * Se obtiene la hora y los minutos de acuerdo a los minutos actuales
       */
      const horas = Math.floor(minAct / 60);
      const minutos = minAct % 60;
      const formattedTime = `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}`;
      times.push(formattedTime);

      /*
      Se agregan los 15 minutos a la hora actual para obtener el siguiente tiempo
       */
      minAct += 15;
    }

    return times;
  }

  let prueba = tiempoCadaQuinze(metaTiempo, ahora);
  return prueba.reverse();
}

/*
 * Componente que permite visualizar los KPI's historicos de acuerdo al periodo elegido por el usuario.
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
 * Función que crea los datos necesarios para la creación de los gráficos de líneas
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
 * Configutaciónn de los elementos de visualización de los gráficos de líneas
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

  /*
   * Variables que contienen la dirección y el puerto del servidor
   */
  const lugar = "localhost";
  const puerto = "8080";

  /**
   * Función asíncrona que permite obtener los KPI's historicos de acuerdo al periodo seleccionado por el usuario
   * en días anteriores a la fecha actual
   */
  const kpisHistoricos = async (value) => {
    try {
      /**
       * Por cada KPI se realiza una petición al servidor para obtener los datos correspondientes a la fecha seleccionada.
       * Dado que cada uno va a regresar la misma cantidad de datos, se asigna la cantidad de datos a la variable valorBus
       * para que se pueda visualizar la misma cantidad de datos en todos los gráficos.
       */
      const resAbandono = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/consultaAbandono/?start=" +
          value
      );
      const dataAbandono = await resAbandono.json();

      /*
       * Se obtienen los valores de abandono y la fecha de cada uno de los datos obtenidos.
       */
      const valAbandono = dataAbandono.map((el) => el[0]);
      const fecha = dataAbandono.map((el) => el[2]);

      const cantidadDatos = valAbandono.length;
      /**
       * Al hacer uso de estados, una vez que se obtienen los datos, se asignan a las variables correspondientes
       * y la visualización de los gráficos se actualiza.
       */
      setInfoAbandono(valAbandono.reverse());
      setValorBus(cantidadDatos);
      setTimeLabels(fecha.reverse());

      /**
       * Información del nivel de servicio
       */
      const resNivel = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/consultaServicio/?start=" +
          value
      );
      const dataNivel = await resNivel.json();
      const valNivel = dataNivel.map((el) => el[0]);
      setInfoNivel(valNivel.reverse());

      /**
       * Información de la ocupación
       */
      const resOc = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/consultaOcupacion/?start=" +
          value
      );
      const dataOc = await resOc.json();
      const valOc = dataOc.map((el) => el[0]);
      setInfoOc(valOc.reverse());

      /**
       * Información de la duración del contacto en promedio
       */
      const resTiempo = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/consultaTiempo/?start=" +
          value
      );
      const dataTiempo = await resTiempo.json();
      const valTiempo = dataTiempo.map((el) => el[0]);
      setInfoTiempo(valTiempo.reverse());

      /**
       * Información del tiempo de espera promedio
       */
      const res = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/consultaEspera/?start=" +
          value
      );
      const data = await res.json();
      const valVel = data.map((el) => el[0]);
      setInfoV(valVel.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Función asíncrona que permite obtener los KPI's historicos de acuerdo al periodo seleccionado por el usuario
   * en los minutos seleccionados por el usuario
   */
  const kpisMinutos = async (value) => {
    try {
      /*
       * Se asignan los tiempos de acuerdo al periodo seleccionado por el usuario
       * con el formato HH:MM, más adecuado para la visualización de los gráficos.
       */
      setTimeLabels(generarTiempo(value));

      const resAbandono = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/abandonoMn/?cantidad=" +
          value
      );
      const dataAbandono = await resAbandono.json();
      const valAbandono = dataAbandono.map((el) => el[0]);
      const cantidadDatos = valAbandono.length;
      setValorBus(cantidadDatos);
      setInfoAbandono(valAbandono.reverse());

      const resNivel = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/servicioMn/?cantidad=" +
          value
      );
      const dataNivel = await resNivel.json();
      const valNivel = dataNivel.map((el) => el[0]);
      setInfoNivel(valNivel.reverse());

      const resOc = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/ocupacionMn/?cantidad=" +
          value
      );
      const dataOc = await resOc.json();
      const valOc = dataOc.map((el) => el[0]);
      setInfoOc(valOc.reverse());

      const resTiempo = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/tiempoMn/?cantidad=" +
          value
      );
      const dataTiempo = await resTiempo.json();
      const valTiempo = dataTiempo.map((el) => el[0]);
      setInfoTiempo(valTiempo.reverse());

      const res = await fetch(
        "http://" +
          lugar +
          ":" +
          puerto +
          "/historico/esperaMn/?cantidad=" +
          value
      );
      const data = await res.json();
      const valVel = data.map((el) => el[0]);
      setInfoV(valVel.reverse());
    } catch (error) {
      console.log(error);
    }
  };


  /*
   * Se obtienen los KPI's historicos de los últimos 15 minutos en cuanto 
  se renderiza el componente
   */
  useEffect(() => {
    kpisMinutos(16);
  }, []);

  /*
   * Recibe el valor seleccionado por el usuario y llama a la función correspondiente
   */
  const handlerCambio = (value) => {
    if (value > 0 && value <= 480) {
      kpisMinutos(value);
    } else {
      kpisHistoricos(value);
      // setActualizar(false);
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
