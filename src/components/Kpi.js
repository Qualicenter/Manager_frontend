/*
Autor: Ingrid Garcia 
Componente que muestra los KPIs en la pantalla principal y les asigan el color correspondiente segun su valor
Además, permite ajustar los valores de los umbrales de los KPIs y revisar el valor de estos
 */
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "../styles/kpis.css";
import "../styles/ajustes.css";

const Card = styled.div`
  background-color: #fff;
  width: 165px;
  height: 250px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 7px;
  gap: 10px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Value = styled.p`
  font-size: 50px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

const KpiCard = (props) => {
  const [estiloKpi, setEstiloKpi] = useState("normal");
  const [showModificarValores, setShowModificarValores] = useState(false);
  const [showValoresActuales, setShowValoresActuales] = useState(false);
  /*
  Los valores de los umbrales de los KPIs se guardan en los siguientes estados y 
  empiezan todos en 0
   */
  const [apropiadoValue, setApropiadoValue] = useState(0);
  const [tolerableValue, setTolerableValue] = useState(0);
  const [excesivoValue, setExcesivoValue] = useState(0);

  /*
  Revisa si los valores de los umbrales de los KPIs son correctos y asigna el color correspondiente,
  de lo contrario no se realiza un cambio. Además de que revisa que tipo de métrica es el KPI
  para asignarle la lógica correcta para el cambio de color
  */
  useEffect(() => {
    if (props.title === "Abandonment rate") {
      if (
        apropiadoValue > tolerableValue &&
        tolerableValue > excesivoValue &&
        apropiadoValue <= 100 &&
        tolerableValue <= 100 &&
        excesivoValue <= 100
      ) {
        console.log("Valores ajustados correctamente");
        if (props.value < tolerableValue) {
          setEstiloKpi("peligro");
        } else {
          if (props.value < apropiadoValue) {
            setEstiloKpi("medio");
          } else {
            setEstiloKpi("correcto");
          }
        }
      }
      if (apropiadoValue === 0 && tolerableValue === 0 && excesivoValue === 0) {
        setEstiloKpi("normal");
      }
    }

    if (props.title === "Service level") {
      if (
        apropiadoValue > tolerableValue &&
        tolerableValue > excesivoValue &&
        apropiadoValue <= 100 &&
        tolerableValue <= 100 &&
        excesivoValue <= 100
      ) {
        console.log("Valores ajustados correctamente");
        if (props.value >= apropiadoValue) {
          setEstiloKpi("correcto");
        } else {
          if (props.value >= tolerableValue) {
            setEstiloKpi("medio");
          } else {
            setEstiloKpi("peligro");
          }
        }
      }
      if (apropiadoValue === 0 && tolerableValue === 0 && excesivoValue === 0) {
        setEstiloKpi("normal");
      }
    }

    if (props.title === "On-hold time") {
      if (apropiadoValue < tolerableValue && tolerableValue < excesivoValue) {
        console.log("Valores ajustados correctamente");
        if (props.value <= apropiadoValue) {
          setEstiloKpi("correcto");
        } else {
          if (props.value <= tolerableValue) {
            setEstiloKpi("medio");
          } else {
            setEstiloKpi("peligro");
          }
        }
      }
      if (apropiadoValue === 0 && tolerableValue === 0 && excesivoValue === 0) {
        setEstiloKpi("normal");
      }
    }
    if (props.title === "Occupancy") {
      if (
        apropiadoValue < tolerableValue &&
        tolerableValue < excesivoValue &&
        apropiadoValue <= 100 &&
        tolerableValue <= 100 &&
        excesivoValue <= 100
      ) {
        console.log("Valores ajustados correctamente");
        if (props.value >= excesivoValue) {
          setEstiloKpi("peligro");
        } else {
          if (props.value >= tolerableValue) {
            setEstiloKpi("medio");
          } else {
            setEstiloKpi("correcto");
          }
        }
      }
      if (apropiadoValue === 0 && tolerableValue === 0 && excesivoValue === 0) {
        setEstiloKpi("normal");
      }
    }

    if (props.title === "Contact duration") {
      if (apropiadoValue < tolerableValue && tolerableValue < excesivoValue) {
        console.log("Valores ajustados correctamente");
        if (props.value <= apropiadoValue) {
          setEstiloKpi("correcto");
        } else {
          if (props.value <= tolerableValue) {
            setEstiloKpi("medio");
          } else {
            setEstiloKpi("peligro");
          }
        }
      }
      if (apropiadoValue === 0 && tolerableValue === 0 && excesivoValue === 0) {
        setEstiloKpi("normal");
      }
    }
  }, [props.title, props.value, apropiadoValue, tolerableValue, excesivoValue]);

/*
 * Función que evita que se actualice el estado al hacer click dentro de la notificación
 */
  function handleOuterClick(event) {
    event.stopPropagation();
  }

/*
 * Funciones que muestran y ocultan las notificaciones de los umbrales de los KPIs
 */
  
  const showCentroNotificacionesHandler = () => {
    setShowModificarValores(!showModificarValores);
  };
  const showValoresActualesHandler = () => {
    setShowValoresActuales(!showValoresActuales);
  };

  return (
    <Card>
      {showModificarValores && (
        <div className="div-exterior-notif" onClick={handleOuterClick}>
          <div className="div-interno-notif">
            <p className="umbralTitulo">
              Adjust the values for the thresholds for
            </p>

            <p className="umbralTitulo">{props.title}</p>
            <p className="umbralInfo">Maximum for appropriate</p>
            <input
              className="umbral"
              type="number"
              min={0}
              name="apropiado"
              onChange={(event) => setApropiadoValue(event.target.value)}
            />
            <p className="umbralInfo">Maximum for tolerable</p>
            <input
              className="umbral"
              type="number"
              min={0}
              name="tolerable"
              onChange={(event) => setTolerableValue(event.target.value)}
            />
            <p className="umbralInfo">Maximum for excessive</p>
            <input
              className="umbral"
              type="number"
              min={0}
              name="excesivo"
              onChange={(event) => setExcesivoValue(event.target.value)}
            />
            <button
              className="btnAjustar"
              onClick={showCentroNotificacionesHandler}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showValoresActuales && (
        <div className="div-exterior-notif" onClick={handleOuterClick}>
          <div className="div-interno-notif">
            <p className="umbralTitulo">Values of thresolds for</p>

            <p className="umbralTitulo">{props.title}</p>
            <p className="umbralInfo">Maximum for appropriate</p>
            <p>{apropiadoValue}</p>
            <p className="umbralInfo">Maximum for tolerable</p>
            <p>{tolerableValue}</p>
            <p className="umbralInfo">Maximum for excessive</p>
            <p>{excesivoValue}</p>
            <button className="btnAjustar" onClick={showValoresActualesHandler}>
              Close
            </button>
          </div>
        </div>
      )}

      <Title>{props.title}</Title>
      <Value className={estiloKpi}>
        {props.value} {props.measure}
      </Value>
      <Description>{props.description}</Description>
      <button
        className="btnAjustar"
        onClick={() => {
          showCentroNotificacionesHandler();
        }}
      >
        Configure thresholds
      </button>

      <button
        className="btnAjustar"
        onClick={() => {
          showValoresActualesHandler();
        }}
      >
        Actual values
      </button>
    </Card>
  );
};

export default KpiCard;
