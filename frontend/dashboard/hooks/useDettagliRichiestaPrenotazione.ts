import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaPrenotazioneService } from "../services/DettagliRichiestaPrenotazione.service";
import type { BookingRequestDetails } from "../models/BookingRequestDetails.model";
import ToastContext from "../context/ToastContext";
import { useMutation, useQuery } from "@tanstack/react-query";

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

  const { toggleToast } = useContext(ToastContext);

  const {
    data: bookingRequestDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookingRequestDetails", idRichiestaPrenotazione],
    queryFn: (): Promise<BookingRequestDetails> => {
      return DettagliRichiestaPrenotazioneService.getRequest(
        +idRichiestaPrenotazione!
      );
    },
  });

  const approveMutation = useMutation({
    mutationFn: () => {
      const data = {
        startDate: `${selectedDate.startDate}T${durationStart(
          bookingRequestDetails?.duration
        )}:00`,
        endDate: `${
          selectedDate.endDate ?? selectedDate.startDate
        }T${durationEnd(bookingRequestDetails?.duration)}:00`,
        keeperId: bookingRequestDetails?.keeper.id,
        title: bookingRequestDetails?.keeper.organization.name,
      };
      return DettagliRichiestaPrenotazioneService.approveRequest(data);
    },
    onSuccess: () => {
      toggleToast({
        message: "Richiesta approvata con successo",
        type: "success",
      });
      navigate("/dashboard/prenotazioni");
    },
    onError: () => {
      toggleToast({
        message:
          "Si è verificato un errore durante l'approvazione della richiesta",
        type: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (idRichiestaPrenotazione: number) => {
      return DettagliRichiestaPrenotazioneService.deleteRequest(
        +idRichiestaPrenotazione!
      );
    },
    onSuccess: () => {
      toggleToast({
        message: "Richiesta rifiutata con successo",
        type: "success",
      });
      navigate("/dashboard/richieste-prenotazioni");
    },
    onError: () => {
      toggleToast({
        message: "Si è verificato un errore durante il rifiuto della richiesta",
        type: "error",
      });
    },
  });

  const [selectedDate, setSelectedDate] = useState({
    startDate: bookingRequestDetails?.startAvailabilityDate,
    endDate: bookingRequestDetails?.endAvailabilityDate,
  });

  const [replyModal, setReplyModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  // const handleApprove = () => {
  //   const data = {
  //     startDate: `${selectedDate.startDate}T${durationStart(
  //       bookingRequestDetails?.duration
  //     )}:00`,
  //     endDate: `${selectedDate.endDate ?? selectedDate.startDate}T${durationEnd(
  //       bookingRequestDetails?.duration
  //     )}:00`,
  //     keeperId: bookingRequestDetails?.keeper.id,
  //     title: bookingRequestDetails?.keeper.organization.name,
  //   };
  //   setIsLoading(true);
  //   try {
  //     DettagliRichiestaPrenotazioneService.approveRequest(data).then(() => {
  //       navigate("/dashboard/prenotazioni");
  //       setIsLoading(false);
  //     });
  //   } catch (err) {
  //     setIsLoading(false);
  //     setError(
  //       err instanceof Error
  //         ? err.message
  //         : "Si è verificato un errore durante il caricamento dei dati."
  //     );
  //   }
  // };

  // const handleReject = () => {
  //   try {
  //     setIsLoading(true);
  //     DettagliRichiestaPrenotazioneService.deleteRequest(
  //       bookingRequestDetails?.id
  //     ).then(() => {
  //       navigate("/dashboard/richieste-prenotazioni");
  //       setIsLoading(false);
  //     });
  //   } catch (err) {
  //     setIsLoading(false);
  //     setError(
  //       err instanceof Error
  //         ? err.message
  //         : "Si è verificato un errore durante il caricamento dei dati."
  //     );
  //   }
  // };

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

  const toggleAproveModal = () => {
    setApproveModal((prev) => !prev);
  };

  return {
    bookingRequestDetails,
    isLoading,
    isError,
    error,
    replyModal,
    approveModal,
    approveMutation,
    deleteMutation,
    handleContact,
    toggleAproveModal,
    handleChange,
    selectedDate,
    toggleToast,
  };
};

export default useDettagliRichiestaPrenotazione;
