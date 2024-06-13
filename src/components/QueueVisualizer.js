/**
 * @author Gustavo Tellez Mireles
 * Component to visualize the queue of calls in the call center in real time and
 * handling the logic of no longer showing the disconnected calls from a queue
 * before they got answered.
*/

import React, { useState, useEffect } from "react";
import LlamadaEsperaCard from "./LlamadaEsperaCard";

const QueueVisualizer = () => {
  const [queueItems, setQueueItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(null);

  // Effect hook to fetch active calls in queue and update disconnected calls
  useEffect(() => {
    // Fetch active calls in queue from backend
    const fetchActiveCallsInQueue = async () => {
      try {
        const response = await fetch("http://localhost:8080/queuedata/getActiveCallsInQueue");
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        
        if (data.length > 0 && data[0].Items) {
          const items = data[0].Items;
          const updatedQueueItems = await Promise.all(items.map(async (item) => {
            if (item.ContactID) {
              const clientName = await fetchClientName(item.ContactID);
              return { ...item, clientName };
            } else {
              return null; // Skip items that don't have ContactID
            }
          }));

          setQueueItems(updatedQueueItems.filter(item => item !== null));
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching active calls:", err);
        setIsLoading(false);
      }
    };

    // Fetch client name of the active calls in queue from the server
    const fetchClientName = async (contactId) => {
      try {
        const response = await fetch(`http://localhost:8080/agente/consultaCustomerInfo/${contactId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data.clientName;
      } catch (error) {
        console.error("Error fetching client name:", error);
        return "Name Unavailable"; // Return a default value if an error occurs
      }
    };

    // Update disconnected calls in the queue
    const updateDisconnectedCalls = async () => {
      try {
        await fetch("http://localhost:8080/queuedata/updateDisconnectedCalls", { method: 'PUT' });
      } catch (err) {
        console.error("Error updating disconnected calls:", err);
      }
    };

    // Start fetching data when the component mounts
    const interval = setInterval(() => {
      fetchActiveCallsInQueue();
      updateDisconnectedCalls();
    }, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Effect hook to generate timestamps for dummy contacts
  useEffect(() => {
    // Generate timestamps for fake contacts once when the component mounts
    const generateTimestamp = (multiplier) => {
      const initialTimestamp = Date.now();
      const timestamp = new Date(initialTimestamp + multiplier * -5000).toISOString();
      return timestamp;
    };

    const timestamp1 = generateTimestamp(1);
    const timestamp2 = generateTimestamp(2);
    const timestamp3 = generateTimestamp(3);
    const timestamp4 = generateTimestamp(4);
    const timestamp5 = generateTimestamp(5);
    const timestamp6 = generateTimestamp(6);
    setTimestamp({
      1: timestamp1,
      2: timestamp2,
      3: timestamp3,
      4: timestamp4,
      5: timestamp5,
      6: timestamp6,
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Combine real and dummy contacts into a single array
  const allContacts = [...queueItems];
  if (timestamp) {
    allContacts.push(
      { clientName: "Aldehil Sánchez", CurrentTime: timestamp[1] },
      { clientName: "Pablo Spínola", CurrentTime: timestamp[2] },
      { clientName: "Ramón Danzos", CurrentTime: timestamp[3] },
      { clientName: "Gustavo Tellez", CurrentTime: timestamp[4] },
      { clientName: "Eduardo Lugo", CurrentTime: timestamp[6] },
      { clientName: "Jorge Rodríguez", CurrentTime: timestamp[5] }
    );
  }

  // Sort all contacts by time
  allContacts.sort((a, b) => new Date(a.CurrentTime) - new Date(b.CurrentTime));
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {allContacts.length === 0 && (
          <p>There's no contacts in queue</p>
        )}
      </div>
      <>
        {allContacts.map((item) => (
          <LlamadaEsperaCard key={item.ContactID || item.clientName} clientName={item.clientName} timestamp={item.CurrentTime} />
        ))}
      </>
    </>
  );
};

export default QueueVisualizer;
