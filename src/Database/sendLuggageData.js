// useSendLuggageData.js
import { useCallback } from 'react';

const useSendLuggageData = () => {
  const sendLuggageData = useCallback(() => {
    const simulatedLuggageCount = Math.floor(Math.random() * 50); // Randomly generate a luggage count
    
    // Send the luggageCount to the backend
    fetch("http://localhost:3001/add-luggage", { // Make sure this endpoint matches your Express server's endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ luggageCount: simulatedLuggageCount }),
    })
    .then(response => response.json())
    .then(data => console.log("Luggage Data Sent:", data))
    .catch(error => {
      console.error("Error sending luggage data:", error);
    });
  }, []);

  return sendLuggageData;
};

export default useSendLuggageData;