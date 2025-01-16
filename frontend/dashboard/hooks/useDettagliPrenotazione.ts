import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Booking } from "../models/Booking.model";

const useDettagliPrenotazione = () => {
  const { idPrenotazione } = useParams<{ idPrenotazione: string }>();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pub/getAllJourney`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        if (idPrenotazione) {
          data = data.find((item: Booking) => item.id === +idPrenotazione);
          setBookingDetails(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (idPrenotazione) {
      fetchBookingDetails();
    }
  }, [idPrenotazione]);

  const deleteJourney = async () => {
    if (!idPrenotazione) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/pub/deleteJourney?journeyId=${idPrenotazione}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Handle successful deletion, e.g., redirect or update state
      setBookingDetails(null);
      navigate(-1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookingDetails,
    isLoading,
    error,
    deleteJourney,
  };
};

export default useDettagliPrenotazione;
