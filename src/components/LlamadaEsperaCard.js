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

const LlamadaEsperaCard = (props) => {
    const [elapsedTime, setElapsedTime] = useState('');
    const [clientName, setClientName] = useState('');

    // Fetch client name from contact ID
    useEffect(() => {
        const fetchClientName = async () => {
            try {
                const response = await fetch(`http://localhost:8080/agente/consultaCustomerInfo/${props.contactId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setClientName(data.clientName);
            } catch (error) {
                console.error("Error fetching client name:", error);
            }
        };

        fetchClientName();

        // Cleanup function
        return () => {
        };
    }, [props.contactId]);

    useEffect(() => {
        const calculateElapsedTime = () => {
            // Assuming queueStartTime is available in props
            const queueStartTime = props.timestamp; // Assuming props.timestamp contains the start time

            // If queueStartTime is not null or undefined
            if (queueStartTime) {
                // Transform the queueStartTime string
                const formattedQueueStartTime = queueStartTime.replace('T', ' ') + ' UTC';

                // Create Date objects
                const localQueueStartTime = new Date(formattedQueueStartTime);
                const now = new Date();

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
            <Attribute>Nombre del cliente: <Value>{clientName || "Nombre no disponible"}</Value></Attribute>
            <Attribute>Tiempo en espera: <Value style={{color: "red"}}>{elapsedTime}</Value></Attribute>
        </Card>
    );
};

export default LlamadaEsperaCard;
