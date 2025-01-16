import { useEffect, useState } from "react";
import "./RichiestePrenotazione.css";
import { useNavigate } from "react-router";
import journeyRequestMapper from "../../utils/Mapper/journeyRequestMapper";

interface BookingRequest {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  organizationType: string;
  startAvailabilityDate: string;
  endAvailabilityDate: string;
  duration: number;
}

const RichiestePrenotazione = () => {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/pub/getAllJourneyRequest");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const journeyRequest = journeyRequestMapper(data);
        setBookingRequests(journeyRequest);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Si è verificato un errore durante il caricamento dei dati."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookingRequests();
  }, []);

  if (bookingRequests?.length === 0) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        <p>Non ci sono richieste di prenotazione</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h2>Richieste Prenotazione</h2>

      <table>
        <thead className="table-header">
          <tr>
            <th>Email</th>
            <th className="desktop-only">Accompagnatore</th>
            <th> Tipologia</th>
            <th>Inizio </th>
            <th>Fine</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {bookingRequests?.map((bookingRequest) => (
            <tr
              key={bookingRequest.id}
              onClick={() => {
                navigate(
                  `/dashboard/richieste-prenotazioni/${bookingRequest.id}`
                );
              }}
            >
              <td>{bookingRequest.email}</td>

              <td className="desktop-only">
                {`${bookingRequest.firstName} ${bookingRequest.lastName}`}
              </td>
              <td>{bookingRequest.organizationType}</td>

              <td>{bookingRequest.startAvailabilityDate}</td>
              <td>{bookingRequest.endAvailabilityDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RichiestePrenotazione;
