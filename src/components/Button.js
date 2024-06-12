/**
 * @author Eduardo Francisco Lugo Quintana
 * Button component used throughout the application.
 */

import styled from "styled-components";

/* Styles for the button */
const Button = styled.button`
    width: 127px;
    height: 27px;
    background: #00A2E3;
    color:  white;
    font-size: 12px;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const CardButton = (props) => {
    return (
        <Button>{props.txt}</Button>
    );
}

export default CardButton;