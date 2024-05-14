import './App.css';
// import styled from 'styled-components';
import Historicos from './components/Historicos';
import Agentes from './components/Agentes';
import Menu from './components/Menu';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BarraNav from './components/BarraNav';
import KpiAgente from './components/KpiAgente';



function App() {
  return (
    
    <div className='App'>
        <div>
            <Router >
                <BarraNav />
                    
                    <Routes>
                        <Route path='/' element={<Menu />} />
                        <Route path='/agentes' element={<Agentes />}/>
                        <Route path='/agente/kpi' element={<KpiAgente />} />
                        <Route path='/historicos' element={<Historicos />}/>
                    </Routes>
            </Router>
        </div >
    </div>
    
  );
}

export default App;

