import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaPrenotazioneService } from "../services/DettagliRichiestaPrenotazione.service";
import type { BookingRequestDetails } from "../models/BookingRequestDetails.model";

const durationStart = (duration?: number) => {
  switch (duration) {
    case 1:
      return "08:00";
    case 2:
      return "13:00";
    case 3:
      return "08:00";
    case 4:
      return "08:00";
  }
};
const durationEnd = (duration?: number) => {
  switch (duration) {
    case 1:
      return "12:00";
    case 2:
      return "19:00";
    case 3:
      return "19:00";
    case 4:
      return "12:00";
  }
};

const useDettagliRichiestaPrenotazione = () => {
  const { idRichiestaPrenotazione } = useParams();
  const navigate = useNavigate();

  const [bookingRequestDetails, setBookingRequestDetails] =
    useState<BookingRequestDetails>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [replyModal, setReplyModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  const handleApprove = () => {
    const data = {
      startDate: `${
        bookingRequestDetails?.startAvailabilityDate
      }T${durationStart(bookingRequestDetails?.duration)}:00`,
      endDate: `${bookingRequestDetails?.endAvailabilityDate}T${durationEnd(
        bookingRequestDetails?.duration
      )}:00`,
      keeperId: bookingRequestDetails?.keeper.id,
      title: bookingRequestDetails?.keeper.organization.name,
    };
    setIsLoading(true);
    try {
      DettagliRichiestaPrenotazioneService.approveRequest(data).then(() => {
        navigate("/dashboard/prenotazioni");
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleReject = () => {
    try {
      setIsLoading(true);
      DettagliRichiestaPrenotazioneService.deleteRequest(
        bookingRequestDetails?.id
      ).then(() => {
        navigate("/dashboard/richieste-prenotazioni");
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleContact = () => {
    setReplyModal((prev) => !prev);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      if (!idRichiestaPrenotazione) {
        throw new Error("idRichiestaPrenotazione is undefined");
      }

      DettagliRichiestaPrenotazioneService.getRequest(
        +idRichiestaPrenotazione
      ).then((bookingRequestDetails) => {
        setBookingRequestDetails(bookingRequestDetails);
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, [idRichiestaPrenotazione]);

  const toggleAproveModal = () => {
    setApproveModal((prev) => !prev);
  };

  return {
    bookingRequestDetails,
    isLoading,
    error,
    replyModal,
    approveModal,
    handleApprove,
    handleReject,
    handleContact,
    toggleAproveModal,
  };
};

export default useDettagliRichiestaPrenotazione;
