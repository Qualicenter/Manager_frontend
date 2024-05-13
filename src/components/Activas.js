import styled from "styled-components";
import CardButton from "./Button";
import { useEffect, useState } from "react";

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

const LlamadaActivaCard = () => {
       
    //Datos dummy para organizar las llamadas
    const [arrLlamadas, setArrLlamadas] = useState([
        { idArr: 1, contenido: {id: 1, agente: 'Juan Perez', cliente: 'Pedro Gomez', tiempo: '2:30', sentimiento: 'POSITIVE', asistencia:'False'} },
        { idArr: 2, contenido: {id: 2, agente: 'Ana Rodriguez', cliente: 'Juan Gomez', tiempo: '3:15', sentimiento: 'NEGATIVE', asistencia:'False'} },
        { idArr: 3, contenido: {id: 3, agente: "María López", cliente: "Laura Martínez", tiempo: '1:45', sentimiento: "POSITIVE", asistencia:'False'} },
        { idArr: 4, contenido: {id: 4, agente: "Carlos Sánchez", cliente: "Ana García", tiempo: "4:00", sentimiento: "NEUTRAL", asistencia:'True'} },
        { idArr: 5, contenido: {id: 5, agente: "Sofía Ramirez", cliente: "José Hernández", tiempo: "2:10", sentimiento: "NEUTRAL", asistencia:'False'} },
        { idArr: 6, contenido: {id: 6, agente: "Diego Martinez", cliente: "Sandra Pérez", tiempo: "3:45", sentimiento: "NEGATIVE", asistencia:'False'} },
        { idArr: 7, contenido: {id: 7, agente: "Laura González", cliente: "Carlos Ruiz", tiempo: "2:50", sentimiento: "POSITIVE", asistencia:'False'} },
      ]);

      // Compara los sentimientos (negativo primero)
      const ordenarLlamadasSentimiento = (llamadas) => {
        const n = llamadas.length;
        let swapped;
      
        do {
          swapped = false;
          for (let i = 0; i < n - 1; i++) {
            if (llamadas[i].contenido.sentimiento !== "NEGATIVE" && llamadas[i + 1].contenido.sentimiento === "NEGATIVE") {
              [llamadas[i], llamadas[i + 1]] = [llamadas[i + 1], llamadas[i]];
              swapped = true;
            }
          }
        } while (swapped);
      
        return llamadas;
      };

      // Compara el estado de asistencia
      const ordenarLlamadasAsistencia = (llamadas) => {
        const n = llamadas.length;
        let swapped2;
      
        do {
          swapped2 = false;
          for (let i = 0; i < n - 1; i++) {
            if (llamadas[i].contenido.asistencia !== "True" && llamadas[i + 1].contenido.asistencia === "True") {
              [llamadas[i], llamadas[i + 1]] = [llamadas[i + 1], llamadas[i]];
              swapped2 = true;
            }
          }
        } while (swapped2);
      
        return llamadas;
      };
    
    //Actualiza los cambios en el arreglo de llamadas
    useEffect(() => {
        const llamadasOrdenadas = ordenarLlamadasSentimiento(arrLlamadas);

        const llamadasOrdenadasFinal = ordenarLlamadasAsistencia(llamadasOrdenadas);

        setArrLlamadas(llamadasOrdenadasFinal);
    }, [arrLlamadas]);



    return (
        //Se puede cambiar por un if por si no hay llamadas activas
        arrLlamadas.map((llamada) => {
            return (
                <Card>
                    <Attribute>Agente: <Value>{llamada.contenido.agente}</Value></Attribute>
                    <Attribute>Cliente: <Value>{llamada.contenido.cliente}</Value></Attribute>
                    <Attribute>Tiempo: <Value style={{color: "red", fontWeight: 600}}>{llamada.contenido.tiempo}</Value></Attribute>
                    <Attribute>Sentimiento: <Value>{llamada.contenido.sentimiento}</Value></Attribute>
                    <Attribute>Asistencia: <Value style={{color: "red", fontWeight: 600}}>{llamada.contenido.asistencia}</Value></Attribute>
                    <CardButton txt='Monitorear' />
                    <CardButton txt='Transcripción' />
                </Card>
            );
        })

    )
}

export default LlamadaActivaCard;