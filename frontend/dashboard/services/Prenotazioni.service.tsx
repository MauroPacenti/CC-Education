const getAllBookings = async () => {
  const response = await fetch("/api/pub/getAllJourney");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const PrenotazioniService = {
  getAllBookings,
};

export default PrenotazioniService;
