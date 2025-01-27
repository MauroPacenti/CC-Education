/**
 * Fetches all booking requests from the API
 * @async
 * @returns {Promise<any>} A promise that resolves to the booking request data
 * @throws {Error} If the HTTP request fails
 */
const getAllBookingRequest = async () => {
  const response = await fetch("/api/auth/getAllJourneyRequest");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const RichiestePrenotazioneService = {
  getAllBookingRequest,
};
export default RichiestePrenotazioneService;
