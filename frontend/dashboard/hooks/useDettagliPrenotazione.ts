import { useNavigate, useParams } from "react-router";
import { DettagliPrenotazioneService } from "../services/DettagliPrenotazione.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ToastContext from "../context/ToastContext";

const useDettagliPrenotazione = () => {
  const { idPrenotazione } = useParams();
  const navigate = useNavigate();
  const { toggleToast } = useContext(ToastContext);

  const {
    data: bookingDetails,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["bookingDetails", idPrenotazione],
    queryFn: () =>
      DettagliPrenotazioneService.getJourneyById(Number(idPrenotazione)),
    staleTime: 30000,
  });

  const mutation = useMutation({
    mutationFn: () => DettagliPrenotazioneService.deleteById(+idPrenotazione!),
    onSuccess: () => {
      toggleToast({
        type: "success",
        message: "Richiesta eliminata con successo",
      });

      navigate(-1);
    },
    onError: () => {
      toggleToast({
        type: "error",
        message: "Si è verificato un errore durante l'eliminazione",
      });
    },
  });

  return {
    bookingDetails,
    isLoading,
    error,
    isError,
    mutation,
  };
};

export default useDettagliPrenotazione;
