import React, { useRef, useState} from "react";
import styled from "styled-components";
import "../styles/historicos.css";
import Seleccion from "./Seleccion";
import {
  jsonAbandono,
  jsonNivel,
  jsonVel,
  jsonOc,
  jsonTiempo,
  mesAbandono,
  mesNivel,
  mesVelocidad,
  mesOc,
  mesTiempo
} from "./ValDef";

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




function generarTiempo() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const labels = (hour, minute) => {
    const timePoints = [];
    for (let delta = 0; delta <= 30; delta += 15) {
      let newMinute = minute - delta;
      if (newMinute >= 0) {
        timePoints.push([hour, newMinute]);
      } else {
        // Handle cases where minute goes below 0
        const newHour = hour - 1;
        newMinute = 60 + newMinute; // Wrap around to previous hour
        timePoints.push([newHour, newMinute]);
      }
    }

    timePoints.push([hour - 1, minute]);
    timePoints.push([hour - 2, minute]);
    timePoints.push([hour - 4, minute]);
    timePoints.push([hour - 6, minute]);
    timePoints.push([hour - 8, minute]);

    return timePoints;
  };

  const timePoints = labels(hour, minute);

  return timePoints.map(([h, m]) => {
    let formattedHour = h;

    if (formattedHour === 12) {
      formattedHour = 12;
    } else { 
      formattedHour = h === 0 ? 12 : h % 12;
    }

    const amPm = h < 12 ? "AM" : "PM";
    return `${formattedHour.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${amPm}`;
  });
}

function getFechaFin(fecha) {
  const [year, month, day] = fecha.split("-")
  return new Date(year, month - 1, day);
}

function createChartData(jsonData, labelName, valor, color, labelsT) {
  const labels = labelsT.slice(0, valor);
  const data = jsonData.slice(0, valor).map((obj) => obj.metrica);

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

function getDias(inicio, fin) {
    const timeDiff = inicio.getTime() - fin.getTime();
    const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDifference;
}


function generarFechas(startDate, endDate) {
  const dates = [];
  const currentDate = startDate;

  while (endDate <= currentDate) {
    dates.push(new Date(currentDate).toLocaleDateString());
    currentDate.setDate(currentDate.getDate() - 1); // Add 1 day to the current date
  }
  dates.push(new Date(currentDate).toLocaleDateString());

  return dates;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const [timeLabels, setTimeLabels] = useState(generarTiempo());
  const [valorBus, setValorBus] = useState(2);

  const fechaIni = new Date();

  const [infoAbandono, setInfoAbandono] = useState(jsonAbandono);
  const [infoNivel, setInfoNivel] = useState(jsonNivel);
  const [infoV, setInfoV] = useState(jsonVel);
  const [infoOc, setInfoOc] = useState(jsonOc);
  const [infoTiempo, setInfoTiempo] = useState(jsonTiempo);



  const dataAbandono = (createChartData(
    infoAbandono,
    "Abandonment rate percentage",
    valorBus,
    "rgb(249, 37, 37)",
    timeLabels
  ));
  const dataNivel = createChartData(
    infoNivel,
    "Service level percentage",
    valorBus,
    "rgb(194, 226, 141)",
    timeLabels
  );
  const dataVelocidad = createChartData(
    infoV,
    "Customer hold time (min)",
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
 

  const handlerCambio = (value) => {
    if (value > 0 && value <= 8) {
      setTimeLabels(generarTiempo());

      setValorBus(value);

      setInfoAbandono(jsonAbandono);

      setInfoNivel(jsonNivel);

      setInfoV(jsonVel);

      setInfoOc(mesOc);

      setInfoTiempo(jsonTiempo);

    }else{
      setTimeLabels(generarFechas(fechaIni,getFechaFin(value)));

      setValorBus(getDias(fechaIni, getFechaFin(value)));

      setInfoAbandono(mesAbandono);

      setInfoNivel(mesNivel);

      setInfoV(mesVelocidad);

      setInfoOc(mesOc);

      setInfoTiempo(mesTiempo);
    }
  };



  return (
    <div className="historico">
      <TitleH>Historical KPI</TitleH>
        <Seleccion
            ref={valRef}
            onInputChange={handlerCambio}
            id="vlRes"
        />
      <div className="row">

        <div className="cards-wrapper">
          <TitleF>Abandonment rate</TitleF>
          <Line options={options} data= {dataAbandono} />
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
