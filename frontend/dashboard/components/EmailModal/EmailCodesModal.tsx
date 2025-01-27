import { useContext, useState } from "react";
import ToastContext from "../../context/ToastContext";
import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";

const EmailCodesModal = ({
  toggleCodesEmailModal,
}: {
  toggleCodesEmailModal: () => void;
}) => {
  const [oldCode, setOldCode] = useState(["", "", "", "", "", "", "", "", ""]);
  const [newCode, setNewCode] = useState(["", "", "", "", "", "", "", "", ""]);

  const { toggleToast } = useContext(ToastContext);

  /**
   * Handles changes in code input fields
   * @param {("old"|"new")} type - Type of code being entered (old or new email)
   * @param {number} index - Index of the input field
   * @param {string} value - Value entered in the input field
   */
  const handleCodeChange = (
    type: "old" | "new",
    index: number,
    value: string
  ) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const setCode = type === "old" ? setOldCode : setNewCode;
      setCode((prev) => {
        const newArray = [...prev];
        newArray[index] = value;
        return newArray;
      });

      // Auto-focus next input
      if (value && index < 8) {
        const nextInput = document.getElementById(`${type}-code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  /**
   * Handles keydown events for code input fields
   * @param {("old"|"new")} type - Type of code being entered (old or new email)
   * @param {number} index - Index of the input field
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Keyboard event
   */
  const handleKeyDown = (
    type: "old" | "new",
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !oldCode[index] && index > 0) {
      const prevInput = document.getElementById(`${type}-code-${index - 1}`);
      prevInput?.focus();
    }
  };

  /**
   * Handles paste events for code input fields
   * @param {("old"|"new")} type - Type of code being entered (old or new email)
   * @param {React.ClipboardEvent<HTMLInputElement>} e - Clipboard event
   */
  const handlePaste = (
    type: "old" | "new",
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text").split("");
    if (pastedCode.length === 9) {
      if (type === "old") {
        setOldCode(pastedCode);
      } else {
        setNewCode(pastedCode);
      }
    }
  };

  /**
   * Resets the code input states to empty values
   */
  const resetStates = () => {
    setOldCode(["", "", "", "", "", "", "", "", ""]);
    setNewCode(["", "", "", "", "", "", "", "", ""]);
  };

  /**
   * Sends the verification codes to the server
   * @returns {Promise<void>}
   * @throws {Error} If the server response is not ok
   */
  const saveChanges = async () => {
    const completeOldCode = oldCode.join("");
    const completeNewCode = newCode.join("");
    const response = await fetch(
      `/api/auth/saveChanges?oldEmailCode=${completeOldCode}&newEmailCode=${completeNewCode}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Codice non valido");
    }
  };

  const mutation = useMutation({
    mutationFn: saveChanges,
    onSuccess: () => {
      // toast successo
      toggleCodesEmailModal();
      resetStates();
      toggleToast({
        message: "Email modificata con successo",
        type: "success",
      });
    },
    onError: (error) => {
      // toast errore
      toggleToast({
        message: `${
          error instanceof Error
            ? error.message
            : "Errore durante la modifica dell'email"
        }`,
        type: "error",
      });
    },
  });

  return (
    <Modal toggleActiveModal={toggleCodesEmailModal}>
      <div className="settings-modal-code" onClick={(e) => e.stopPropagation()}>
        <h3>Inserisci il codice di conferma</h3>
        <p>
          Abbiamo inviato un codice di conferma alla vecchia email e all'email
          inserita.
          <br />
          Inserisci il codice per confermare la modifica.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="settings-modal-input">
            <label>Codice di conferma vecchia email</label>
            <div className="code-container">
              {oldCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`old-code-${index}`}
                  value={digit}
                  onChange={(e) =>
                    handleCodeChange("old", index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown("old", index, e)}
                  className="code-input"
                  maxLength={1}
                  onPaste={(e) => handlePaste("old", e)}
                />
              ))}
            </div>
          </div>
          <div className="settings-modal-input">
            <label>Codice di conferma nuova email</label>
            <div className="code-container">
              {newCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`new-code-${index}`}
                  value={digit}
                  onChange={(e) =>
                    handleCodeChange("new", index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown("new", index, e)}
                  className="code-input"
                  maxLength={1}
                  onPaste={(e) => handlePaste("new", e)}
                />
              ))}
            </div>
          </div>

          <div className="settings-buttons">
            <button
              type="reset"
              className="reset"
              onClick={() => {
                setOldCode(["", "", "", "", "", "", "", "", ""]);
                setNewCode(["", "", "", "", "", "", "", "", ""]);
                toggleCodesEmailModal();
              }}
            >
              Cancella
            </button>
            <button type="submit">Invia</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EmailCodesModal;
