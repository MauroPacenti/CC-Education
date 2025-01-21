import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import { useContext, useState } from "react";
import ToastContext from "../../context/ToastContext";

const EmailModal = ({
  toggleEmailModal,
  setIsOpenCodeEmailModal,
}: {
  toggleEmailModal: () => void;
  setIsOpenCodeEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toggleToast } = useContext(ToastContext);
  const [emails, setEmails] = useState({
    email: "",
    repeatEmail: "",
  });

  const [hasProblems, setHasProblems] = useState(false);
  const [timerId, setTimerId] = useState<number | null>(null);

  const [isOnBlurEmail, setIsOnBlurEmail] = useState(false);
  const [isOnBlurRepeatEmail, setIsOnBlurRepeatEmail] = useState(false);

  const updateEmail = async () => {
    const response = await fetch(`/api/auth/saveTemp?email=${emails.email}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return response.json();
  };

  const onSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOnBlurEmail(true);
    if (
      emails.email !== emails.repeatEmail ||
      !emails.email ||
      !emails.repeatEmail
    ) {
      return;
    }
    mutation.mutate();
    const newTimerId = setTimeout(() => {
      setHasProblems(true);
    }, 10000);
    setTimerId(newTimerId);
  };

  const mutation = useMutation({
    mutationFn: updateEmail,
    onSuccess: () => {
      toggleEmailModal();
      setIsOpenCodeEmailModal(true);
      resetStates();
    },
    onError: (error) => {
      clearTimeout(timerId!);
      toggleToast({
        message: `${
          error instanceof Error
            ? error.message
            : "Errore durante l'invio del codice"
        }`,
        type: "error",
      });
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmails((prev) => ({ ...prev, [name]: value }));
  };

  const resetStates = () => {
    setIsOnBlurEmail(false);
    setIsOnBlurRepeatEmail(false);
    setEmails({ email: "", repeatEmail: "" });
    setHasProblems(false);
  };

  return (
    <Modal toggleActiveModal={toggleEmailModal}>
      <div
        className="settings-modal email-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-modal-header">
          <h3>Modifica Email</h3>
          <p>Inserisci la nuova email e conferma la modifica</p>
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitEmail(e);
          }}
        >
          <div className="settings-modal-input">
            <div className="settings-modal-input">
              <label htmlFor="email">Nuova email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Inserisci la nuova email"
                value={emails.email}
                onChange={handleEmailChange}
                onBlur={() => setIsOnBlurEmail(true)}
                onFocus={() => setIsOnBlurEmail(false)}
                className={
                  isOnBlurEmail &&
                  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    emails.email
                  )
                    ? "error-input"
                    : ""
                }
              />
              {isOnBlurEmail &&
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                emails.email
              ) ? (
                <p className="error-message">
                  Inserisci un indirizzo email valido
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="settings-modal-input">
              <label htmlFor="repeatEmail">Ripeti email</label>
              <input
                type="email"
                name="repeatEmail"
                id="repeatEmail"
                placeholder="Ripeti la nuova email"
                value={emails.repeatEmail}
                onChange={handleEmailChange}
                onBlur={() => setIsOnBlurRepeatEmail(true)}
                className={
                  isOnBlurRepeatEmail && emails.repeatEmail !== emails.email
                    ? "error-input"
                    : ""
                }
              />
              <p>
                {isOnBlurRepeatEmail && emails.repeatEmail !== emails.email ? (
                  <p className="error-message">Le email non coincidono</p>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
          <div className="settings-buttons">
            <button
              type="reset"
              className="reset"
              onClick={() => {
                setEmails({ email: "", repeatEmail: "" });
              }}
            >
              Cancella
            </button>
            <button
              className={mutation.isPending ? "loading-btn" : ""}
              type="submit"
            >
              {mutation.isPending ? <span></span> : "Invia"}
            </button>
          </div>
          {hasProblems && (
            <p className="warning-message">Ops! Ci sta mettendo troppo</p>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default EmailModal;
