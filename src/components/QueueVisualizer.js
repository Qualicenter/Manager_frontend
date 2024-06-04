import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import LlamadaEsperaCard from "./LlamadaEsperaCard";

const QueueVisualizer = () => {
  const [queueItems, setQueueItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFakeContacts, setShowFakeContacts] = useState(false);

  useEffect(() => {
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
          setQueueItems(data.Items);
          for (const item of data.Items) {
            await fetchContactInfo(item);
          }
        }
      });
    }, 3000); // Scan DynamoDB every 3 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // For each item, check if the contact has been disconnected (no longer in queue)
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
    } catch (err) {
      console.error(`Error fetching contact info for ${item.ContactID}:`, err);
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

  const handleToggleFakeContacts = () => {
    setShowFakeContacts(!showFakeContacts);
  };

  // Initial timestamp
  const initialTimestamp = Date.now();

  // Function to generate increasing timestamps
  const generateTimestamp = (multiplier) => {
    const timestamp = new Date(initialTimestamp + multiplier * -60000).toISOString();
    return timestamp;
  };

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner if you prefer
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        
        <label>
          Show dummy contacts:
          <input
            type="checkbox"
            checked={showFakeContacts}
            onChange={handleToggleFakeContacts}
          />
        </label>
        {queueItems.length === 0 && (
          <p>There's no contacts in queue</p>
        )}
      </div>
      <>
        {queueItems.map((item) => (
          <LlamadaEsperaCard key={item.ContactID} contactId={item.ContactID} timestamp={item.CurrentTime} />
        ))}
        {showFakeContacts && (
          <>
            <LlamadaEsperaCard contactId="f024898f-b425-4fcd-80a5-a47faeb8a674" timestamp={generateTimestamp(1)} />
            <LlamadaEsperaCard contactId="f727802e-5b8c-413a-bf45-6b8b686f6aad" timestamp={generateTimestamp(2)} />
            <LlamadaEsperaCard contactId="a15e1af4-4ed4-4319-8fed-2d15656d4d4b" timestamp={generateTimestamp(3)} />
            <LlamadaEsperaCard contactId="cdfc837a-fd15-449f-8194-1d66c278fc53" timestamp={generateTimestamp(4)} />
            <LlamadaEsperaCard contactId="dummy" timestamp={generateTimestamp(5)} />
            <LlamadaEsperaCard contactId="02454a03-22b5-4f04-b2d9-4df10886cc57" timestamp={generateTimestamp(6)} />
            <LlamadaEsperaCard contactId="dummy" timestamp={generateTimestamp(7)} />
            <LlamadaEsperaCard contactId="8408e977-a446-4afa-b6ad-1c98413e4867" timestamp={generateTimestamp(8)} />
            <LlamadaEsperaCard contactId="dummy" timestamp={generateTimestamp(9)} />
            <LlamadaEsperaCard contactId="dummy" timestamp={generateTimestamp(10)} />
            {/* Add more fake contact cards as needed */}
          </>
        )}
      </>
    </>
  );
};

export default QueueVisualizer;
