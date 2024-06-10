/** 
* @author Ingrid Garcia Hernandez
* Component that shows the KPIs on the main screen and assigns the corresponding color according to their value
* It also allows to adjust the values of the KPIs thresholds and review the value of these thresholds.
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
  The values of each threshold of the KPIs are stored in the following states and
  are initialized with a value of 0
  */
  const [apropiadoValue, setApropiadoValue] = useState(0);
  const [tolerableValue, setTolerableValue] = useState(0);
  const [excesivoValue, setExcesivoValue] = useState(0);

  /*
  * useEffect hook that checks if the values of the KPI thresholds are correct and assigns 
  * the corresponding color, otherwise no change is made. In addition to checking what type 
  * of metric the KPI is to assign the correct logic for the color change.
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
 * This avoids updating the state when clicking inside the notification
 */

  function handleOuterClick(event) {
    event.stopPropagation();
  } 

/*
 * The following functions show the componente that allows to adjust the values of the KPI thresholds
  * and the component that shows the current values of the thresholds.
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