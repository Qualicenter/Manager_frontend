import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useState, useRef } from "react";
import { MdOutlineAddAlert } from "react-icons/md";

const Card = styled.div`
    background-color: #fff;
    width: 200px;
    height: 220px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    gap: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
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

  const [inicioLlamada, setInicioLlamada] = useState('');
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const {sentimientoInfo} = props;
  const [arrLlamadasActivas, setArrLlamadasActivas] = useState([]);
  const {setContactId} = props;
  const [url] = useState("http://localhost:8080/agente/consultaContacts");
  const arrLlamadasPrev = useRef();
  const notificaciones = props.notificaciones;
  // const setNotificaciones = props.setNotificaciones;

  const descargar = useCallback(async () => {
    try {
      /* eslint-disable */
        const responseActiva = await fetch(url);

        
        const dataActiva = await responseActiva.json();
        if (!dataActiva[0].contactId){
          console.error("No hay llamadas activas")
          return;
        } else {
          setContactId(dataActiva[0].contactId);
        }

        
        setInicioLlamada(dataActiva[0].EnqueueTimestamp);
        const dataTotal = [...dataActiva, ...dataPruebasActivas];

        const arrNuevo = dataTotal.map((llamada, index) => {
            let sentimiento;

            if (index < dataActiva.length) {
                // Este elemento es de dataActiva
                sentimiento = sentimientoInfo;
            } else {
                // Este elemento es de dataPruebasActivas
                sentimiento = llamada.Sentimiento;
            }

            const transcripcion = {  
                contenido:{
                    id: uuidv4(),
                    // Nombre del agente
                    agente: llamada.NombreAgente,
                    cliente: llamada.NombreCliente,
                    tiempo: elapsedTime,
                    sentimiento: sentimiento,
                    // Asistencia a cambiar
                    asistencia:'False',
                    usernameAgente: llamada.UserNameAgente
                }
            };
            
            return transcripcion;
        });
       
        setArrLlamadasActivas(arrNuevo);

    } catch (error) {
<<<<<<< HEAD
      // console.error('Error al descargar los datos:', error);
=======
      console.log("",error);
      setInicioLlamada('');
>>>>>>> d8ff5cc8dc0a2989f74db15394c78a858cd0b85f
      const arrNuevo = [...dataPruebasActivas].map((llamada)  => {
        const transcripcion = {  
          contenido:{
            id: uuidv4(),
            // Nombre del agente
            agente: llamada.NombreAgente,
            cliente: llamada.NombreCliente,
            tiempo: elapsedTime,
            sentimiento: llamada.Sentimiento,
            // Asistencia a cambiar
            asistencia:'False',
            usernameAgente: llamada.UserNameAgente
          }};
        return transcripcion;
      });
      setArrLlamadasActivas(arrNuevo);
    }
  }, [url, elapsedTime, setInicioLlamada]);
       
    
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
    
    const ordenarLlamadasAsistencia = (llamadas) => {
      return [...llamadas].sort((a, b) => {
        if (a.contenido.asistencia === "True") return -1;
        if (b.contenido.asistencia === "True") return 1;
        return 0;
      });
    };
    

    
    const arrLlamadasPrevias = arrLlamadasPrev.current

    const organizar = useCallback(async () =>{
      if (JSON.stringify(arrLlamadasActivas) !== JSON.stringify(arrLlamadasPrevias)) {
        const llamadasOrdenadas = ordenarLlamadasSentimiento(arrLlamadasActivas);
        const llamadasOrdenadasFinal = ordenarLlamadasAsistencia(llamadasOrdenadas);
        setArrLlamadasActivas(llamadasOrdenadasFinal);
      }
    }, [arrLlamadasActivas, arrLlamadasPrevias]);
    
    const calculateElapsedTime = (inicioLlamada) => {
      const EnqueueTimestamp = new Date(inicioLlamada);
      const currentTimestamp = new Date();
      const elapsedTimeInMilliseconds = currentTimestamp.getTime() - EnqueueTimestamp.getTime();
      const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
      const minutes = Math.floor(elapsedTimeInSeconds / 60);
      const seconds = elapsedTimeInSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
      //Actualiza los cambios en el arreglo de llamadas
      useEffect(() => {
<<<<<<< HEAD
        // console.log("Obteniendo llamadas activas")
        const interval = setInterval(descargar, 3000); // Descargar cada 5 segundos
=======
        console.log("Obteniendo llamadas activas")
        const interval = setInterval(descargar, 4000); // Descargar cada 5 segundos
>>>>>>> d8ff5cc8dc0a2989f74db15394c78a858cd0b85f
        arrLlamadasPrev.current = arrLlamadasActivas;
        organizar();
        return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
      }, [descargar, arrLlamadasActivas, organizar, setContactId]);


      useEffect(() => { 
        if (inicioLlamada === '') {
            setElapsedTime('00:00');
        } else {
            const duracion = calculateElapsedTime(inicioLlamada);
            setElapsedTime(duracion);
        }
      }, [inicioLlamada, setElapsedTime, calculateElapsedTime]);

    const showTapIconHandler = (username) => {
      // Cambiar el valor del atributo asistencia en el objeto notificaciones a traves del setter setNotificaciones
      let notificacionesFiltradas = {...notificaciones};
      notificacionesFiltradas[username].asistencia = false;
      props.setNotificacionesAgente(notificacionesFiltradas[username].notificaciones);
      props.showCentroNotificacionesHandler();
    }

    return (
        //Se puede cambiar por un if por si no hay llamadas activas
        arrLlamadasActivas.map((llamada) => {
          // //console.log("Llamadas RENDEREANDO:", arrLlamadas)
            return (
                <Card key={llamada.contenido.usernameAgente}>
                    <ButtonAlert
                      onClick={() => showTapIconHandler(llamada.contenido.usernameAgente)}
                      className={`${notificaciones[llamada.contenido.usernameAgente] ? "button-alert-icon-enabled" : "button-alert-icon-disabled"} ${notificaciones[llamada.contenido.usernameAgente]?.asistencia ? "button-alert-icon-red" : ""}`}>
                        <IconAlert/>
                    </ButtonAlert>
                    <Attribute>Agente: <Value>{llamada.contenido.agente}</Value></Attribute>
                    <Attribute>Cliente: <Value>{llamada.contenido.cliente}</Value></Attribute>
                    <Attribute>Tiempo: <Value style={{color: "red", fontWeight: 600}}>{llamada.contenido.tiempo}</Value></Attribute>
                    <Attribute>Sentimiento: <Value>{llamada.contenido.sentimiento}</Value></Attribute>
                    <Button onClick={props.funcVentanaTranscripcion}>Transcripcion</Button>
                </Card>
            );
        })

    )
}

export default LlamadaActivaCard;