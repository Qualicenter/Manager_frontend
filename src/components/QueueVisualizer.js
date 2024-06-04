import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import LlamadaEsperaCard from "./LlamadaEsperaCard";

const QueueVisualizer = () => {
  const [queueItems, setQueueItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    // Fetch contact information from AWS Connect
    const fetchContactInfo = async (item) => {
      const connect = new AWS.Connect();
      const params = {
        InstanceId: "e730139b-8673-445e-8307-c3a9250199a2",
        ContactId: item.ContactID
      };

      try {
        const result = await connect.describeContact(params).promise();
        console.log(`Contact ${item.ContactID} DisconnectTimestamp:`, result.Contact.DisconnectTimestamp ? "Exists" : "Doesn't exist");
        if (result.Contact.DisconnectTimestamp) {
          // Update InQueue attribute to false if contact has been disconnected
          await updateItemInQueue(item, false);
        }
        // Fetch client name
        const clientName = await fetchClientName(item.ContactID);
        console.log(`Fetched client name for contact ${item.ContactID}: ${clientName}`);
        return { ...item, clientName };
      } catch (err) {
        console.error(`Error fetching contact info for ${item.ContactID}:`, err);
        return item; // Return the original item if an error occurs
      }
    };

    // Fetch client name from the server
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
        return "Nombre no disponible"; // Return a default value if an error occurs
      }
    };

    // Update InQueue attribute in DynamoDB to false
    const updateItemInQueue = async (item, newValue) => {
      const dynamoDB = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: "CallsInQueueQualicenter",
        Key: {
          "ContactID": item.ContactID
        },
        UpdateExpression: "set InQueue = :val",
        ExpressionAttributeValues: {
          ":val": newValue
        }
      };

      try {
        await dynamoDB.update(params).promise();
        console.log(`Updated InQueue value for contact ${item.ContactID} to ${newValue}`);
      } catch (err) {
        console.error(`Error updating InQueue value for contact ${item.ContactID}:`, err);
      }
    };


    const interval = setInterval(() => {
      // Initialize AWS SDK with your credentials and region
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: 'us-east-1',
      });

      // Create DynamoDB service object
      const dynamoDB = new AWS.DynamoDB.DocumentClient();

      // Retrieve calls in queue from DynamoDB with InQueue attribute set to true
      const params = {
        TableName: "CallsInQueueQualicenter",
        FilterExpression: "InQueue = :val",
        ExpressionAttributeValues: {
          ":val": true,
        },
      };
      dynamoDB.scan(params, async (err, data) => {
        if (err) {
          console.error("Unable to scan DynamoDB table. Error:", JSON.stringify(err, null, 2));
        } else {
          setIsLoading(false);
          const updatedQueueItems = [];
          for (const item of data.Items) {
            // Fetch contact info and update queue item with client name
            const updatedItem = await fetchContactInfo(item);
            updatedQueueItems.push(updatedItem);
          }
          // Update queueItems state with modified items
          setQueueItems(updatedQueueItems);
        }
      });
    }, 3000); // Scan DynamoDB every 3 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate timestamps for fake contacts once when the component mounts
    const generateTimestamp = (multiplier) => {
      const initialTimestamp = Date.now();
      const timestamp = new Date(initialTimestamp + multiplier * -60000).toISOString();
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

  // Combine real and fake contacts into a single array
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
          <LlamadaEsperaCard clientName={item.clientName} timestamp={item.CurrentTime} />
        ))}
      </>
    </>
  );
};

export default QueueVisualizer;

