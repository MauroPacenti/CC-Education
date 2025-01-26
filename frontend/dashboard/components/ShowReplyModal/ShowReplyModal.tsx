import { X } from "lucide-react";
import "./ShowReplyModal.css";
import { useState } from "react";

interface Props {
  toggleReplyModal: () => void;
  email?: string;
  sendEmail: (data: { to: string; subject: string; body: string }) => void;
  isLoading: boolean;
}

const ShowReplyModal = ({
  toggleReplyModal,
  email,
  sendEmail,
  isLoading,
}: Props) => {
  const [response, setResponse] = useState({
    to: email,
    subject: "",
    body: "",
  });

  return (
    <div className="reply-modal" onClick={toggleReplyModal}>
      <div className="reply-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-modal active-mobile"
          onClick={toggleReplyModal}
        >
          <X />
        </button>
        <h3>Rispondi alla richiesta</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (response.to) {
              sendEmail(
                response as { to: string; subject: string; body: string }
              );
            }
          }}
        >
          <div className="reply-modal-email-input">
            <label htmlFor="">A: </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              readOnly
              disabled
            />
          </div>

          <div className="reply-modal-object-input">
            <label htmlFor="">Oggetto:</label>
            <input
              type="text"
              placeholder="Inserisci l'oggetto della risposta"
              onChange={(e) =>
                setResponse((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
          </div>

          <div className="reply-modal-message-input">
            <label htmlFor="">Messaggio</label>
            <textarea
              className="reply-modal-textarea"
              placeholder="Scrivi qui la tua risposta..."
              onChange={(e) =>
                setResponse((prev) => ({ ...prev, body: e.target.value }))
              }
            ></textarea>
          </div>
          <div className="reply-modal-buttons">
            <button
              className="reply-modal-button cancel"
              onClick={toggleReplyModal}
            >
              Annulla
            </button>
            <button
              className={`reply-modal-button send ${
                isLoading ? "loading-btn" : ""
              }`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <span></span> : "Invia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowReplyModal;
