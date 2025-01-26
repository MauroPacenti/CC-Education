import type { InformationRequest } from "../models/InformationRequest.model";

const getRequest = async (id?: number) => {
  const response = await fetch(`/api/pub/getAllInfoRequest`);
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

const deleteRequest = async (id?: number) => {
  const response = await fetch(
    `/api/pub/deleteInfoRequest?infoRequestId=${id}`,
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

const replyRequest = async (data: {
  to: string;
  subject: string;
  body: string;
}) => {
  const response = await fetch(
    `/api/pub/sendMail?to=${data.to}&subject=${data.subject}&body=${data.body}`,
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
