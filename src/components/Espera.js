import styled from "styled-components";

const Card = styled.div`
    background-color: #fff;
    width: 100%;
    min-height: 57px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 5px;
    margin-bottom: 20px;
`

const Attribute = styled.h3`
    font-size: 16px;
    font-weight: 600;
    display: flex;
    gap: 5px;
`

const Value = styled.p`
    font-size: 16px;
    font-weight: 400;
`

const LlamadaEsperaCard = (props) => {
    return (
        <Card>
            <Attribute>Nombre del cliente: <Value>{props.cliente}</Value></Attribute>
            <Attribute>Tiempo en espera: <Value style={{color: "red"}}>{props.tiempo}</Value></Attribute>
        </Card>
    )
}

export default LlamadaEsperaCard