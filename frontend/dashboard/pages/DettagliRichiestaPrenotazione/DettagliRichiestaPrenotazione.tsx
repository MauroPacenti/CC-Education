import { useNavigate, useParams } from "react-router";
import "./DettagliRichiestaPrenotazione.css";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ShowReplyModal from "../../components/ShowReplyModal/ShowReplyModal";

interface BookingRequestDetails {
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
  startAvailabilityDate: string;
  endAvailabilityDate: string;
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

const DettagliRichiestaPrenotazione = () => {
  const { idRichiestaPrenotazione } = useParams();
  const navigate = useNavigate();

  const [bookingRequestDetails, setBookingRequestDetails] =
    useState<BookingRequestDetails>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [replyModal, setReplyModal] = useState(false);

  const handleApprove = async () => {
    try {
      const response = await fetch(`/api/pub/createJourney`, {
        method: "POST",
        body: JSON.stringify({
          startDate: bookingRequestDetails?.startAvailabilityDate,
          endDate: bookingRequestDetails?.endAvailabilityDate,
          keeperId: bookingRequestDetails?.keeper.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // handle success
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleReject = async () => {
    try {
      console.log(bookingRequestDetails?.id);
      const response = await fetch(`/api/pub/deleteJourneyRequest`, {
        method: "DELETE",
        body: JSON.stringify({ journeyRequestId: bookingRequestDetails?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // handle success
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleContact = () => {
    setReplyModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchBookingRequestDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pub/getAllJourneyRequest`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const bookingRequestDetails = data.find(
          (bookingRequest: BookingRequestDetails) =>
            idRichiestaPrenotazione
              ? bookingRequest.id === +idRichiestaPrenotazione
              : null
        );
        setBookingRequestDetails(bookingRequestDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (idRichiestaPrenotazione) {
      fetchBookingRequestDetails();
    }
  }, [idRichiestaPrenotazione]);

  if (isLoading) {
    return (
      <div>
        <button className="back-button" onClick={() => navigate(-1)}>
          <MoveLeft />
        </button>

        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <button className="back-button" onClick={() => navigate(-1)}>
          <MoveLeft />
        </button>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {replyModal && (
        <ShowReplyModal
          toggleReplyModal={handleContact}
          email={bookingRequestDetails?.keeper?.email}
        />
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
        <MoveLeft />
      </button>

      <h2>Dettagli Richiesta Prenotazione</h2>

      <div className="buttons-container">
        <button className="button contact" onClick={handleContact}>
          Contatta
        </button>

        <button className="button approve" onClick={handleApprove}>
          Approva
        </button>
        <button className="button reject" onClick={handleReject}>
          Rifiuta
        </button>
      </div>

      <div className="details-container">
        <section className="details-section">
          <h3 className="section-title">Dati Accompagnatore</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Nome:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.firstName}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Cognome:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.lastName}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.email}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">CF:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.cf}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Telefono:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.phone}
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
                {bookingRequestDetails?.keeper?.organization?.name}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tipo:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.organization?.type}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Indirizzo:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.organization?.address}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Telefono:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.organization?.phone}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.organization?.email}
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
                {bookingRequestDetails?.keeper?.group?.minors}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Adulti:</span>
              <span className="detail-value">
                {bookingRequestDetails?.keeper?.group?.adults}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Data inizio disponibilità:</span>
              <span className="detail-value">
                {new Date(
                  bookingRequestDetails?.startAvailabilityDate ?? ""
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Data fine disponibilità:</span>
              <span className="detail-value">
                {new Date(
                  bookingRequestDetails?.endAvailabilityDate ?? ""
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Durata:</span>
              <span className="detail-value">
                {bookingRequestDetails?.duration} giorni
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DettagliRichiestaPrenotazione;
