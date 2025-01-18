import "./DettagliRichiestaInformazione.css";
import { MessageSquareReply } from "lucide-react";
import ShowDeleteModal from "../../components/ShowDeleteModal/ShowDeleteModal";
import ShowReplyModal from "../../components/ShowReplyModal/ShowReplyModal";
import useDettagliRichiestaInformazioni from "../../hooks/useDettagliRichiestaInformazioni";
import Buttons from "../../components/Buttons/Buttons";
import { useContext } from "react";
import ToastContext from "../../context/ToastContext";

const DettagliRichiestaInformazione = () => {
  const {
    isLoading,
    error,
    deleteInformationRequest,
    requestInformationDetails,
    showDeleteModal,
    toggleDeleteModal,
    showReplyModal,
    toggleReplyModal,
    isLoadingDelete,
    errorDelete,
  } = useDettagliRichiestaInformazioni();

  const { toggleToast } = useContext(ToastContext);

  if (errorDelete) {
    return (
      <ShowDeleteModal toggleDeleteModal={toggleDeleteModal}>
        <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
          <p>Si è verificato un errore durante l'eliminazione: {error}</p>
          <button
            className="delete-modal-button"
            onClick={() => {
              console.log("click");
              toggleDeleteModal();
            }}
          >
            Chiudi
          </button>
        </div>
      </ShowDeleteModal>
    );
  }

  if (error) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <div>
          Si è verificato un errore durante il recupero dei dettagli della
          richiesta d'informazione: {error}
        </div>
      </div>
    );
  }

  if (isLoadingDelete) {
    return (
      <ShowDeleteModal toggleDeleteModal={toggleDeleteModal}>
        <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
          <p>Caricamento...</p>
          <button className="delete-modal-button" onClick={toggleDeleteModal}>
            Chiudi
          </button>
        </div>
      </ShowDeleteModal>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Buttons.BackButton></Buttons.BackButton>
        <div>Caricamento...</div>
      </div>
    );
  }

  return (
    <div>
      {showReplyModal && (
        <ShowReplyModal
          toggleReplyModal={toggleReplyModal}
          email={requestInformationDetails?.email}
        ></ShowReplyModal>
      )}
      {showDeleteModal && (
        <ShowDeleteModal toggleDeleteModal={toggleDeleteModal}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Sei sicuro di voler eliminare questa richiesta?</h3>
            <div className="delete-modal-buttons">
              <button
                className="delete-modal-button"
                onClick={toggleDeleteModal}
              >
                Annulla
              </button>
              <button
                className="delete-modal-button delete"
                onClick={() => {
                  deleteInformationRequest();
                  if (!errorDelete)
                    toggleToast({
                      type: "success",
                      message: "Richiesta eliminata",
                    });
                  else
                    toggleToast({
                      type: "error",
                      message:
                        "Si è verificato un errore durante l'eliminazione",
                    });
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        </ShowDeleteModal>
      )}
      <div className="info-request-details-buttons">
        <Buttons.BackButton></Buttons.BackButton>
        <div>
          <button
            title="Rispondi alla richiesta"
            className="reply-button"
            onClick={toggleReplyModal}
          >
            <MessageSquareReply />
          </button>
          <Buttons.DeleteButton
            title="Elimina richiesta"
            onClick={toggleDeleteModal}
          ></Buttons.DeleteButton>
        </div>
      </div>
      <h2>{requestInformationDetails?.title}</h2>
      <p className="request-info-email">{requestInformationDetails?.email}</p>
      <p className="request-info-date">{requestInformationDetails?.date}</p>
      <hr />
      <p>{requestInformationDetails?.content}</p>
      <button className="reply-button text-button" onClick={toggleReplyModal}>
        <MessageSquareReply /> Rispondi
      </button>
    </div>
  );
};

export default DettagliRichiestaInformazione;
