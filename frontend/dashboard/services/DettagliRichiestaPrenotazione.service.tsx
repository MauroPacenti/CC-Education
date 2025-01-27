import type { BookingRequestDetails } from "../models/BookingRequestDetails.model";
/**
 * Approves a journey request by creating a new journey
 * @param {Object} data - The journey data
 * @param {string} [data.startDate] - Start date of the journey
 * @param {string} [data.endDate] - End date of the journey
 * @param {string} [data.title] - Title of the journey
 * @param {number} [data.keeperId] - ID of the keeper
 * @returns {Promise<any>} The created journey data
 * @throws {Error} If the HTTP request fails
 */
const approveRequest = async (data: {
  startDate?: string;
  endDate?: string;
  title?: string;
  keeperId?: number;
}) => {
  const response = await fetch(
    `/api/auth/createJourney?startDate=${data.startDate}&endDate=${data.endDate}&title=${data.title}&keeperId=${data.keeperId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Deletes a journey request
 * @param {number} [id] - The keeper ID of the request to delete
 * @throws {Error} If the HTTP request fails
 */
const deleteRequest = async (id?: number) => {
  const response = await fetch(
    `/api/auth/deleteJourneyRequest?keeperId=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

/**
 * Retrieves a specific journey request
 * @param {number} [id] - The ID of the request to retrieve
 * @returns {Promise<BookingRequestDetails|undefined>} The booking request details if found
 * @throws {Error} If the HTTP request fails
 */
const getRequest = async (id?: number) => {
  const response = await fetch(`/api/auth/getAllJourneyRequest`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const bookingRequestDetails = data.find(
    (bookingRequest: BookingRequestDetails) =>
      id ? bookingRequest.id === +id : null
  );

  return bookingRequestDetails;
};

export const DettagliRichiestaPrenotazioneService = {
  approveRequest,
  deleteRequest,
  getRequest,
};
