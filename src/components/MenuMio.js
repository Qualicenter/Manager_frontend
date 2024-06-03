import React, { useEffect } from "react";
import styled from "styled-components";
import "../images/profile.png";
import TitleComponent from "./Title";
import KpiCard from "./Kpi";
import LlamadaEsperaCard from "./Espera";
import LlamadaActivaCard from "./Activas";
import { useState, useRef } from "react";
import ListaTranscripcion from "./ListaTranscripcion";
import CentroNotif from "./CentroNotif";
import "../styles/button-centro-notif.css";

const Menu = () => {
  const Wrapper = styled.main`
    position: relative;
    padding: 10px;
    width: 80%;
    height: 834px;
    display: flex;
    gap: 2%;
    left: 16%;
  `;

  const Column = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;

    &.side {
      width: 35%;
    }

    &.center {
      width: 30%;
    }

    div.cards-wrapper {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      max-width: 100%;
      overflow-y: scroll;
    }
  `;
  const [showVentanaTranscripcion, setShwoVentanaTranscripcion] =
    useState(false);
  const [showCentroNotificaciones, setShowCentroNotificaciones] =
    useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const showVentanaHandler = () => {
    setShwoVentanaTranscripcion(!showVentanaTranscripcion);
  };

  const showCentroNotificacionesHandler = () => {
    setShowCentroNotificaciones(!showCentroNotificaciones);
  };

  const [abandono, setAbandono] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [tiempoEspera, setTiempoEspera] = useState(0);
  const [servicio, setServicio] = useState(0);
  const [ocupacion, setOcupacion] = useState(0);

  const descargarNotificaciones = async () => {
    try {
      const res = await fetch("http://localhost:8080/messages/getMessages");
      const data = await res.json();
      // console.log(data[0].Items);
      setNotificaciones(data[0].Items);
    } catch (error) {
      // console.log(error);
    }
  };

  /*
Autor: Ingrid García
Las siguiente variables facilitan el cambiar el nombre del lugar y puerto del servidor.
*/
  const lugar = "localhost";
  const puerto = "8080";

  /*
Autor: Ingrid García 
La función procesarYEnviarKPIs se encarga de obtener los KPIs del momento proveniente de Amazon Connect,
 y una vez que se muestran en patalla, también se encarga de enviarlos a la base de datos en Dynamo DB.
 Está función se ejecuta cada minuto, y se ejecuta una vez al cargar la página para que inmediatamente vaya guardando la información.
 La función asíncrona permite que la página no se congele mientras se ejecuta la función.
 */
  const procesarYEnviarKPIs = async () => {
    try {
      const res = await fetch("http://" + lugar + ":" + puerto + "/kpis/dia");
      const data = await res.json();

      const kpis = [];
      let abandono, duracion, tiempoEspera, servicio, ocupacion;

      /*
      Autor: Ingrid García
      Se verifica que el valor de los KPIs no sea nulo, en caso de serlo, se asigna un valor de 0.
      Además, se asigna el valor de los KPIs a las variables correspondientes y se agregan al arreglo kpis, para después poder 
      crear el componente correspondiente y envia la información al base de datos con la estructura correcta. 
       */
      if (data[1][1]) {
        abandono = data[1][1].toFixed(1);
        kpis.push(["Abandono", abandono]);
        setAbandono(abandono);
      } else {
        abandono = 0;
        kpis.push(["Abandono", 0]);
        setAbandono(0);
      }

      if (data[2][1]) {
        duracion = data[2][1].toFixed(1);
        kpis.push(["Duracion", duracion]);
        setDuracion(duracion);
      } else {
        duracion = 0;
        kpis.push(["Duracion", 0]);
        setDuracion(0);
      }

      if (data[3][1]) {
        tiempoEspera = data[3][1].toFixed(1);
        kpis.push(["Espera", tiempoEspera]);
        setTiempoEspera(tiempoEspera);
      } else {
        tiempoEspera = 0;
        kpis.push(["Espera", 0]);
        setTiempoEspera(0);
      }

      if (data[4][1]) {
        servicio = data[4][1].toFixed(1);
        kpis.push(["Servicio", servicio]);
        setServicio(servicio);
      } else {
        servicio = 0;
        kpis.push(["Servicio", 0]);
        setServicio(0);
      }

      ocupacion = 12;
      kpis.push(["Ocupacion", ocupacion]);
      setOcupacion(12);

      console.log("KPIs descargados:", kpis);

      /*
      Autor: Ingrid García
      Se crea un arreglo con la estructura correcta para enviar la información al servidor.
       */
      const fecha = new Date(
        new Date().getTime() - 6 * 60 * 60 * 1000
      ).toISOString();
      const jsonData = kpis.map((item) => ({
        Tipo: item[0],
        Metrica: parseInt(item[1]),
        Fecha: fecha,
      }));

      // console.log("Datos para enviar:", jsonData);

      const options = {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      /*
      Autor: Ingrid García
      Se envían los KPIs al servidor para que sean guardados en la base de datos.
      */

      const pet = await fetch(
        "http://" + lugar + ":" + puerto + "/kpis/crearMinKPI",
        options
      );
      if (!pet.ok) {
        const text = await pet.text();
        console.log(
          "Error en la respuesta del servidor:",
          pet.status,
          pet.statusText,
          text
        );
        return;
      }
      const regreso = await pet.json();

      // console.log("Respuesta del servidor:", regreso);
    } catch (error) {
      console.log(error);
    }
  };
  /*
Autor: Ingrid García 
La función de revisarDia se encarga de revisar si hay datos del día anterior en la base de datos, 
en caso de no haberlos, agrega estos datos a la base de datos, con la información y fecha correcta.
 */
  const revisarDia = async () => {
    try {
      const res = await fetch(
        "http://" + lugar + ":" + puerto + "/historico/consultaDia"
      );
      const data = await res.json();

      if (data.length === 0) {
        console.log("Datos del día:", data);
        const kpis = [];
        let abandono, duracion, tiempoEspera, servicio, ocupacion;

        if (data[1][1]) {
          abandono = data[1][1].toFixed(1);
          kpis.push(["Abandono", abandono]);
          setAbandono(abandono);
        } else {
          abandono = 0;
          kpis.push(["Abandono", 0]);
          setAbandono(0);
        }

        if (data[2][1]) {
          duracion = data[2][1].toFixed(1);
          kpis.push(["Duracion", duracion]);
          setDuracion(duracion);
        } else {
          duracion = 0;
          kpis.push(["Duracion", 0]);
          setDuracion(0);
        }

        if (data[3][1]) {
          tiempoEspera = data[3][1].toFixed(1);
          kpis.push(["Espera", tiempoEspera]);
          setTiempoEspera(tiempoEspera);
        } else {
          tiempoEspera = 0;
          kpis.push(["Espera", 0]);
          setTiempoEspera(0);
        }

        if (data[4][1]) {
          servicio = data[4][1].toFixed(1);
          kpis.push(["Servicio", servicio]);
          setServicio(servicio);
        } else {
          servicio = 0;
          kpis.push(["Servicio", 0]);
          setServicio(0);
        }

        ocupacion = 50;
        kpis.push(["Ocupacion", ocupacion]);
        setOcupacion(50);

        const fecha = new Date(
          new Date().getTime() - 26 * 60 * 60 * 1000
        ).toISOString();
        const jsonData = kpis.map((item) => ({
          Tipo: item[0],
          Metrica: parseInt(item[1]),
          Fecha: fecha,
        }));

        const options = {
          method: "POST",
          body: JSON.stringify(jsonData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const pet = await fetch(
          "http://" + lugar + ":" + puerto + "/kpis/multiplesKPIS",
          options
        );
        if (!pet.ok) {
          const text = await pet.text();
          console.log(
            "Error en la respuesta del servidor:",
            pet.status,
            pet.statusText,
            text
          );
          return;
        }
        const regreso = await pet.json();

        // console.log("Respuesta del servidor:", regreso);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /*
  Autor: Ingrid García
  El siguiente useEffect se encarga de ejecutar la función procesarYEnviarKPIs cada minuto, para que se actualicen los KPIs en la página
  y se envíen a la base de datos. Además, se ejecuta una vez al cargar la página para que inmediatamente vaya guardando la información.
  */
  const intervalRef = useRef(null);
  const minutes = 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      procesarYEnviarKPIs();
      console.log("KPI's actualizados");
    }, minutes * 60 * 1000);

    intervalRef.current = intervalId;

    /*
    Autor: Ingrid García
    Se limpia el intervalo para que no se siga ejecutando la función después de que el componente se desmonte.
     */
    return () => clearInterval(intervalRef.current);
  }, [minutes]);

  useEffect(() => {
    procesarYEnviarKPIs();
    revisarDia();
  }, []);

  return (
    <Wrapper>
      {showVentanaTranscripcion && (
        <ListaTranscripcion cancelar={showVentanaHandler} />
      )}
      {showCentroNotificaciones && (
        <CentroNotif
          cancelar={showCentroNotificacionesHandler}
          notificaciones={notificaciones}
        />
      )}
      <Column className="side">
        <TitleComponent text="Llamadas Activas" />
        <button
          className="button-centro-notif"
          onClick={() => {
            showCentroNotificacionesHandler();
            descargarNotificaciones();
          }}
        >
          Centro de Notificaciones
        </button>
        <div className="cards-wrapper">
          <LlamadaActivaCard funcVentanaTranscripcion={showVentanaHandler} />
        </div>
      </Column>
      <Column className="center">
        <TitleComponent text="Línea de Espera" />
        <LlamadaEsperaCard cliente="Luisa Chavez" tiempo="2:30" />
        <LlamadaEsperaCard cliente="José Montés" tiempo="2:30" />
        <LlamadaEsperaCard cliente="Ian Saldovar" tiempo="2:30" />
        <LlamadaEsperaCard cliente="Pablo Olivares" tiempo="2:30" />
      </Column>
      <Column className="side">
        <TitleComponent text="General KPI" />
        <div className="cards-wrapper">
          <KpiCard
            title="Abandonment rate"
            value={abandono}
            description="Percentage of calls hanged up"
            measure="%"
          />
          <KpiCard
            title="Contact duration"
            value={duracion}
            description="Average of minutes per call"
            measure="sec"
          />
          <KpiCard
            title="On-hold time"
            value={tiempoEspera}
            description="Average hold time"
            measure="sec"
          />
          <KpiCard
            title="Service level"
            value={servicio}
            description="Percentage of performance of agents"
            measure="%"
          />

          <KpiCard
            title="Occupancy"
            value={ocupacion}
            description="Percentage of agents who are on call out of the total of agents on line"
            measure="%"
          />
        </div>
      </Column>
    </Wrapper>
  );
};

export default Menu;


