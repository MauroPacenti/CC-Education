import { useNavigate, useParams } from "react-router";
import "./DettagliRichiestaInformazione.css";
import { MessageSquareReply, MoveLeft, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import ShowDeleteModal from "../../components/ShowDeleteModal/ShowDeleteModal";
import ShowReplyModal from "../../components/ShowReplyModal/ShowReplyModal";

interface RequestInformation {
  id: number;
  date: string;
  name: string;
  email: string;
  title: string;
  message: string;
}

const DettagliRichiestaInformazione = () => {
  const { idRichiestaInformazione } = useParams();
  const navigate = useNavigate();

  const [requestInformationDetails, setRequestInformationDetails] =
    useState<RequestInformation>({
      id: 1,
      date: "2021-09-01",
      name: "Mario Rossi",
      email: "H9u3o@example.com",
      title: "Richiesta informazioni",
      message: "Mi servirebbero maggiori informazioni sul corso di inglese",
    });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/richieste-informazioni/${idRichiestaInformazione}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRequestInformationDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (idRichiestaInformazione) {
      // fetchBookingDetails();
    }
  }, [idRichiestaInformazione]);

  // if (isLoading) {
  //   return <div>Caricamento...</div>;
  // }

  // if (error) {
  //   return (
  //     <div>
  //       <button onClick={() => navigate(-1)} className="back-button">
  //         <MoveLeft />
  //       </button>

  //       <div>
  //         Si è verificato un errore durante il recupero dei dettagli della
  //         richiesta d'informazione: {error}
  //       </div>
  //     </div>
  //   );
  // }

  const toggleReplyModal = () => {
    // Open modal
    setShowReplyModal((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    // Open modal
    setShowDeleteModal((prev) => !prev);
  };

  return (
    <div>
      {showReplyModal && (
        <ShowReplyModal toggleReplyModal={toggleReplyModal}></ShowReplyModal>
      )}
      {showDeleteModal && (
        <ShowDeleteModal toggleDeleteModal={toggleDeleteModal} />
      )}
      <div className="info-request-details-buttons">
        <button
          onClick={() => navigate(-1)}
          title="Indietro"
          className="back-button"
        >
          <MoveLeft />
        </button>
        <div>
          <button
            title="Rispondi alla richiesta"
            className="reply-button"
            onClick={toggleReplyModal}
          >
            <MessageSquareReply />
          </button>
          <button
            title="Elimina richiesta"
            className="delete-button"
            onClick={toggleDeleteModal}
          >
            <Trash />
          </button>
        </div>
      </div>
      <h2>{requestInformationDetails?.title}</h2>
      <p className="request-info-email">{requestInformationDetails?.email}</p>
      <p className="request-info-date">{requestInformationDetails?.date}</p>
      <hr />
      <p>{requestInformationDetails?.message}</p>
      <button className="reply-button text-button" onClick={toggleReplyModal}>
        <MessageSquareReply /> Rispondi
      </button>
    </div>
  );
};

export default DettagliRichiestaInformazione;
