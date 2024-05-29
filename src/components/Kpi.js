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

  const [showCentroNotificaciones, setShowCentroNotificaciones] =
    useState(false);
  const [showValoresActuales, setShowValoresActuales] = useState(false);

  const [apropiadoValue, setApropiadoValue] = useState(0);
  const [tolerableValue, setTolerableValue] = useState(0);
  const [excesivoValue, setExcesivoValue] = useState(0);

  useEffect(() => {
    if (props.title === "Abandonment rate") {
      if (
        apropiadoValue < tolerableValue &&
        tolerableValue < excesivoValue &&
        apropiadoValue <= 100 &&
        tolerableValue <= 100 &&
        excesivoValue <= 100
      ) {
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
            setEstiloKpi("pelgro");
          }
        }
      }
      if (apropiadoValue === 0 && tolerableValue === 0 && excesivoValue === 0) {
        setEstiloKpi("normal");
      }
    }

    if (props.title === "Customer hold time") {
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

    //CONSULTAR COMO DEBE SER EL AJUSTE DE LOS VALORES DE OCUPANCIA
    if (props.title === "Occupancy") {
      if (
        apropiadoValue > tolerableValue &&
        tolerableValue > excesivoValue &&
        apropiadoValue <= 100 &&
        tolerableValue <= 100 &&
        excesivoValue <= 100
      ) {
        console.log("Valores ajustados correctamente");
        if (props.value <= excesivoValue) {
          setEstiloKpi("peligro");
        } else {
          if (props.value <= tolerableValue) {
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

  function handleOuterClick(event) {
    // Prevent state update when clicking inside notification center
    event.stopPropagation();
  }

  const showCentroNotificacionesHandler = () => {
    setShowCentroNotificaciones(!showCentroNotificaciones);
    console.log(apropiadoValue);
    console.log(tolerableValue);
    console.log(excesivoValue);
  };

  const showValoresActualesHandler = () => {
    setShowValoresActuales(!showValoresActuales);
  };

  return (
    <Card>
      {showCentroNotificaciones && (
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
      <Value className={estiloKpi}>{props.value} {props.measure}</Value>
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
