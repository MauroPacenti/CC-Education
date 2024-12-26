import "./DettagliPrenotazione.css";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

interface Booking {
  id: number;
  title: string;
  startHour: string;
  endHour: string;
  participants: {
    minor: number;
    adult: number;
  };
  group: string;
}

const DettagliPrenotazione = () => {
  const { idPrenotazione } = useParams<{ idPrenotazione: string }>();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/booking/${idPrenotazione}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookingDetails(data);
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

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="back-button">
          <MoveLeft />
        </button>
        <div>
          Si è verificato un errore durante il recupero dei dettagli della
          prenotazione: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="booking-details">
      <button onClick={() => navigate(-1)} className="back-button">
        <MoveLeft />
        <span>Indietro</span>
      </button>

      <h2>Dettagli Prenotazione {idPrenotazione}</h2>

      {bookingDetails ? (
        <div className="booking-info">
          <h3>{bookingDetails.title}</h3>
          <div className="booking-time">
            <p>Ora inizio: {bookingDetails.startHour}</p>
            <p>Ora fine: {bookingDetails.endHour}</p>
          </div>
          <div className="participants">
            <p>Partecipanti:</p>
            <ul>
              <li>Adulti: {bookingDetails.participants.adult}</li>
              <li>Minori: {bookingDetails.participants.minor}</li>
            </ul>
          </div>
          <p>Gruppo: {bookingDetails.group}</p>
        </div>
      ) : (
        <p>Nessun dettaglio disponibile</p>
      )}
    </div>
  );
};

export default DettagliPrenotazione;
