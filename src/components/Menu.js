/**
 * @author Eduardo Lugo
 * @author Gustavo Téllez
 * @author Ingrid García
 * @author Aldehil Sánchez
 * @author Angel Armando Marquez Curiel
 * 
 * Component that displays the main menu of the application, it contains the KPIs, the active calls, the queue and the notifications center
*/

import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import "../images/profile.png";
import TitleComponent from "./Title";
import KpiCard from "./Kpi";
import LlamadaActivaCard from "./Activas";
import { useState, useRef } from "react";
import ListaTranscripcion from "./ListaTranscripcion";
import CentroNotif from "./CentroNotif";
import "../styles/button-centro-notif.css";
import QueueVisualizer from "./QueueVisualizer";

const Wrapper = styled.main`
  padding: 10px;
  width: 95%;
  height: 100vh;
  display: flex;
  gap: 2%;
  margin-left: 70px;
`;

const Column = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;

  &.side {
    width: 35%;
  }

  &.center {
    width: 30%;
  }

  div.cards-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    overflow-y: scroll;
    justify-items: center;
  }
`;

const Menu = () => {

  /*Sets and updates the sentiment analysis*/
  const [sentimientoInfo, setSentimiento] = useState("NEUTRAL");
  const [contactId, setContactId] = useState(null);
  const [showVentanaTranscripcion, setShowVentanaTranscripcion] =
    useState(false);
  const [showCentroNotificaciones, setShowCentroNotificaciones] =
    useState(false);
  const [notificacionesFiltradasG, setNotificacionesFiltradas] = useState({});
  const [notificacionesAgente, setNotificacionesAgente] = useState([]);

  // Function to filter the notifications received by agent
  const filtrarNotificaciones = useCallback((notificaciones) => {
    let notificacionesFiltradas = {}
    notificaciones.map((notificacion) => {
      if (!notificacionesFiltradas[notificacion.Sender]) {
      notificacionesFiltradas[notificacion.Sender] = {notificaciones:[notificacion], asistencia:false};
      } else {
      notificacionesFiltradas[notificacion.Sender].notificaciones.push(notificacion);
      }
      return notificacionesFiltradas;
    });
    const usernames = Object.keys(notificacionesFiltradas);
    for (let i = 0; i < usernames.length; i++) {
      if (notificacionesFiltradasG[usernames[i]] === undefined) {
        notificacionesFiltradasG[usernames[i]] = {notificaciones:[], asistencia:false};
      }
      if (notificacionesFiltradasG[usernames[i]].notificaciones.length < notificacionesFiltradas[usernames[i]].notificaciones.length) {
        notificacionesFiltradas[usernames[i]].asistencia = true;
      }

        if (notificacionesFiltradasG[usernames[i]].asistencia === true) {
          notificacionesFiltradas[usernames[i]].asistencia = true;
        }
      }
      setNotificacionesFiltradas(notificacionesFiltradas);
    },
    [notificacionesFiltradasG]
  );

  const showVentanaHandler = () => {
    setShowVentanaTranscripcion(!showVentanaTranscripcion);
  };

  // Function to show the notification center
  const showCentroNotificacionesHandler = () => {
    setShowCentroNotificaciones(!showCentroNotificaciones);
  };

  const [abandono, setAbandono] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [tiempoEspera, setTiempoEspera] = useState(0);
  const [servicio, setServicio] = useState(0);
  const [ocupacion, setOcupacion] = useState(0);

    const descargarNotificaciones = useCallback(async () => {
        console.log('descargando notificaciones')
        const url = `http://localhost:8080/messages/getMessages?Date=${new Date().toString()}`;
        try {
        const res = await fetch(url);
        const data = await res.json();
        filtrarNotificaciones(data[0].Items); // Filter notifications after downloading them
        } catch (error) {
            console.log(error);
        }
    }, [filtrarNotificaciones])

  useEffect(() => {
    const intervalId = setInterval(() => {
      descargarNotificaciones();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [descargarNotificaciones]);

  /* Variables to specify the location and port of the server */
  const lugar = "localhost";
  const puerto = "8080";

  /**
   * Function that processes and sends the KPIs to the database, first it gets the KPIs from Amazon Connect,
   * then it shows them on the screen, and finally it sends them to the database in Dynamo DB.
   * This function is executed every minute, and it is executed once when the page is loaded so that it
   * immediately starts saving the information.
   */
  const procesarYEnviarKPIs = async () => {
    try {
      const res = await fetch("http://" + lugar + ":" + puerto + "/kpis/dia");
      const data = await res.json();

      const kpis = [];
      let abandono, duracion, tiempoEspera, servicio, ocupacion;

      /**
       * It checks that the value of the KPIs is not null, if it is, it assigns a value of 0.
       * In addition, it assigns the value of the KPIs to the corresponding variables and adds them to the kpis array, so that later
       * the corresponding component can be created and the information can be sent to the database with the correct structure.
       */
      if (data[1][1]) {
        abandono = data[1][1].toFixed(1);
        kpis.push(["Abandono", abandono]);
        setAbandono(abandono);
      } else {
        abandono = 0;
        kpis.push(["Abandono", 0]);
        setAbandono(0);
      }

      if (data[2][1]) {
        duracion = data[2][1].toFixed(1);
        kpis.push(["Duracion", duracion]);
        setDuracion(duracion);
      } else {
        duracion = 0;
        kpis.push(["Duracion", 0]);
        setDuracion(0);
      }

      if (data[3][1]) {
        tiempoEspera = data[3][1].toFixed(1);
        kpis.push(["Espera", tiempoEspera]);
        setTiempoEspera(tiempoEspera);
      } else {
        tiempoEspera = 0;
        kpis.push(["Espera", 0]);
        setTiempoEspera(0);
      }

      if (data[4][1]) {
        servicio = data[4][1].toFixed(1);
        kpis.push(["Servicio", servicio]);
        setServicio(servicio);
      } else {
        servicio = 0;
        kpis.push(["Servicio", 0]);
        setServicio(0);
      }

      ocupacion = 12;
      kpis.push(["Ocupacion", ocupacion]);
      setOcupacion(12);

      console.log("KPIs descargados:", kpis);

      /**
       * It creates an array with the correct structure to send the information to the server.
       */
      const fecha = new Date(
        new Date().getTime() - 6 * 60 * 60 * 1000
      ).toISOString();
      const jsonData = kpis.map((item) => ({
        Tipo: item[0],
        Metrica: parseInt(item[1]),
        Fecha: fecha,
      }));

      const options = {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      /**
       * It makes the appropriate request to send the KPIs to the server to be saved in the database.
       */

      const pet = await fetch(
        "http://" + lugar + ":" + puerto + "/kpis/crearMinKPI",
        options
      );
      if (!pet.ok) {
        const text = await pet.text();
        console.log(
          "Error en la respuesta del servidor:",
          pet.status,
          pet.statusText,
          text
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * the following function is in charge of checking if there is data from the previous day in the database,
   * if there is no data, it adds this data to the database, with the correct information and date.
   */
  const revisarDia = async () => {
    try {
      const res = await fetch(
        "http://" + lugar + ":" + puerto + "/historico/consultaDia"
      );
      const data = await res.json();

      if (data.length === 0) {
        console.log("Datos del día:", data);
        const kpis = [];
        let abandono, duracion, tiempoEspera, servicio, ocupacion;

        if (data[1][1]) {
          abandono = data[1][1].toFixed(1);
          kpis.push(["Abandono", abandono]);
        } else {
          kpis.push(["Abandono", 0]);
        }

        if (data[2][1]) {
          duracion = data[2][1].toFixed(1);
          kpis.push(["Duracion", duracion]);
        } else {
          kpis.push(["Duracion", 0]);
        }

        if (data[3][1]) {
          tiempoEspera = data[3][1].toFixed(1);
          kpis.push(["Espera", tiempoEspera]);
        } else {
          kpis.push(["Espera", 0]);
        }

        if (data[4][1]) {
          servicio = data[4][1].toFixed(1);
          kpis.push(["Servicio", servicio]);
        } else {
          kpis.push(["Servicio", 0]);
        }

        ocupacion = 50;
        kpis.push(["Ocupacion", ocupacion]);
        setOcupacion(50);

        const fecha = new Date(
          new Date().getTime() - 26 * 60 * 60 * 1000
        ).toISOString();
        const jsonData = kpis.map((item) => ({
          Tipo: item[0],
          Metrica: parseInt(item[1]),
          Fecha: fecha,
        }));

        const options = {
          method: "POST",
          body: JSON.stringify(jsonData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const pet = await fetch(
          "http://" + lugar + ":" + puerto + "/kpis/multiplesKPIS",
          options
        );
        if (!pet.ok) {
          const text = await pet.text();
          console.log(
            "Respuesta del servidor:",
            pet.status,
            pet.statusText,
            text
          );
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * The following useEffect is in charge of executing the function procesarYEnviarKPIs every minute,
   * so that the KPIs are updated on the page and sent to the database. In addition, it is executed once
   * when the page is loaded so that it immediately starts saving the information.
   */
  const intervalRef = useRef(null);
  const minutes = 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      procesarYEnviarKPIs();
      console.log("KPI's actualizados");
    }, minutes * 60 * 1000); /* It saves the data according to the value given in minutes */

    intervalRef.current = intervalId;

    /**
     * The following return is in charge of clearing the interval so that the function does not continue to be executed
     */
    return () => clearInterval(intervalRef.current);
  }, [minutes]);

  /* Once the component is rendered the functions are called once */
  useEffect(() => {
    procesarYEnviarKPIs();
    revisarDia();
  }, []);

  return (
    <Wrapper>
       {/*If the transcription button is clicked, a little window with the transcription will appear*/}
       {showVentanaTranscripcion && <ListaTranscripcion contactId={contactId} setSentimiento={setSentimiento} cancelar={showVentanaHandler} />}
        {showCentroNotificaciones && <CentroNotif cancelar={showCentroNotificacionesHandler} notificaciones={notificacionesAgente} funcShowTranscript={showVentanaHandler} />}
    <Column className='side'>
        <TitleComponent text='Active Calls' />
        <div className='cards-wrapper'>
          {/*Displays all the active calls in the screen*/}
          <LlamadaActivaCard sentimientoInfo={sentimientoInfo} setContactId={setContactId} funcVentanaTranscripcion={showVentanaHandler} notificaciones={notificacionesFiltradasG} setNotificaciones={setNotificacionesFiltradas} setNotificacionesAgente={setNotificacionesAgente} showCentroNotificacionesHandler={showCentroNotificacionesHandler}/>
        </div>
      </Column>
      <Column className="center">
        <TitleComponent text="Línea de Espera" />
        <QueueVisualizer />
      </Column>
      <Column className="side">
        <TitleComponent text="General KPI" />
        <div className="cards-wrapper">
          <KpiCard
            title="Abandonment rate"
            value={abandono}
            description="Percentage of calls hanged up"
            measure="%"
          />
          <KpiCard
            title="Contact duration"
            value={duracion}
            description="Average of minutes per call"
            measure="sec"
          />
          <KpiCard
            title="On-hold time"
            value={tiempoEspera}
            description="Average hold time"
            measure="sec"
          />
          <KpiCard
            title="Service level"
            value={servicio}
            description="Percentage of performance of agents"
            measure="%"
          />

          <KpiCard
            title="Occupancy"
            value={ocupacion}
            description="Percentage of agents who are on call out of the total of agents on line"
            measure="%"
          />
        </div>
      </Column>
    </Wrapper>
  );
};

export default Menu;
