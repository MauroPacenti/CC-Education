import "./RichiestePrenotazione.css";

import useRichiestePrenotazioni from "../../hooks/useRichiestePrenotazioni";
/**
 * Component that displays a table of booking requests.
 * Shows loading state, error state, and empty state when appropriate.
 * Renders a table with email, companion, type, start date and end date columns.
 * @returns {JSX.Element} The rendered component
 */
const RichiestePrenotazione = () => {
  const { data, isError, handleClick, isLoading } = useRichiestePrenotazioni();

  if (isError) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        Errore nel caricamento delle richieste di prenotazione
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Richieste Prenotazione</h2>
        Caricamento in corso...
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
                handleClick(bookingRequest.id);
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
