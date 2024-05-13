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
  jsonRes,
  mesAbandono,
  mesNivel,
  mesVelocidad,
  mesOc,
  mesTiempo,
  mesRes
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



const Historicos = () => {
  const abandonoVal = useRef(null);
  const servicioVal = useRef(null);
  const velocidadVal = useRef(null);
  const ocupacionVal = useRef(null);
  const tiempoLlamadaVal = useRef(null);
  const resolucionVal = useRef(null);

  const [abandono, setAbandono] = useState(2);
  const [nivel, setNivel] = useState(2);
  const [velocidad, setVelocidad] = useState(2);
  const [ocupacion, setOcupacion] = useState(2);
  const [tiempo, setTiempo] = useState(2);
  const [resolucion, setResolucion] = useState(2);

  const [timeLabelsA, setTimeLabelsA] = useState(generarTiempo());
  const [timeLabelsN, setTimeLabelsN] = useState(generarTiempo());
  const [timeLabelsV, setTimeLabelsV] = useState(generarTiempo());
  // const [timeLabels, setTimeLabels] = useState(generarTiempo());
  const [timeLabelsO, setTimeLabelsO] = useState(generarTiempo());
  const [timeLabelsTem, setTimeLabelsTem] = useState(generarTiempo());
  const [timeLabelsRes, setTimeLabelsRes] = useState(generarTiempo());

  const fechaIni = new Date();

  const [infoAbandono, setInfoAbandono] = useState(jsonAbandono);
  const [infoNivel, setInfoNivel] = useState(jsonNivel);
  const [infoV, setInfoV] = useState(jsonVel);
  const [infoOc, setInfoOc] = useState(jsonOc);
  const [infoTiempo, setInfoTiempo] = useState(jsonTiempo);
  // const [infoResolucion, setInfoResolucion] = useState(jsonRes);



  const dataAbandono = (createChartData(
    infoAbandono,
    "Porcentaje de abandono",
    abandono,
    "rgb(249, 37, 37)",
    timeLabelsA
  ));
  const dataNivel = createChartData(
    infoNivel,
    "Nivel de servicio",
    nivel,
    "rgb(194, 226, 141)",
    timeLabelsN
  );
  const dataVelocidad = createChartData(
    infoV,
    "Velocidad media de respuesta",
    velocidad,
    "rgb(54, 162, 235)",
    timeLabelsV
  );
  const dataOcupacion = createChartData(
    infoOc,
    "Porcentaje de ocupacion ",
    ocupacion,
    "rgb(153, 102, 255)",
    timeLabelsO
  );
  const dataTiempo = createChartData(
    infoTiempo,
    "Tiempo promedio de llamada (min)",
    tiempo,
    "rgb(75, 192, 149)",
    timeLabelsTem
  );
  // const dataResolucion = createChartData(
  //   infoResolucion,
  //   "Resolucion al primer contacto",
  //   resolucion,
  //   "rgb(230, 155, 16)",
  //   timeLabelsRes
  // );

  const handlerAbandono = (value) => {
    if (value > 0 && value <= 8) {
      setTimeLabelsA(generarTiempo());
      setAbandono(value);
      setInfoAbandono(jsonAbandono);
    } else {
      setTimeLabelsA(generarFechas(fechaIni, getFechaFin(value)));
      setAbandono(getDias(fechaIni, getFechaFin(value)));
      setInfoAbandono(mesAbandono);
    }
  };

  const handlerServicio = (value) => {
    if (value > 0 && value <= 8) {
      setTimeLabelsN(generarTiempo());
      setNivel(value);
      setInfoNivel(jsonNivel);
    } else {
      setTimeLabelsN(generarFechas(fechaIni, getFechaFin(value)));
      setNivel(getDias(fechaIni, getFechaFin(value)));
      setInfoNivel(mesNivel);
    }
  };

  const handlerRespuesta = (value) => {
    if (value > 0 && value <= 8) {
      setTimeLabelsV(generarTiempo());
      setVelocidad(value);
    }else{
      setTimeLabelsV(generarFechas(fechaIni, getFechaFin(value)));
      setVelocidad(getDias(fechaIni, getFechaFin(value)));
      setInfoV(mesVelocidad);
    }
  };

  const handlerOcupacion = (value) => {
    if (value > 0 && value <= 8) {
      setTimeLabelsO(generarTiempo());
      setOcupacion(value);
    }else{
      setTimeLabelsO(generarFechas(fechaIni, getFechaFin(value)));
      setOcupacion(getDias(fechaIni, getFechaFin(value)));
      setInfoOc(mesOc);
    }
  };

  const handlerTiempo = (value) => {
    if (value > 0 && value <= 8) {
      setTimeLabelsTem(generarTiempo());
      setTiempo(value);
    }else{
      setTimeLabelsTem(generarFechas(fechaIni, getFechaFin(value)));
      setTiempo(getDias(fechaIni, getFechaFin(value)));
      setInfoTiempo(mesTiempo);
    }

  };

  // const handlerContacto = (value) => {
  //   if (value > 0 && value <= 8) {
  //     setTimeLabelsRes(generarTiempo());
  //     setResolucion(value);
  //   } else {  
  //     setTimeLabelsRes(generarFechas(fechaIni, getFechaFin(value)));
  //     setResolucion(getDias(fechaIni, getFechaFin(value)));
  //     setInfoResolucion(mesRes);
  //   }
  //   // setTimeLabels(generarTiempo());
  //   // setResolucion(value);
  // };

  return (
    <div className="historico">
      <div className="row">
        <div className="cards-wrapper">
          <TitleF>Abandono</TitleF>
          <Line options={options} data= {dataAbandono} />
          <Seleccion
            ref={abandonoVal}
            onInputChange={handlerAbandono}
            id="Abandono"
          />
        </div>

        <div className="cards-wrapper">
          <TitleF>Nivel de servico</TitleF>
          <Line options={options} data={dataNivel} />
          <Seleccion
            ref={servicioVal}
            onInputChange={handlerServicio}
            id="nvlServico"
          />
        </div>

        <div className="cards-wrapper">
          <TitleF>Velocidad media de respuesta</TitleF>
          <Line options={options} data={dataVelocidad} />
          <Seleccion
            ref={velocidadVal}
            onInputChange={handlerRespuesta}
            id="vlRes"
          />
        </div>
      </div>

      <div className="row">
        <div className="cards-wrapper">
          <TitleF>Ocupacion</TitleF>
          <Line options={options} data={dataOcupacion} />
          <Seleccion
            ref={ocupacionVal}
            onInputChange={handlerOcupacion}
            id="Ocupacion"
          />
        </div>

        <div className="cards-wrapper">
          <TitleF>Tiempo promedio de llamada</TitleF>
          <Line options={options} data={dataTiempo} />
          <Seleccion
            ref={tiempoLlamadaVal}
            onInputChange={handlerTiempo}
            id="tiempoLlamada"
          />
        </div>
        <div className="cards-wrapper"> 

          </div>
        {/* <div className="cards-wrapper">
          <TitleF>Resolución al primer contacto</TitleF>
          <Line options={options} data={dataResolucion} />
          <Seleccion
            ref={resolucionVal}
            onInputChange={handlerContacto}
            id="Resolucion"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Historicos;
