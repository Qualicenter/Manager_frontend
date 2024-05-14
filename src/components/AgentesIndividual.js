import "../styles/agentes.css";
import styled from "styled-components";
import "../images/profile.png";

import React from 'react';
import { Link } from "react-router-dom";

const AgentesIndividual = ({nombre, apellido}) => {
    const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;

    `

    return (
        <div className='cardW'>
            <div className='estado'></div>
            <img className='imgPerfil' src={require('../images/profile.png')} alt='Profile'></img>
            <Title>{nombre} {apellido}</Title>
            <button className='btnInfo'>
                <Link to="/agente/kpi">Mas</Link>
            </button>
            <button className='btnInfo'>Comentario</button>
        </div>
    )
}

export default AgentesIndividual;