import React from "react";
import styled from "styled-components";
import "../images/profile.png";
import TitleComponent from "./Title";
import KpiCard from "./Kpi";
import LlamadaEsperaCard from "./Espera";
import LlamadaActivaCard from "./Activas";
import { useState, useEffect, useRef } from "react";
import ListaTranscripcion from "./ListaTranscripcion";
import CentroNotif from "./CentroNotif";
import "../styles/button-centro-notif.css";

const Menu = () => {
  const Wrapper = styled.main`
    position: relative;
    padding: 10px;
    width: 80%;
    height: 834px;
    display: flex;
    gap: 2%;
    left: 16%;
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
      max-width: 100%;
      overflow-y: scroll;
    }
  `;
  const [showVentanaTranscripcion, setShwoVentanaTranscripcion] =
    useState(false);
  const [showCentroNotificaciones, setShowCentroNotificaciones] =
    useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const showVentanaHandler = () => {
    setShwoVentanaTranscripcion(!showVentanaTranscripcion);
  };

  const showCentroNotificacionesHandler = () => {
    setShowCentroNotificaciones(!showCentroNotificaciones);
  };

  const descargarNotificaciones = async () => {
    try {
      const res = await fetch("http://localhost:8080/messages/getMessages");
      const data = await res.json();
      console.log(data[0].Items);
      setNotificaciones(data[0].Items);
    } catch (error) {
      console.log(error);
    }
  };

  const intervalRef = useRef(null);
  const minutes = 0.5; // Change this to your desired interval in minutes

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Your function to be called every x minutes
      console.log("This will run every x minutes!");
    }, minutes * 60 * 1000);

    intervalRef.current = intervalId;

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalRef.current);
  }, [minutes]); 

  return (
    <Wrapper>
      {showVentanaTranscripcion && (
        <ListaTranscripcion cancelar={showVentanaHandler} />
      )}
      {showCentroNotificaciones && (
        <CentroNotif
          cancelar={showCentroNotificacionesHandler}
          notificaciones={notificaciones}
        />
      )}
      <Column className="side">
        <TitleComponent text="Llamadas Activas" />
        <button
          className="button-centro-notif"
          onClick={() => {
            showCentroNotificacionesHandler();
            descargarNotificaciones();
          }}
        >
          Centro de Notificaciones
        </button>
        <div className="cards-wrapper">
          <LlamadaActivaCard funcVentanaTranscripcion={showVentanaHandler} />
        </div>
      </Column>
      <Column className="center">
        <TitleComponent text="Línea de Espera" />
        <LlamadaEsperaCard cliente="Luisa Chavez" tiempo="2:30" />
        <LlamadaEsperaCard cliente="José Montés" tiempo="2:30" />
        <LlamadaEsperaCard cliente="Ian Saldovar" tiempo="2:30" />
        <LlamadaEsperaCard cliente="Pablo Olivares" tiempo="2:30" />
      </Column>
      <Column className="side">
        <TitleComponent text="KPI's Generales" />
        <div className="cards-wrapper">
          <KpiCard
            title="Abandonment rate"
            value="2.4"
            description="Percentage of calls hanged up"
            measure="%"
          />
          <KpiCard
            title="Contact duration"
            value="240"
            description="Average of minutes per call"
            measure="sec"
          />
          <KpiCard
            title="Customer hold time"
            value="30"
            description="Average of seconds a customer was on hold"
            measure="sec"
          />
          <KpiCard
            title="Service level"
            value="80"
            description="Percentage of performance of agents"
            measure="%"
          />

          <KpiCard
            title="Occupancy"
            value="75"
            description="Percentage of agents how are on call of the total of agents"
            measure="%"
          />
        </div>
      </Column>
    </Wrapper>
  );
};

export default Menu;
