/**
 * Fetches all bookings from the server
 * @async
 * @returns {Promise<any>} The JSON response containing all bookings
 * @throws {Error} If the HTTP request fails
 */
const getAllBookings = async () => {
  const response = await fetch("/api/auth/getAllJourney");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Deletes a booking by its ID
 * @async
 * @param {number} id - The ID of the booking to delete
 * @returns {Promise<any>} The JSON response after deletion
 * @throws {Error} If the HTTP request fails
 */
const deleteBooking = async (id: number) => {
  const response = await fetch(`/api/auth/deleteJourney?journeyId=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const PrenotazioniService = {
  getAllBookings,
  deleteBooking,
};

export default PrenotazioniService;
