import React, { useState } from "react";
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import '../styles/barraNav.css';
import { SidebarData } from './SidebarData';

function BarraNav() {
    const [verBarra, setVerBarra] = useState(false);

    const mostrarBarra = () => setVerBarra(!verBarra);

    return(
        <div className="navBarra">
            <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navBarra'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={mostrarBarra} />
          </Link>
        </div>
        <nav className={verBarra ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={mostrarBarra}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
    )

}

export default BarraNav;