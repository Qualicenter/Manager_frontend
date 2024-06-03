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
`

const LlamadaActivaCard = (props) => {


  const [arrLlamadasActivas, setArrLlamadasActivas] = useState([]);
  const [url] = useState("http://localhost:8080/agente/consultaContacts");
  const arrLlamadasPrev = useRef();

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

  const descargar = useCallback(async () => {
    try {

      /* eslint-disable */
        
        

        const responseActiva = await fetch(url);
        const dataActiva = await responseActiva.json();
       
        const arrNuevo = [...dataActiva, ...dataPruebasActivas].map((llamada)  => {
          const transcripcion = {  
            contenido:{
              id: uuidv4(),
              // Nombre del agente
              agente: llamada.NombreAgente,
              cliente: llamada.NombreCliente,
              tiempo: llamada.ElapsedTime,
              sentimiento: llamada.Sentimiento,
              // Asistencia a cambiar
              asistencia:'False',
              usernameAgente: llamada.UserNameAgente
            }};
          return transcripcion;
        });
       
        setArrLlamadasActivas(arrNuevo);
      
      
      
    } catch (error) {
      console.error('Error al descargar los datos:', error);
      const arrNuevo = [...dataPruebasActivas].map((llamada)  => {
        const transcripcion = {  
          contenido:{
            id: uuidv4(),
            // Nombre del agente
            agente: llamada.NombreAgente,
            cliente: llamada.NombreCliente,
            tiempo: llamada.ElapsedTime,
            sentimiento: llamada.Sentimiento,
            // Asistencia a cambiar
            asistencia:'False',
            usernameAgente: llamada.UserNameAgente
          }};
        return transcripcion;
      });
      setArrLlamadasActivas(arrNuevo);
    }
  }, [url]);
       
    //Datos dummy para organizar las llamadasz
  // const [arrLlamadas, setArrLlamadas] = useState([
  //     {idArr:1,  contenido: {id: 1, agente: 'Juan Perez', cliente: 'Pedro Gomez', tiempo: '2:30', sentimiento: 'POSITIVE', asistencia:'False'} },
  //     {idArr:2, contenido: {id: 2, agente: 'Ana Rodriguez', cliente: 'Juan Gomez', tiempo: '3:15', sentimiento: 'NEGATIVE', asistencia:'False'} },
  //     {idArr:3,  contenido: {id: 3, agente: "María López", cliente: "Laura Martínez", tiempo: '1:45', sentimiento: "POSITIVE", asistencia:'False'} },
  //     {idArr:4,  contenido: {id: 4, agente: "Carlos Sánchez", cliente: "Ana García", tiempo: "4:00", sentimiento: "NEUTRAL", asistencia:'True'} },
  //     {idArr:5,  contenido: {id: 5, agente: "Sofía Ramirez", cliente: "José Hernández", tiempo: "2:10", sentimiento: "NEUTRAL", asistencia:'False'} },
  //     {idArr:6,  contenido: {id: 6, agente: "Diego Martinez", cliente: "Sandra Pérez", tiempo: "3:45", sentimiento: "NEGATIVE", asistencia:'False'} },
  //     {idArr:7,  contenido: {id: 7, agente: "Laura González", cliente: "Carlos Ruiz", tiempo: "2:50", sentimiento: "POSITIVE", asistencia:'False'} },
  //     { idArr: 8, contenido: {id: 8, agente: "Carlos Sánchez", cliente: "Ana García", tiempo: "4:00", sentimiento: "NEUTRAL", asistencia:'True'} },
  //   ]);

    
    const ordenarLlamadasSentimiento = (llamadas) => {
      return [...llamadas].sort((a, b) => {
        if (a.contenido.sentimiento === "NEGATIVE") return -1;
        if (b.contenido.sentimiento === "NEGATIVE") return 1;
        return 0;
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
        //console.log("Llamadas ANTES del sort:", arrLlamadasActivas);
        const llamadasOrdenadas = ordenarLlamadasSentimiento(arrLlamadasActivas);
        const llamadasOrdenadasFinal = ordenarLlamadasAsistencia(llamadasOrdenadas);
        setArrLlamadasActivas(llamadasOrdenadasFinal);
        //console.log("Llamadas DESPUES del sort:", llamadasOrdenadasFinal);
      }
    }, [arrLlamadasActivas, arrLlamadasPrevias]);
    
      //Actualiza los cambios en el arreglo de llamadas
      useEffect(() => {
    
        const interval = setInterval(descargar, 3000); // Descargar cada 5 segundos
        arrLlamadasPrev.current = arrLlamadasActivas;
        organizar();
        return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
      }, [descargar, arrLlamadasActivas, organizar]);

    return (
        //Se puede cambiar por un if por si no hay llamadas activas
        
        arrLlamadasActivas.map((llamada) => {
          //console.log("Llamadas RENDEREANDO:", arrLlamadas)
            return (
                <Card key={llamada.contenido.id}>
                    <ButtonAlert><IconAlert/></ButtonAlert>
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