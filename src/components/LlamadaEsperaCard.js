/**
 * @author Gustavo Tellez Mireles
 * Component to visualize an individual call in queue with the client name and the time
*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Card = styled.div`
    background-color: #fff;
    width: 100%;
    min-height: 57px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 5px;
    margin-bottom: 20px;
`;

const Attribute = styled.div`
    font-size: 16px;
    font-weight: 600;
    display: flex;
    gap: 5px;
`;

const ClientName = styled.span`
    font-weight: normal;
`;

const Value = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.timerColor || "black"};
`;

const LlamadaEsperaCard = (props) => {
    const [elapsedTime, setElapsedTime] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        const calculateElapsedTime = () => {
            const queueStartTime = props.timestamp;
            if (queueStartTime) {
                const formattedQueueStartTime = queueStartTime.replace('T', ' ') + ' UTC';
                const localQueueStartTime = new Date(formattedQueueStartTime);
                const now = new Date();
                now.setSeconds(now.getSeconds() + 6); // Adding 3 seconds to account for delay
                
                const timeDifference = now - localQueueStartTime;
                const secondsElapsed = Math.floor(timeDifference / 1000);

                // Update elapsed time state
                setElapsedSeconds(secondsElapsed);

                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
            } else {
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
