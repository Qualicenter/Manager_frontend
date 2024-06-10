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

const Attribute = styled.h3`
    font-size: 16px;
    font-weight: 600;
    display: flex;
    gap: 5px;
`;

const Value = styled.p`
    font-size: 16px;
    font-weight: 400;
`;

// Component to visualize an individual call in queue with the client name and the time
const LlamadaEsperaCard = (props) => {
    const [elapsedTime, setElapsedTime] = useState('');

    // Effect hook to calculate elapsed time
    useEffect(() => {
        const calculateElapsedTime = () => {
            // Assuming queueStartTime is available in props
            const queueStartTime = props.timestamp;

            // If queueStartTime is not null or undefined
            if (queueStartTime) {
                // Transform the queueStartTime string
                const formattedQueueStartTime = queueStartTime.replace('T', ' ') + ' UTC';

                // Create Date objects
                const localQueueStartTime = new Date(formattedQueueStartTime);
                const now = new Date();
                now.setSeconds(now.getSeconds() + 3); // Add 3 seconds to account for the delay
                
                // Calculate the time difference in milliseconds
                const timeDifference = now - localQueueStartTime;

                // Convert timeDifference to hours, minutes, and seconds
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                // Update the elapsed time state
                setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setElapsedTime(''); // Reset elapsedTime if queueStartTime is null
            }
        };

        // Calculate elapsed time initially
        calculateElapsedTime();

        // Update elapsed time every second
        const timerInterval = setInterval(calculateElapsedTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timerInterval);
    }, [props.timestamp]);

    return (
        <Card>
            <Attribute>Client Name: <Value>{props.clientName}</Value></Attribute>
            <Attribute>Waiting time: <Value style={{color: "red"}}>{elapsedTime}</Value></Attribute>
        </Card>
    );
};

export default LlamadaEsperaCard;
