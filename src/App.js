import './App.css';
// import styled from 'styled-components';
import Historicos from './components/Historicos';
import Agentes from './components/Agentes';
import Menu from './components/Menu';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BarraNav from './components/BarraNav';



function App() {
  return (
    
    <div className='App'>
        <div>
            <Router >
                <BarraNav />
                    
                    <Routes>
                        <Route path='/' element={<Menu />} />
                        <Route path='/agentes' element={<Agentes />}/>
                        <Route path='/historicos' element={<Historicos />}/>
                        
                    </Routes>
            </Router>
        </div >
    </div>
    
  );
}

export default App;

