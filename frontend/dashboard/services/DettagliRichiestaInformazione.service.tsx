import type { InformationRequest } from "../models/InformationRequest.model";
/**
 * Retrieves an information request by ID from all available requests
 * @param {number} [id] - Optional ID of the information request to retrieve
 * @returns {Promise<InformationRequest|undefined>} The found information request or undefined
 * @throws {Error} If the HTTP request fails
 */
const getRequest = async (id?: number) => {
  const response = await fetch(`/api/auth/getAllInfoRequest`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const informationRequestDetails = data.find(
    (informationRequest: InformationRequest) =>
      id ? informationRequest.id === +id : null
  );
  return informationRequestDetails;
};

/**
 * Deletes an information request by ID
 * @param {number} [id] - ID of the information request to delete
 * @throws {Error} If the deletion operation fails
 */
const deleteRequest = async (id?: number) => {
  const response = await fetch(
    `/api/auth/deleteInfoRequest?infoRequestId=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Errore durante l'eliminazione della richiesta");
  }
};

/**
 * Sends a reply email for an information request
 * @param {Object} data - The email data
 * @param {string} data.to - Recipient email address
 * @param {string} data.subject - Email subject
 * @param {string} data.body - Email body content
 * @returns {Promise<any>} The response data from the server
 * @throws {Error} If the email sending operation fails
 */
const replyRequest = async (data: {
  to: string;
  subject: string;
  body: string;
}) => {
  const response = await fetch(
    `/api/auth/sendMail?to=${data.to}&subject=${data.subject}&body=${data.body}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Errore durante l'invio della risposta");
  }
  return response.json();
};

export const DettagliRichiestaInformazioneService = {
  getRequest,
  deleteRequest,
  replyRequest,
};
