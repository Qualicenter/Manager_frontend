import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import "../images/profile.png";
import TitleComponent from './Title';
import KpiCard from './Kpi';
import LlamadaEsperaCard from './Espera';
import LlamadaActivaCard from './Activas';
import {useState} from "react";
import ListaTranscripcion from "./ListaTranscripcion";
import CentroNotif from "./CentroNotif";
import '../styles/button-centro-notif.css';

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
        console.log(data[0].Items);
        setNotificaciones(data[0].Items);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
      const intervalId = setInterval(() => {
        descargarNotificaciones();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [descargarNotificaciones])

  return (
    <Wrapper>
       {showVentanaTranscripcion && <ListaTranscripcion cancelar={showVentanaHandler} />}
        {showCentroNotificaciones && <CentroNotif cancelar={showCentroNotificacionesHandler} notificaciones={notificaciones} />}
    <Column className='side'>
        <TitleComponent text='Llamadas Activas' />
        <button className="button-centro-notif" onClick={() => {showCentroNotificacionesHandler();descargarNotificaciones()}} >Centro de Notificaciones</button>
        <div className='cards-wrapper'>
          <LlamadaActivaCard funcVentanaTranscripcion={showVentanaHandler}/>
        </div>
    </Column>
    <Column className='center'>
        <TitleComponent text='Línea de Espera' />
        <LlamadaEsperaCard cliente='Luisa Chanvez' tiempo='2:30' />
        <LlamadaEsperaCard cliente='José Montés' tiempo='2:30' />
        <LlamadaEsperaCard cliente='Ian Saldovar' tiempo='2:30' />
        <LlamadaEsperaCard cliente='Pablo Olivares' tiempo='2:30' />
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
