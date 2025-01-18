import Buttons from "../../components/Buttons/Buttons";
import useDettagliPrenotazione from "../../hooks/useDettagliPrenotazione";
import "./DettagliPrenotazione.css";

const DettagliPrenotazione = () => {
  const { bookingDetails, mutation, error, isLoading, isError } =
    useDettagliPrenotazione();

  if (isError) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <div>
          Si è verificato un errore durante il recupero dei dettagli della
          prenotazione: {error?.message}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <p>Caricamento in corso...</p>
      </div>
    );
  }

  return (
    <div className="booking-details">
      <Buttons.BackButton></Buttons.BackButton>

      <h2>Dettagli Prenotazione</h2>
      <div className="buttons-container">
        <button
          className="button reject"
          onClick={() => mutation.mutate(bookingDetails)}
        >
          Rimuovi
        </button>
      </div>
      {bookingDetails ? (
        <div className="details-container">
          <section className="details-section">
            <h3 className="section-title">Dati Accompagnatore</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.firstName}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cognome:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.lastName}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.email}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CF:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.cf}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Telefono:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.phone}
                </span>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3 className="section-title">Dati Organizzazione</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.organization?.name}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tipo:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.organization?.type}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Indirizzo:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.organization?.address}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Telefono:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.organization?.phone}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.organization?.email}
                </span>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h3 className="section-title">Dati Prenotazione</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Minori nel Gruppo:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.group?.minors}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Adulti:</span>
                <span className="detail-value">
                  {bookingDetails?.keeper?.group?.adults}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Data inizio disponibilità:</span>
                <span className="detail-value">
                  {new Date(bookingDetails?.startDate ?? "").toLocaleDateString(
                    "it-IT"
                  )}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Data fine disponibilità:</span>
                <span className="detail-value">
                  {new Date(bookingDetails?.endDate ?? "").toLocaleDateString(
                    "it-IT"
                  )}
                </span>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>Nessun dettaglio disponibile</p>
      )}
    </div>
  );
};

export default DettagliPrenotazione;
