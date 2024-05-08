import styled from "styled-components";
import CardButton from "./Button";

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
    return (
        <Card>
            <Attribute>Agente: <Value>{props.agente}</Value></Attribute>
            <Attribute>Cliente: <Value>{props.cliente}</Value></Attribute>
            <Attribute>Tiempo: <Value style={{color: "red", fontWeight: 600}}>{props.tiempo}</Value></Attribute>
            <Attribute>Sentimiento: <Value>{props.sentimiento}</Value></Attribute>
            <CardButton txt='Monitorear' />
            <CardButton txt='Transcripción' />
        </Card>
    )
}

export default LlamadaActivaCard