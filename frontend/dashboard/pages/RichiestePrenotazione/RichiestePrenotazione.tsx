import "./RichiestePrenotazione.css";
import { useNavigate } from "react-router";
import journeyRequestMapper from "../../utils/Mapper/journeyRequestMapper";
import { useQuery } from "@tanstack/react-query";

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookingRequests"],
    queryFn: (): Promise<BookingRequest[]> =>
      fetch("/api/pub/getAllJourneyRequest")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return journeyRequestMapper(data);
        }),
  });

  const navigate = useNavigate();

  if (isError) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        Error: {isError}
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

  if (data?.length === 0) {
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
          {data?.map((bookingRequest) => (
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
