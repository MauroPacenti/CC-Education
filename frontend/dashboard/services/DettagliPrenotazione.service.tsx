import { Booking } from "../models/Booking.model";
import BookingFormSteps from "../models/BookingFormSteps.model";

const getJourneyById = async (idPrenotazione: number) => {
  if (!idPrenotazione) {
    throw new Error("No journey ID provided");
  }
  const response = await fetch(`/api/pub/getAllJourney`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let data = await response.json();
  return (data = data.find((item: Booking) => item.id === +idPrenotazione));
};

const deleteById = async (idPrenotazione: number) => {
  if (!idPrenotazione) return;
  const response = await fetch(
    `/api/pub/deleteJourney?journeyId=${idPrenotazione}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const updateJourney = async (body: BookingFormSteps) => {
  const response = await fetch(`/api/pub/updateJourney`, {
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
