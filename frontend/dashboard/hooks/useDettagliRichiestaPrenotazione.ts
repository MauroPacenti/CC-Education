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

  const [selectedDate, setSelectedDate] = useState({
    startDate: bookingRequestDetails?.startAvailabilityDate,
    endDate: bookingRequestDetails?.endAvailabilityDate,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [replyModal, setReplyModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  const handleApprove = () => {
    const data = {
      startDate: `${selectedDate.startDate}T${durationStart(
        bookingRequestDetails?.duration
      )}:00`,
      endDate: `${selectedDate.endDate ?? selectedDate.startDate}T${durationEnd(
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
      setError(
        err instanceof Error
          ? err.message
          : "Si è verificato un errore durante il caricamento dei dati."
      );
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
      setError(
        err instanceof Error
          ? err.message
          : "Si è verificato un errore durante il caricamento dei dati."
      );
    }
  };

  const handleContact = () => {
    setReplyModal((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedDate(
      (prevSelectedDate: {
        startDate: string | undefined;
        endDate: string | undefined;
      }) => ({
        ...prevSelectedDate,
        [name]: value,
      })
    );
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      if (!idRichiestaPrenotazione) {
        throw new Error("id not found");
      }

      DettagliRichiestaPrenotazioneService.getRequest(
        +idRichiestaPrenotazione
      ).then((bookingRequestDetails) => {
        setBookingRequestDetails(bookingRequestDetails);
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : "Si è verificato un errore durante il caricamento dei dati."
      );
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
    handleChange,
    selectedDate,
  };
};

export default useDettagliRichiestaPrenotazione;
