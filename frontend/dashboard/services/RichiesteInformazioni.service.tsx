const getAllInfoRequest = async () => {
  const response = await fetch("/api/pub/getAllInfoRequest");
  if (!response.ok) {
    throw new Error("Failed to fetch info requests");
  }
  return response.json();
};

const RichiesteInformazioniService = {
  getAllInfoRequest,
};

export default RichiesteInformazioniService;
