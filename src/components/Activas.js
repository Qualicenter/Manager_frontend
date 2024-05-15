import styled from "styled-components";
import CardButton from "./Button";
import { useCallback, useEffect, useState, useRef } from "react";

const Card = styled.div`
    background-color: #fff;
    width: 155px;
    height: 210px;
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

const LlamadaActivaCard = (props) => {

  const arrLlamadasPrev = useRef();
       
    //Datos dummy para organizar las llamadas
  const [arrLlamadas, setArrLlamadas] = useState([
      { idArr: 1, contenido: {id: 1, agente: 'Juan Perez', cliente: 'Pedro Gomez', tiempo: '2:30', sentimiento: 'POSITIVE', asistencia:'False'} },
      { idArr: 2, contenido: {id: 2, agente: 'Ana Rodriguez', cliente: 'Juan Gomez', tiempo: '3:15', sentimiento: 'NEGATIVE', asistencia:'False'} },
      { idArr: 3, contenido: {id: 3, agente: "María López", cliente: "Laura Martínez", tiempo: '1:45', sentimiento: "POSITIVE", asistencia:'False'} },
      { idArr: 4, contenido: {id: 4, agente: "Carlos Sánchez", cliente: "Ana García", tiempo: "4:00", sentimiento: "NEUTRAL", asistencia:'True'} },
      { idArr: 5, contenido: {id: 5, agente: "Sofía Ramirez", cliente: "José Hernández", tiempo: "2:10", sentimiento: "NEUTRAL", asistencia:'False'} },
      { idArr: 6, contenido: {id: 6, agente: "Diego Martinez", cliente: "Sandra Pérez", tiempo: "3:45", sentimiento: "NEGATIVE", asistencia:'False'} },
      { idArr: 7, contenido: {id: 7, agente: "Laura González", cliente: "Carlos Ruiz", tiempo: "2:50", sentimiento: "POSITIVE", asistencia:'False'} },
      // { idArr: 8, contenido: {id: 8, agente: "Carlos Sánchez", cliente: "Ana García", tiempo: "4:00", sentimiento: "NEUTRAL", asistencia:'True'} },
    ]);

    
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
    
    //Actualiza los cambios en el arreglo de llamadas
    useEffect(() => {
      arrLlamadasPrev.current = arrLlamadas
      organizar();
    }, []);
    
    const arrLlamadasPrevias = arrLlamadasPrev.current

    const organizar = useCallback(async () =>{
      if (JSON.stringify(arrLlamadas) !== JSON.stringify(arrLlamadasPrevias)) {
        console.log("Llamadas ANTES del sort:", arrLlamadas);
        const llamadasOrdenadas = ordenarLlamadasSentimiento(arrLlamadas);
        const llamadasOrdenadasFinal = ordenarLlamadasAsistencia(llamadasOrdenadas);
        setArrLlamadas(llamadasOrdenadasFinal);
        console.log("Llamadas DESPUES del sort:", llamadasOrdenadasFinal);
      }
    }, [arrLlamadas, arrLlamadasPrevias]);
    

    return (
        //Se puede cambiar por un if por si no hay llamadas activas
        
        arrLlamadas.map((llamada) => {
          console.log("Llamadas RENDEREANDO:", arrLlamadas)
            return (
                <Card key={llamada.idArr}>
                    <Attribute>Agente: <Value>{llamada.contenido.agente}</Value></Attribute>
                    <Attribute>Cliente: <Value>{llamada.contenido.cliente}</Value></Attribute>
                    <Attribute>Tiempo: <Value style={{color: "red", fontWeight: 600}}>{llamada.contenido.tiempo}</Value></Attribute>
                    <Attribute>Sentimiento: <Value>{llamada.contenido.sentimiento}</Value></Attribute>
                    <Attribute>Asistencia: <Value style={{color: "red", fontWeight: 600}}>{llamada.contenido.asistencia}</Value></Attribute>
                    <CardButton txt='Transcripción' />
                </Card>
            );
        })

    )
}

export default LlamadaActivaCard;