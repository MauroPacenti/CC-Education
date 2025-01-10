import { useEffect, useState } from "react";
import "./RichiestePrenotazione.css";
import { useNavigate } from "react-router";

interface BookingRequest {
  id: number;
  keeper: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cf: string;
    phone: string;
    group: {
      id: number;
      minors: number;
      adults: number;
      keeper: string;
    };
    organization: {
      id: 1;
      name: string;
      type: string;
      address: string;
      phone: string;
      email: string;
      keeper: string;
    };
  };
  startAvailabilityDate: Date;
  endAvailabilityDate: Date;
  duration: 0;
}

const RichiestePrenotazione = () => {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
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
        setBookingRequests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
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
          {bookingRequests.map((bookingRequest) => (
            <tr
              key={bookingRequest.id}
              onClick={() => {
                navigate(
                  `/dashboard/richieste-prenotazioni/${bookingRequest.id}`
                );
              }}
            >
              <td>{bookingRequest.keeper.email}</td>

              <td className="desktop-only">
                {`${bookingRequest.keeper.firstName} ${bookingRequest.keeper.lastName}`}
              </td>
              <td>{bookingRequest.keeper.organization.type}</td>

              <td>
                {bookingRequest.startAvailabilityDate.toLocaleDateString(
                  "it-IT"
                )}
              </td>
              <td>
                {bookingRequest.endAvailabilityDate.toLocaleDateString("it-IT")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RichiestePrenotazione;
