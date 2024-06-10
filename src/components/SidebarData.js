/**
 * @author Ingrid Garcia Hernandez
 * Component that gives the structure of the sidebar of the application, the name and
 * icon of the elements are defined as well as the route to which it will be redirected.
 */

import React from "react";
import { FaChartBar } from "react-icons/fa";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";

export const SidebarData = [
  {
    title: "Menu",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-texto",
  },
  {
    title: "Agents",
    path: "/agentes",
    icon: <AiOutlineUser />,
    cName: "nav-texto",
  },
  {
    title: "Historic KPIs",
    path: "/historicos",
    icon: <FaChartBar />,
    cName: "nav-texto",
  },
];
