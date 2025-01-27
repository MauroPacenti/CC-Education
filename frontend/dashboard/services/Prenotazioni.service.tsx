const getAllBookings = async () => {
  const response = await fetch("/api/auth/getAllJourney");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

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
