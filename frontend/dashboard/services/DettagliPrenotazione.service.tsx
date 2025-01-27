import { Booking } from "../models/Booking.model";
import BookingFormSteps from "../models/BookingFormSteps.model";

/**
 * Retrieves a journey by its ID
 * @param {number} idPrenotazione - The ID of the journey to retrieve
 * @returns {Promise<Booking>} The journey data
 * @throws {Error} When no ID is provided or when the HTTP request fails
 */
const getJourneyById = async (idPrenotazione: number) => {
  if (!idPrenotazione) {
    throw new Error("No journey ID provided");
  }
  const response = await fetch(`/api/auth/getAllJourney`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let data = await response.json();
  return (data = data.find((item: Booking) => item.id === +idPrenotazione));
};

/**
 * Deletes a journey by its ID
 * @param {number} idPrenotazione - The ID of the journey to delete
 * @returns {Promise<any>} The response data
 * @throws {Error} When the HTTP request fails
 */
const deleteById = async (idPrenotazione: number) => {
  if (!idPrenotazione) return;
  const response = await fetch(
    `/api/auth/deleteJourney?journeyId=${idPrenotazione}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Updates a journey with new data
 * @param {BookingFormSteps} body - The updated journey data
 * @returns {Promise<any>} The response data
 * @throws {Error} When the HTTP request fails
 */
const updateJourney = async (body: BookingFormSteps) => {
  const response = await fetch(`/api/auth/updateJourney`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const DettagliPrenotazioneService = {
  getJourneyById,
  deleteById,
  updateJourney,
};
