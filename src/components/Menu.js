import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import "../images/profile.png";
import TitleComponent from './Title';
import KpiCard from './Kpi';
import LlamadaActivaCard from './Activas';
import {useState} from "react";
import ListaTranscripcion from "./ListaTranscripcion";
import CentroNotif from "./CentroNotif";
import '../styles/button-centro-notif.css';
import QueueVisualizer from "./QueueVisualizer";

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
    grid-template-columns: repeat(2,1fr);
    max-width: 100%;
    overflow-y: scroll;
  }
`;

const Menu = () => {
  const [showVentanaTranscripcion, setShwoVentanaTranscripcion] = useState(false);
  const [showCentroNotificaciones, setShowCentroNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesFiltradasG, setNotificacionesFiltradas] = useState({});
  const [notificacionesAgente, setNotificacionesAgente] = useState([]);

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
  },[notificacionesFiltradasG])

  const showVentanaHandler = () => {
    setShwoVentanaTranscripcion(!showVentanaTranscripcion);
  }

  const showCentroNotificacionesHandler = () => {
    setShowCentroNotificaciones(!showCentroNotificaciones);
  }

    const descargarNotificaciones = useCallback(async () => {
        console.log('descargando notificaciones')
        const url = `http://localhost:8080/messages/getMessages?Date=${new Date().toString()}`;
        try {
        const res = await fetch(url);
        const data = await res.json();
        filtrarNotificaciones(data[0].Items);
        setNotificaciones(data[0].Items);
        } catch (error) {
            console.log(error);
        }
    }, [filtrarNotificaciones])

    useEffect(() => {
      const intervalId = setInterval(() => {
        descargarNotificaciones();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [descargarNotificaciones])

  return (
    <Wrapper>
       {showVentanaTranscripcion && <ListaTranscripcion cancelar={showVentanaHandler} />}
        {showCentroNotificaciones && <CentroNotif cancelar={showCentroNotificacionesHandler} notificaciones={notificacionesAgente} />}
    <Column className='side'>
        <TitleComponent text='Llamadas Activas' />
        <button className="button-centro-notif" onClick={() => {showCentroNotificacionesHandler();descargarNotificaciones()}} >Centro de Notificaciones</button>
        <div className='cards-wrapper'>
          <LlamadaActivaCard funcVentanaTranscripcion={showVentanaHandler} notificaciones={notificacionesFiltradasG} setNotificaciones={setNotificacionesFiltradas} setNotificacionesAgente={setNotificacionesAgente} showCentroNotificacionesHandler={showCentroNotificacionesHandler}/>
        </div>
    </Column>
    <Column className='center'>
        <TitleComponent text='Línea de Espera' />
        <QueueVisualizer />
    </Column>
    <Column className='side'>
        <TitleComponent text="KPI's Generales" />
        <div className='cards-wrapper'>
            <KpiCard title='Abandono' value='2.4%' description='Total de llamadas abandonadas: 25' />
            <KpiCard title='Nivel de Servicio' value='80%' description='Total de llamadas respondidas: 2534' />
            <KpiCard title='Velocidad media de Respuesta' value='11s' description='' />
            <KpiCard title='Ocupacion' value='75%' description='Total de llamadas colgadas: 1804' />
            <KpiCard title='Tiempo promedio de Llamada' value='3:20' description='Total de llamadas abandonadas: 25' />
            {/* <KpiCard title='Resolución al primer Contacto' value='56%' description='Consultas resueltas al primer contacto: 1245' /> */}
        </div>
    </Column>
</Wrapper>
  );
};

export default Menu;
