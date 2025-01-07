import { X } from "lucide-react";
import "./ShowReplyModal.css";
import { useState } from "react";

interface Props {
  toggleReplyModal: () => void;
  email: string;
}

const ShowReplyModal = ({ toggleReplyModal, email }: Props) => {
  const [response, setResponse] = useState({
    to: email,
    subject: "",
    message: "",
  });
  const [err, setErr] = useState<string | null>(null);

  const handleReply = async () => {
    try {
      const res = await fetch("/api/richiedi-informazione/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      toggleReplyModal();
    } catch (err) {
      setErr(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (err) {
    return <div>Errore nel inviare la risposta</div>;
  }

  return (
    <div className="reply-modal" onClick={(e) => e.stopPropagation()}>
      <div className="reply-modal-content">
        <button className="close-modal" onClick={toggleReplyModal}>
          <X />
        </button>
        <h3>Rispondi alla richiesta</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="reply-modal-email-input">
            <label htmlFor="">A: </label>
            <input type="email" placeholder="Email" value={email} readOnly />
          </div>

          <div className="reply-modal-object-input">
            <label htmlFor="">Oggetto:</label>
            <input
              type="text"
              placeholder="Oggetto"
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
                setResponse((prev) => ({ ...prev, message: e.target.value }))
              }
            ></textarea>
          </div>
          <div className="reply-modal-buttons">
            <button className="reply-modal-button" onClick={toggleReplyModal}>
              Annulla
            </button>
            <button className="reply-modal-button" onClick={handleReply}>
              Invia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowReplyModal;
