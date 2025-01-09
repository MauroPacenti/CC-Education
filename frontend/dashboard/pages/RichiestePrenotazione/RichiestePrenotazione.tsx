import { useEffect, useState } from "react";
import "./RichiestePrenotazione.css";
import { NavLink } from "react-router";

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
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: 1,
      keeper: {
        id: 1,
        firstName: "Giovanni",
        lastName: "Giovanni",
        email: "1N8H4@example.com",
        cf: "12345678901",
        phone: "1234567890",
        group: {
          id: 1,
          minors: 1,
          adults: 1,
          keeper: "1",
        },
        organization: {
          id: 1,
          name: "Organizzazione",
          type: "Organizzazione",
          address: "Via Roma, 1",
          phone: "1234567890",
          email: "1N8H4@example.com",
          keeper: "1",
        },
      },
      startAvailabilityDate: new Date(),
      endAvailabilityDate: new Date(),
      duration: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    // fetchBookingRequests();
  }, []);

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

  if (bookingRequests?.length === 0) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        <p>Non ci sono richieste di prenotazione</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Richieste Prenotazione</h2>
      <div className="request-booking-container">
        {bookingRequests.map((bookingRequest) => (
          <NavLink
            to={`/dashboard/richieste-prenotazioni/${bookingRequest.id}`}
            key={bookingRequest.id}
            className="request-booking-item"
          >
            <p>
              {bookingRequest.keeper.firstName} {bookingRequest.keeper.lastName}
            </p>
            <p>{bookingRequest.startAvailabilityDate.toISOString()}</p>
            <p>{bookingRequest.endAvailabilityDate.toISOString()}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RichiestePrenotazione;
