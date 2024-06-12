/**
 * @author Eduardo Francisco Lugo Quintana
 * Title component used throughout the application.
 */

import styled from "styled-components"

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
`

const TitleComponent = (props) => {
    return (
        <Title>{props.text}</Title>
    )
}

export default TitleComponent