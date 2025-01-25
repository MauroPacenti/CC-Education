import "./DettagliRichiestaInformazione.css";
import { ArrowRightFromLine, MessageSquareReply, MoveLeft } from "lucide-react";
import ShowDeleteModal from "../../components/ShowDeleteModal/ShowDeleteModal";
import ShowReplyModal from "../../components/ShowReplyModal/ShowReplyModal";
import useDettagliRichiestaInformazioni from "../../hooks/useDettagliRichiestaInformazioni";
import Buttons from "../../components/Buttons/Buttons";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const DettagliRichiestaInformazione = () => {
  const {
    isLoading,
    isError,
    requestInformationDetails,
    showDeleteModal,
    toggleDeleteModal,
    showReplyModal,
    toggleReplyModal,
    isLoadingDelete,
    errorDelete,
    handleDeleteClick,
    sendEmailMutation,
  } = useDettagliRichiestaInformazioni();

  const navigate = useNavigate();
  const navigateToRichiesteInformazioni = () => {
    navigate("/dashboard/richieste-informazioni");
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  if (errorDelete) {
    return (
      <ShowDeleteModal toggleDeleteModal={toggleDeleteModal}>
        <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
          <p>Si è verificato un errore durante l'eliminazione: {errorDelete}</p>
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

  if (isError) {
    return (
      <div>
        <button onClick={navigateToRichiesteInformazioni}>
          {windowWidth > 1240 ? (
            <ArrowRightFromLine></ArrowRightFromLine>
          ) : (
            <MoveLeft></MoveLeft>
          )}
        </button>

        <div>
          Si è verificato un errore durante il recupero dei dettagli della
          richiesta d'informazione
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
        <button onClick={navigateToRichiesteInformazioni}>
          {windowWidth > 1240 ? (
            <ArrowRightFromLine></ArrowRightFromLine>
          ) : (
            <MoveLeft></MoveLeft>
          )}
        </button>

        <div>Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="info-request-details">
      {showReplyModal && (
        <ShowReplyModal
          toggleReplyModal={toggleReplyModal}
          email={requestInformationDetails?.email}
          sendEmail={sendEmailMutation.mutate}
        ></ShowReplyModal>
      )}
      {showDeleteModal && (
        <ShowDeleteModal
          toggleDeleteModal={toggleDeleteModal}
          onClick={() => handleDeleteClick(requestInformationDetails)}
          subject="richiesta d'informazione"
        ></ShowDeleteModal>
      )}
      <div className="info-request-details-buttons">
        <button onClick={navigateToRichiesteInformazioni}>
          {windowWidth > 1240 ? (
            <ArrowRightFromLine></ArrowRightFromLine>
          ) : (
            <MoveLeft></MoveLeft>
          )}
        </button>

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
      <p className="request-info-content">
        {requestInformationDetails?.content}
      </p>
      <button className="reply-button text-button" onClick={toggleReplyModal}>
        <MessageSquareReply /> Rispondi
      </button>
    </div>
  );
};

export default DettagliRichiestaInformazione;
