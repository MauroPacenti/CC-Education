import { useNavigate, useParams } from "react-router";
import { Booking } from "../models/Booking.model";
import { DettagliPrenotazioneService } from "../services/DettagliPrenotazione.service";
import { useMutation, useQuery } from "@tanstack/react-query";

const useDettagliPrenotazione = () => {
  const { idPrenotazione } = useParams();
  const navigate = useNavigate();

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
    mutationFn: (data: Booking) =>
      DettagliPrenotazioneService.deleteById(data.id),
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
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
