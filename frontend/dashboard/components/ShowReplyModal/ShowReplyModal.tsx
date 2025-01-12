import { X } from "lucide-react";
import "./ShowReplyModal.css";
import { useState } from "react";

interface Props {
  toggleReplyModal: () => void;
  email?: string;
}

const ShowReplyModal = ({ toggleReplyModal, email }: Props) => {
  const [response, setResponse] = useState({
    email: email,
    title: "",
    content: "",
  });
  const [err, setErr] = useState<string | null>(null);

  const handleReply = async () => {
    try {
      const email = {
        to: response.email,
        subject: response.title,
        text: response.content,
      };

      // Using mailto to open default email client
      const mailtoLink = `mailto:${email.to}?subject=${encodeURIComponent(
        email.subject
      )}&body=${encodeURIComponent(email.text)}`;

      window.location.href = mailtoLink;
      toggleReplyModal();
    } catch (error) {
      setErr("Errore nell'invio dell'email: " + error);
    }
  };

  if (err) {
    return <div>Errore nel inviare la risposta</div>;
  }

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
        <form onSubmit={(e) => e.preventDefault()}>
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
                setResponse((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="reply-modal-message-input">
            <label htmlFor="">Messaggio</label>
            <textarea
              className="reply-modal-textarea"
              placeholder="Scrivi qui la tua risposta..."
              onChange={(e) =>
                setResponse((prev) => ({ ...prev, content: e.target.value }))
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
            <button className="reply-modal-button send" onClick={handleReply}>
              Invia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowReplyModal;
