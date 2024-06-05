/**
 * Componente que muestra la barra de navegación
 * Autor: Ingrid García Hernández
 * Modificado por: Noh Ah Kim Kwon
 */

import React, { useState } from "react";
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Md from "react-icons/md";
import { IconContext } from 'react-icons';
import '../styles/barraNav.css';
import { SidebarData } from './SidebarData';
import logo from "../images/qualitas-logo.png";


function BarraNav() {
  const [verBarra, setVerBarra] = useState(true);

  const mostrarBarra = () => setVerBarra(!verBarra);

  return (
    <div className="navBarra">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navBarra">
          <ul className="nav-menu-items">
            <div className="navbar-toggle">
              <Link to="#" className="icon">
                <FaIcons.FaBars onClick={mostrarBarra}/>
              </Link>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>{item.icon}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <nav className={verBarra ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" >
            <div className="navbar-toggle">
              <img src={logo} alt="logo" className="logo" />
              <Link to="#" className="menu-bars">
                <Md.MdKeyboardArrowLeft onClick={mostrarBarra}/>
              </Link>
              
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default BarraNav;