import React from 'react';
import "../styles/agentes.css";
import styled from "styled-components";
import "../images/profile.png";

const  Agentes = () => {


    const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;
    `


    return (
       <div className='agentesW'>
            <div className='column'>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
            </div>

            <div className='column'>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
            </div>

            <div className='column'>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
            </div>

            <div className='column'>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
                <div className='cardW'>
                    <div className='estado'></div>
                    <img className='imgPerfil'src={require('../images/profile.png')} alt='Profile'></img>
                    <Title>Pedro Perez</Title>
                    <button className='btnInfo'>Mas</button>
                    
                </div>
            </div>

                    
        </div>
    )   
}

export default Agentes;
