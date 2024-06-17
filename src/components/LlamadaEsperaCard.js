/**
 * @author Gustavo Tellez Mireles
 * Component to visualize an individual call in queue with the client name and the time
*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled components for the card
const Card = styled.div`
    background-color: #fff;
    width: 100%;
    min-height: 57px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 5px;
    margin-bottom: 20px;
`;

// Styled components for the attributes
const Attribute = styled.div`
    font-size: 16px;
    font-weight: 600;
    display: flex;
    gap: 5px;
`;

// Styled components for the client name
const ClientName = styled.span`
    font-weight: normal;
`;

// Styled components for the timer value (changes color based on elapsed time)
const Value = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.timerColor || "black"};
`;

// Component to visualize an individual call in queue with the client name and the time
const LlamadaEsperaCard = (props) => {
    const [elapsedTime, setElapsedTime] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Effect hook to calculate elapsed time
    useEffect(() => {
        const calculateElapsedTime = () => {
            const queueStartTime = props.timestamp;
            // If queueStartTime is not null or undefined
            if (queueStartTime) {
                // Transform the queueStartTime string
                const formattedQueueStartTime = queueStartTime.replace('T', ' ') + ' UTC';
                const localQueueStartTime = new Date(formattedQueueStartTime);
                const now = new Date();
                now.setSeconds(now.getSeconds() + 6); // Adding 3 seconds to account for delay
                
                // Calculate the difference between now and the queue start time
                const timeDifference = now - localQueueStartTime;
                const secondsElapsed = Math.floor(timeDifference / 1000);
                setElapsedSeconds(secondsElapsed);

                // Convert timeDifference to hours, minutes, and seconds
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                // Set the elapsed time string
                setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
            } else {

                // If queueStartTime is null or undefined, reset elapsed time and seconds
                setElapsedTime('');
                setElapsedSeconds(0);
            }
        };

        calculateElapsedTime();

        const timerInterval = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(timerInterval);
    }, [props.timestamp]);

    // Determine timer color based on elapsed seconds
    let timerColor = "black";
    if (elapsedSeconds <= 20) {
        timerColor = "green";
    } else if (elapsedSeconds > 20 && elapsedSeconds <= 30) {
        timerColor = "orange";
    } else {
        timerColor = "red";
    }

    return (
        <Card>
            <Attribute>
                Client Name: <ClientName>{props.clientName}</ClientName>
            </Attribute>
            <Attribute>
                Waiting time: <Value timerColor={timerColor}>{elapsedTime}</Value>
            </Attribute>
        </Card>
    );
};

export default LlamadaEsperaCard;
