import { useContext, useState } from "react";
import ToastContext from "../../context/ToastContext";
import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
/**
 * Modal component for handling password code verification
 * @param {Object} props - Component props
 * @param {Function} props.toggleCodePasswordModal - Function to toggle the visibility of the code password modal
 * @returns {JSX.Element} Password code modal component
 */
const PasswordCodeModal = ({
  toggleCodePasswordModal,
}: {
  toggleCodePasswordModal: () => void;
}) => {
  const [code, setCode] = useState(["", "", "", "", "", "", "", "", ""]);
  const { toggleToast } = useContext(ToastContext);

  /**
   * Handles changes to the code input fields
   * @param {number} index - Index of the code input field
   * @param {string} value - New value for the code input field
   */
  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 8) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  /**
   * Handles keydown events for code input fields
   * @param {number} index - Index of the code input field
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Keyboard event
   */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  /**
   * Handles paste events for code input fields
   * @param {React.ClipboardEvent<HTMLInputElement>} e - Clipboard event
   */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text").split("");
    if (pastedCode.length === 9) {
      setCode(pastedCode);
    }
  };

  /**
   * Saves changes by sending the verification code to the server
   * @returns {Promise<void>}
   * @throws {Error} If the code is invalid
   */
  const saveChanges = async () => {
    const response = await fetch(
      `/api/auth/saveChanges?oldEmailCode=${code.join("")}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`Codice non valido`);
    }
  };

  const mutation = useMutation({
    mutationFn: saveChanges,
    onSuccess: () => {
      toggleCodePasswordModal();
      setCode(["", "", "", "", "", "", "", "", ""]);
      toggleToast({
        message: "Password modificata con successo",
        type: "success",
      });
    },
    onError: (error) => {
      // Toast errore
      toggleToast({
        message: `${
          error instanceof Error
            ? error.message
            : "Errore durante la modifica della password"
        }`,
        type: "error",
      });
    },
  });

  return (
    <Modal toggleActiveModal={toggleCodePasswordModal}>
      <div className="settings-modal-code" onClick={(e) => e.stopPropagation()}>
        <h3>Inserisci il codice di conferma</h3>
        <p>
          Abbiamo inviato un codice di conferma all'email inserita.
          <br />
          Inserisci il codice per confermare la modifica.
        </p>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="settings-modal-input">
            <label htmlFor="code">Codice di conferma</label>
            <div className="code-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-${index}`}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="code-input"
                  maxLength={1}
                />
              ))}
            </div>
          </div>
          <div className="settings-buttons">
            <button
              type="reset"
              className="reset"
              onClick={() => {
                setCode(["", "", "", "", "", "", "", "", ""]);
                toggleCodePasswordModal();
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

export default PasswordCodeModal;
