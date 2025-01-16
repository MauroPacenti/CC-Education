import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Booking } from "../models/Booking.model";
import { DettagliPrenotazioneService } from "../services/DettagliPrenotazione.service";

const useDettagliPrenotazione = () => {
  const { idPrenotazione } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    DettagliPrenotazioneService.getJourneyById(Number(idPrenotazione))
      .then((data) => {
        setBookingDetails(data);
      })
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "Si è verificato un errore durante il caricamento dei dati."
        )
      )
      .finally(() => setIsLoading(false));
  }, [idPrenotazione]);

  const deleteJourney = async () => {
    setIsLoading(true);
    DettagliPrenotazioneService.deleteById(Number(idPrenotazione))
      .then(() => {
        setBookingDetails(null);
        navigate(-1);
      })
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "Si è verificato un errore durante il caricamento dei dati."
        )
      )
      .finally(() => setIsLoading(false));
  };

  return {
    bookingDetails,
    isLoading,
    error,
    deleteJourney,
  };
};

export default useDettagliPrenotazione;
