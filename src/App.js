// import './App.css';
// import styled from 'styled-components';
// import Historicos from './components/Historicos';
// import Agentes from './components/Agentes';
// import Menu from './components/Menu';
// import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';
// import BarraNav from './components/BarraNav';



// function App() {
//   return (
    
//     <div className='App'>
//         <div>
//             <Router >
//                 <BarraNav />
                    
//                     <Routes>
//                         <Route path='/' element={<Menu />} />
//                         <Route path='/agentes' element={<Agentes />}/>
//                         <Route path='/historicos' element={<Historicos />}/>
                        
//                     </Routes>
//             </Router>
//         </div >
//     </div>
    
//   );
// }

// export default App;

import './App.css';
import styled from 'styled-components';
import TitleComponent from './components/Title';
import KpiCard from './components/Kpi';
import LlamadaEsperaCard from './components/Espera';
import LlamadaActivaCard from './components/Activas';

const Wrapper = styled.main`
    position: relative;
    padding: 10px;
    width: 1194px;
    height: 834px;
    display: flex;
    gap: 2%;
`

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
        max-height: 100%;
        overflow-y: scroll;
    }
`


function App() {
  return (
    <Wrapper>
        <Column className='side'>
            <TitleComponent text='Llamadas Activas' />
            <div className='cards-wrapper'>
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
                <LlamadaActivaCard agente='Juan Perez' cliente='Juan Perez' tiempo='2:30' sentimiento='Feliz' />
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
                <KpiCard title='Resolución al primer Contacto' value='56%' description='Consultas resueltas al primer contacto: 1245' />
            </div>
        </Column>
    </Wrapper>
  );
}

export default App;
