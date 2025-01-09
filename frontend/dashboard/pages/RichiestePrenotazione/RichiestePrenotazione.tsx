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
    {
      id: 2,
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
