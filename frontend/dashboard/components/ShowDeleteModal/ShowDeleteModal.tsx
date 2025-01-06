import { useState } from "react";
import Modal from "../Modal/Modal";
import "./ShowDeleteModal.css";
import { useParams } from "react-router";

interface Props {
  toggleDeleteModal: () => void;
}
const ShowDeleteModal = ({ toggleDeleteModal }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { idRichiestaInformazione } = useParams();
  const deleteInformationRequest = async () => {
    // Delete information request
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/richieste-informazioni/${idRichiestaInformazione}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsLoading(false);
      toggleDeleteModal();
    } catch (error) {
      console.error("Error deleting information request:", error);
      setError("Error deleting information request");
    }

    console.log("Richiesta eliminata");
  };

  if (error) {
    return (
      <Modal toggleActiveModal={toggleDeleteModal}>
        <div className="delete-modal">{error}</div>
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Modal toggleActiveModal={toggleDeleteModal}>
        <div className="delete-modal">Eliminazione in corso...</div>
      </Modal>
    );
  }

  return (
    <Modal toggleActiveModal={toggleDeleteModal}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Sei sicuro di voler eliminare questa richiesta?</h3>
        <div className="delete-modal-buttons">
          <button className="delete-modal-button" onClick={toggleDeleteModal}>
            Annulla
          </button>
          <button
            className="delete-modal-button delete"
            onClick={deleteInformationRequest}
          >
            Elimina
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShowDeleteModal;
