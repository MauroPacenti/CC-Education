import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DettagliRichiestaPrenotazioneService } from "../services/DettagliRichiestaPrenotazione.service";
import type { BookingRequestDetails } from "../models/BookingRequestDetails.model";
import ToastContext from "../context/ToastContext";
import { useMutation, useQuery } from "@tanstack/react-query";

const useDettagliRichiestaPrenotazione = () => {
  const { idRichiestaPrenotazione } = useParams();
  const navigate = useNavigate();

  const { toggleToast } = useContext(ToastContext);
  const [keeperId, setKeeperId] = useState<number>();

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
      ).then((data) => {
        setKeeperId(data.keeper.id);
        return data;
      });
    },
  });

  const approveMutation = useMutation({
    mutationFn: () => {
      const data = {
        startDate: `${selectedDate.startDate}T09:00:00`,
        endDate: `${selectedDate.endDate ?? selectedDate.startDate}T19:00:00`,
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
    mutationFn: (idKeeper?: number) => {
      return DettagliRichiestaPrenotazioneService.deleteRequest(idKeeper!);
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
    if (!approveModal) {
      document.body.classList.add("open-modal");
    } else {
      document.body.classList.remove("open-modal");
    }
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
    idRichiestaPrenotazione,
    keeperId,
  };
};

export default useDettagliRichiestaPrenotazione;
