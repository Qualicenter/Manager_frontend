import React from "react";
import styled from "styled-components";
import "../images/profile.png";
import TitleComponent from './Title';
import KpiCard from './Kpi';
import LlamadaEsperaCard from './Espera';
import LlamadaActivaCard from './Activas';

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
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 100%;
      overflow-y: scroll;
    }
  `;


  return (
    <Wrapper>
       
    <Column className='side'>
        <TitleComponent text='Llamadas Activas' />
        <div className='cards-wrapper'>
          <LlamadaActivaCard/>
        </div>
    </Column>
    <Column className='center'>
        <TitleComponent text='Línea de Espera' />
        <LlamadaEsperaCard cliente='Juan Perez' tiempo='2:30' />
        <LlamadaEsperaCard cliente='Juan Perez' tiempo='2:30' />
        <LlamadaEsperaCard cliente='Juan Perez' tiempo='2:30' />
        <LlamadaEsperaCard cliente='Juan Perez' tiempo='2:30' />
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
