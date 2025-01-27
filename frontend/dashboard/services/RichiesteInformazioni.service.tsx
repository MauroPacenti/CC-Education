/**
 * Fetches all information requests from the API
 * @async
 * @returns {Promise<Array>} A promise that resolves to an array of information requests
 * @throws {Error} If the API request fails
 */
const getAllInfoRequest = async () => {
  const response = await fetch("/api/auth/getAllInfoRequest");
  if (!response.ok) {
    throw new Error("Failed to fetch info requests");
  }
  return response.json();
};

/**
 * Deletes a specific information request by ID
 * @async
 * @param {number} id - The ID of the information request to delete
 * @throws {Error} If the API request fails
 */
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
