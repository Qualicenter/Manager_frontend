import styled from "styled-components";

const Card = styled.div`
    background-color: #fff;
    width: 185px;
    height: 210px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    gap: 10px;
    margin-bottom: 57px;
`

const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;
`

const Value = styled.p`
    font-size: 60px;
    font-weight: 600;
    color: #009F23;
`

const Description = styled.p`
    font-size: 15px;
    font-weight: 600;
`

const KpiCard = (props) => {
    return (
        <Card>
            <Title>{props.title}</Title>
            <Value>{props.value}</Value>
            <Description>{props.description}</Description>
        </Card>
    )
}

export default KpiCard