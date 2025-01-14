import "./DettagliPrenotazione.css";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

interface Booking {
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
      id: number;
      name: string;
      type: string;
      address: string;
      phone: string;
      email: string;
      keeper: string;
    };
  };
  startDate: string;
  endDate: string;
  duration: number;
  status: {
    id: number;
    name: string;
    journeyRequests: string[];
    infoRequests: {
      id: number;
      email: string;
      title: string;
      content: string;
      status: string;
    }[];
  };
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
      </button>

      <h2>Dettagli Prenotazione</h2>
      <div className="buttons-container">
        <button className="button reject" onClick={deleteJourney}>
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
