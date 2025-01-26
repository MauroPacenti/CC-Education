const getAllInfoRequest = async () => {
  const response = await fetch("/api/auth/getAllInfoRequest");
  if (!response.ok) {
    throw new Error("Failed to fetch info requests");
  }
  return response.json();
};

const deleteInfoRequest = async (id: number) => {
  const response = await fetch(
    `/api/auth/deleteInfoRequest?infoRequestId=${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete info request");
  }
};

const RichiesteInformazioniService = {
  getAllInfoRequest,
  deleteInfoRequest,
};

export default RichiesteInformazioniService;
