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
