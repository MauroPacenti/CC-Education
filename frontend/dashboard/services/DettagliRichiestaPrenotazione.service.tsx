import type { BookingRequestDetails } from "../models/BookingRequestDetails.model";

const approveRequest = async (data: {
  startDate?: string;
  endDate?: string;
  title?: string;
  keeperId?: number;
}) => {
  const response = await fetch(
    `/api/pub/createJourney?startDate=${data.startDate}&endDate=${data.endDate}&title=${data.title}&keeperId=${data.keeperId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const deleteRequest = async (id?: number) => {
  const response = await fetch(
    `/api/pub/deleteJourneyRequest?journeyRequestId=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

const getRequest = async (id?: number) => {
  const response = await fetch(`/api/pub/getAllJourneyRequest`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const bookingRequestDetails = data.find(
    (bookingRequest: BookingRequestDetails) =>
      id ? bookingRequest.id === +id : null
  );

  return bookingRequestDetails;
};

export const DettagliRichiestaPrenotazioneService = {
  approveRequest,
  deleteRequest,
  getRequest,
};
