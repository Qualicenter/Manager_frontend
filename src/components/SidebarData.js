/**
 * Autor: Ingrid García 
 * Componente SidebarData, responsable de la estructura de la barra lateral de la aplicación.
 * Se define el nombre de los elementos al igual que el icono que se mostrará en la barra lateral, 
 * además de la ruta a la que se redirigirá al hacer click en el elemento.
 */

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


export const SidebarData = [
  {
    title: 'Menu',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-texto'
  },
  {
    title: 'Agents',
    path: '/agentes',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-texto'
  },
  {
    title: 'Historic KPIs',
    path: '/historicos',
    icon: <FaIcons.FaChartBar />,
    cName: 'nav-texto'
  },
  
];