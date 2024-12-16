import "../global.css";
import "./richiesta-prenotazione.css";

// POST verso /api/richiedi-prenotazione

/**
 * @name startSpinner
 * @description Adds a class to the spinner element to start the animation.
 */
const startSpinner = () => {
  // add class to the spinner element to start animation
};

/**
 * @name stopSpinner
 * @description Removes a class from the spinner element to stop the animation.
 */
const stopSpinner = () => {
  // remove class to the spinner element to stop animation
};

/**
 * @name postData
 * @description Handles the POST request to the "/api/prenotazione" endpoint.
 * Sends a POST request to the "/api/prenotazione" endpoint.
 * Starts a spinner animation before making the request and stops it
 * upon receiving a response. This function converts the response to JSON.
 * Error handling is not yet implemented.
 */
const postData = async () => {
  startSpinner();
  try {
    const response = await fetch("/api/prenotazione", {
      method: "POST",
      body: JSON.stringify(""), // aggiungere l'oggetto che bisogna mandare
    });

    const data = await response.json();

    if (!data) {
      throw new Error(data); // add error handling
    }

    stopSpinner();
    // add success handling
    // ex. show a success message
    console.log(data);
  } catch (error) {
    // add error handling
    console.error(error);
  }
};

postData();
