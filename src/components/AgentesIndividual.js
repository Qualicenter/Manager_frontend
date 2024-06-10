/**
 * @author Ingrid García Hernández
 * @author Noh Ah Kim Kwon
 * Component that shows the information of a specific agent
 */

import "../styles/agentes.css";
import styled from "styled-components";
import "../images/1.png";
import { Link, useNavigate } from 'react-router-dom';

const AgentesIndividual = ({nombre, apellido, im}) => {

    const Titulo = styled.h2`    
    font-size: 20px;
    font-weight: 600;

    `

    const navegar = useNavigate();
    
    const consultar = (e) => {
      e.preventDefault();
      navegar("/agente/kpi/" + (nombre + apellido).toLowerCase().replace(/\s/g, ""));
      //console.log((nombre+apellido).toLowerCase().replace(/\s/g, ""));
    };

    const handlerGiveName = () => {
        const info = `${nombre}${apellido}`;
        console.log(info)
        localStorage.setItem('username', info)
    }

    return (
        <div className='cardW'>
            <div className='estado'></div>
            <img className='imgPerfil' src={im ? im : require('../images/profile.png')} alt='Profile'></img>
            <Titulo>{nombre} {apellido}</Titulo>
            <button className='btnInfo' onClick={consultar}>
                More
            </button>
            <button className='btnInfo' onClick={handlerGiveName}>
            <Link to='/encuesta'> 
                    Feedback
                </Link>
            </button>
        </div>
    )
}

export default AgentesIndividual;
