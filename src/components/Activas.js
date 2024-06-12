/**
 * @author Angel Armando Marquez Curiel
 * @author
 * @author
 * 
 * Component that shows the information of all the active calls
*/

import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useState, useRef } from "react";
import { MdOutlineAddAlert } from "react-icons/md";

/*Style characteristics for the components used in the active calls*/
const Card = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 200px;
    height: 220px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    gap: 10px;
    padding: 5px 5px;
`

const Attribute = styled.h3`
    font-size: 14px;
    font-weight: 600;
    display: flex;
    gap: 5px;
`

const Value = styled.p`
    font-size: 14px;
    font-weight: 400;
`

const Button = styled.button`
    width: 127px;
    height: 27px;
    background: #00A2E3;
    color:  white;
    font-size: 12px;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
`

const IconAlert = styled(MdOutlineAddAlert)`
    font-size: 25px;
`
const ButtonAlert = styled.button`
    align-self: flex-end;
    border-radius: 5px;

    &.button-alert-icon-disabled {
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.button-alert-icon-enabled {
      pointer-events: all;
      opacity: 1;
      cursor: pointer;
    }
    
    &.button-alert-icon-red {
      background-color: red;
      border-color: red;
    }
`
const dataPruebasActivas = [
  {
      "NombreCliente": "Juan Hernández",
      "NombreAgente": "María López",
      "InitiationTimestamp": "2024-05-27T21:48:40.526Z",
      "CurrentTime": "2024-06-01T06:22:42.117319",
      "ElapsedTime": "0:32",
      "Sentimiento": "NEUTRAL",
      "UserNameAgente": "MariaLopez"
  },
  {
      "NombreCliente": "Pedro Ramírez",
      "NombreAgente": "Ana García",
      "InitiationTimestamp": "2024-05-27T20:10:20.352Z",
      "CurrentTime": "2024-06-01T06:11:20.757407",
      "ElapsedTime": "1:24",
      "Sentimiento": "NEGATIVE",
      "UserNameAgente": "AnaGarcia"
  },
  {
      "NombreCliente": "Luisa Martínez",
      "NombreAgente": "Carlos Rodríguez",
      "InitiationTimestamp": "2024-05-27T19:21:14.772Z",
      "CurrentTime": "2024-06-01T06:06:47.145375",
      "ElapsedTime": "1:12",
      "Sentimiento": "NEUTRAL",
      "UserNameAgente": "CarlosRodriguez"
  },
  {
    "NombreCliente": "Andrés Pérez",
    "NombreAgente": "Laura Sánchez",
    "InitiationTimestamp": "2024-05-27T19:21:14.772Z",
    "CurrentTime": "2024-06-01T06:06:47.145375",
    "ElapsedTime": "2:32",
    "Sentimiento": "POSITIVE",
    "UserNameAgente": "LauraSanchez"
}
];

const LlamadaActivaCard = (props) => {

  /*State variables and props from parent component*/
  const [inicioLlamada, setInicioLlamada] = useState('');
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [newColor, setNewColor] = useState('green');
  const {sentimientoInfo} = props;
  const [arrLlamadasActivas, setArrLlamadasActivas] = useState([]);
  const {setContactId} = props;
  const [url] = useState("http://localhost:8080/agente/consultaContacts");
  const arrLlamadasPrev = useRef();
  const notificaciones = props.notificaciones;

  /*Function to fetch the active calls*/
  const descargar = useCallback(async () => {
    try {
        /* eslint-disable */
        const responseActiva = await fetch(url);
        const dataActiva = await responseActiva.json();

        if (!dataActiva[0].contactId){
          return;
        } else {
          setContactId(dataActiva[0].contactId);
        }
        
        setInicioLlamada(dataActiva[0].EnqueueTimestamp);
        const dataTotal = [...dataActiva, ...dataPruebasActivas];

        const arrNuevo = dataTotal.map((llamada, index) => {
            let sentimiento;
            if (index < dataActiva.length) {
                sentimiento = sentimientoInfo;
            } else {
                sentimiento = llamada.Sentimiento;
            }

            /*Stores the information of each call */
            const transcripcion = {  
                contenido:{
                    id: uuidv4(),
                    agente: llamada.NombreAgente,
                    cliente: llamada.NombreCliente,
                    tiempo: elapsedTime,
                    sentimiento: sentimiento,
                    asistencia:'False',
                    usernameAgente: llamada.UserNameAgente
                }
            };
            
            return transcripcion;
        });
       /*Updates the call's array with the downloaded information */
        setArrLlamadasActivas(arrNuevo);

    } catch (error) {
      setInicioLlamada('');
      const arrNuevo = [...dataPruebasActivas].map((llamada)  => {
        /*Stores the test active calls*/
        const transcripcion = {  
          contenido:{
            id: uuidv4(),
            agente: llamada.NombreAgente,
            cliente: llamada.NombreCliente,
            tiempo: elapsedTime,
            sentimiento: llamada.Sentimiento,
            asistencia:'False',
            usernameAgente: llamada.UserNameAgente
          }};
        return transcripcion;
      });
      setArrLlamadasActivas(arrNuevo);
    }
  }, [url, elapsedTime, setInicioLlamada]);
       
  /*Order the array of calls*/
  const ordenarLlamadasSentimiento = (llamadas) => {
    return [...llamadas].sort((a, b) => {
        const sentimientoOrder = {
            "NEGATIVE" : 0,
            "NEUTRAL": 1,
            "POSITIVE": 2,
        };
        const aSentimiento = sentimientoOrder[a.contenido.sentimiento];
        const bSentimiento = sentimientoOrder[b.contenido.sentimiento];

        return aSentimiento - bSentimiento;
    });
  };

  /*Order the array of calls by need of assistance*/
  const ordenarLlamadasAsistencia = (llamadas) => {
    return [...llamadas].sort((a, b) => {
      if (a.contenido.asistencia === "True") return -1;
      if (b.contenido.asistencia === "True") return 1;
      return 0;
    });
  };
  
  /*Function to organize the calls by sentiment*/
  const arrLlamadasPrevias = arrLlamadasPrev.current
  const organizar = useCallback(async () =>{
    if (JSON.stringify(arrLlamadasActivas) !== JSON.stringify(arrLlamadasPrevias)) {
      const llamadasOrdenadas = ordenarLlamadasSentimiento(arrLlamadasActivas);
      const llamadasOrdenadasFinal = ordenarLlamadasAsistencia(llamadasOrdenadas);
      setArrLlamadasActivas(llamadasOrdenadasFinal);
    }
  }, [arrLlamadasActivas, arrLlamadasPrevias]);
    
  /*Function to calculate the elapsed time of a call*/
  const calculateElapsedTime = (inicioLlamada) => {
    const EnqueueTimestamp = new Date(inicioLlamada);
    const currentTimestamp = new Date();
    const elapsedTimeInMilliseconds = currentTimestamp.getTime() - EnqueueTimestamp.getTime();
    const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
    const minutes = Math.floor(elapsedTimeInSeconds / 60);
    const seconds = elapsedTimeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /*Function to change the color of the elapsed time of a call*/
  const changeColor = (duracion) => {
    const [minutes, seconds] = duracion.split(':').map(Number);
    const timeInSeconds = minutes * 60 + seconds;

    if (timeInSeconds < 150) {
      return 'green'; // Less than 2:30
    } else if (timeInSeconds < 180) {
      return 'orange'; // Between 2:30 and 3:00
    } else {
      return 'red'; // Greaer than 3:00
    }
  };
  
  /* Fetch active calls when component mounts*/
  useEffect(() => {
    const interval = setInterval(descargar, 4000); 
    arrLlamadasPrev.current = arrLlamadasActivas;
    organizar();
    return () => clearInterval(interval);
  }, [descargar, arrLlamadasActivas, organizar, setContactId]);


  /*Update the elapsed time of a call*/
  useEffect(() => { 
    if (inicioLlamada === '') {
        setElapsedTime('00:00');
    } else {
        const duracion = calculateElapsedTime(inicioLlamada);
        setElapsedTime(duracion);
        setNewColor(changeColor(elapsedTime));
    }
  }, [inicioLlamada, setElapsedTime, calculateElapsedTime, elapsedTime]);

  /*Function to show the notification center with the filtered notifications*/
  const showTapIconHandler = (username) => {
    let notificacionesFiltradas = {...notificaciones};
    notificacionesFiltradas[username].asistencia = false; // Change the assistance value to false when the notification is clicked
    props.setNotificacionesAgente(notificacionesFiltradas[username].notificaciones);
    props.showCentroNotificacionesHandler();
  }

  /* Return the active calls*/
  return (
      //Se puede cambiar por un if por si no hay llamadas activas
      arrLlamadasActivas.map((llamada) => {
          return (
              <Card key={llamada.contenido.usernameAgente}>
                  <ButtonAlert
                    onClick={() => showTapIconHandler(llamada.contenido.usernameAgente)}
                    className={`${notificaciones[llamada.contenido.usernameAgente] ? "button-alert-icon-enabled" : "button-alert-icon-disabled"} ${notificaciones[llamada.contenido.usernameAgente]?.asistencia ? "button-alert-icon-red" : ""}`}>
                      <IconAlert/>
                  </ButtonAlert>
                  <Attribute>Agente: <Value>{llamada.contenido.agente}</Value></Attribute>
                  <Attribute>Cliente: <Value>{llamada.contenido.cliente}</Value></Attribute>
                  <Attribute>Tiempo: <Value style={{color: newColor, fontWeight: 600}}>{llamada.contenido.tiempo}</Value></Attribute>
                  <Attribute>Sentimiento: <Value>{llamada.contenido.sentimiento}</Value></Attribute>
                  <Button onClick={props.funcVentanaTranscripcion}>Transcripcion</Button>
              </Card>
          );
      })

  )
}

export default LlamadaActivaCard;