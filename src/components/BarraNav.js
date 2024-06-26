/**
 * @author Ingrid García Hernández
 * @author Noh Ah Kim Kwon
 * Component which shows the navigation bar of the application.
 */

import React, { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IconContext } from 'react-icons';
import '../styles/barraNav.css';
import { SidebarData } from './SidebarData';
import logo from "../images/qualitas-logo.png";
import logoSmall from "../images/qualitaslogosmall.png";

/* Navigation bar component */
function BarraNav() {
  /* State that stores the visibility of the navigation bar */
  const [verBarra, setVerBarra] = useState(false);

  /* Function to show or collapse the navigation bar */
  const mostrarBarra = () => setVerBarra(!verBarra);

  return (
    <div className="navBarra">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navBarra">
          <ul className="nav-menu-elementos">
            <div className="navbar-alternar">
              <Link to="#" className="icono">
                <FaBars onClick={mostrarBarra}/>
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
          <div style={{ position: "absolute", bottom: "0"  }} >
            <img src={logoSmall} alt="logo" className="logo" />
          </div>
        </div>
        <nav className={verBarra ? "nav-menu activo" : "nav-menu"}>
          <ul className="nav-menu-elementos" >
            <div className="navbar-alternar">
              <img src={logo} alt="logo" className="logo" />
              <Link to="#" className="menu-barras">
                <MdKeyboardArrowLeft onClick={mostrarBarra}/>
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