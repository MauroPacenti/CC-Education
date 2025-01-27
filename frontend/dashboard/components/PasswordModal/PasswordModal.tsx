import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import ToastContext from "../../context/ToastContext";
/**
 * Modal component for password modification
 * @param {Object} props - Component props
 * @param {() => void} props.togglePasswordModal - Function to toggle the password modal visibility
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsOpenCodePasswordModal - State setter for code password modal visibility
 * @returns {JSX.Element} Password modal component
 */
const PasswordModal = ({
  togglePasswordModal,
  setIsOpenCodePasswordModal,
}: {
  togglePasswordModal: () => void;
  setIsOpenCodePasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toggleToast } = useContext(ToastContext);

  const [isOnBlurPassword, setIsOnBlurPassword] = useState(false);
  const [isOnBlurRepeatPassword, setIsOnBlurRepeatPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    password: "",
    repeatPassword: "",
  });
  const [requirements, setRequirements] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const [hasProblems, setHasProblems] = useState(false);

  /**
   * Updates the password by making an API call
   * @returns {Promise<any>} API response
   * @throws {Error} If password update fails
   */
  const updatePassword = async () => {
    const response = await fetch(
      `/api/auth/saveTemp?password=${passwords.password}`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error(`Password non salvata correttamente`);
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      setIsOpenCodePasswordModal(true);
      togglePasswordModal();
      resetPasswordState();
      clearTimeout(timerId);
    },
    onError: () => {
      clearTimeout(timerId);
      toggleToast({
        message: "Errore durante l'aggiornamento della password",
        type: "error",
      });
    },
  });

  /**
   * Handles password submission and validation
   */
  const onSubmitPassword = async () => {
    verifyPassword(passwords.password);
    setIsOnBlurPassword(true);

    if (
      !requirements.hasUppercase ||
      !requirements.hasLowercase ||
      !requirements.hasNumber ||
      !requirements.hasSpecialChar ||
      !requirements.hasMinLength ||
      passwords.password !== passwords.repeatPassword
    ) {
      return;
    }

    mutation.mutate();
    const newTimerId = setTimeout(() => {
      setHasProblems(true);
    }, 10000);
    setTimerId(newTimerId);
  };

  /**
   * Resets password state to initial values
   */
  const resetPasswordState = () => {
    setPasswords({ password: "", repeatPassword: "" });
    setIsOnBlurPassword(false);
    setRequirements({
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      hasMinLength: false,
    });
  };

  /**
   * Handles password input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Verifies password against security requirements
   * @param {string} password - Password to verify
   */
  const verifyPassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasMinLength = password.length >= 12;

    setRequirements({
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    });
  };

  return (
    <Modal toggleActiveModal={togglePasswordModal}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-modal-header">
          <h3>Modifica Password</h3>
          <div className="password-requirements">
            <h4>Sono necessari almeno:</h4>
            <p
              className={`${
                isOnBlurPassword &&
                (requirements.hasUppercase ? "correct" : "incorrect")
              }`}
            >
              una lettera maiuscola
            </p>
            <p
              className={`${
                isOnBlurPassword &&
                (requirements.hasLowercase ? "correct" : "incorrect")
              }`}
            >
              una lettera minuscola
            </p>

            <p
              className={`${
                isOnBlurPassword &&
                (requirements.hasNumber ? "correct" : "incorrect")
              }`}
            >
              un numero
            </p>
            <p
              className={`
          ${
            isOnBlurPassword &&
            (requirements.hasSpecialChar ? "correct" : "incorrect")
          }`}
            >
              un carattere speciale
            </p>
            <p
              className={`${
                isOnBlurPassword &&
                (requirements.hasMinLength ? "correct" : "incorrect")
              }`}
            >
              una lunghezza minima di 12 caratteri
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitPassword();
          }}
        >
          <div className="settings-modal-input">
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              name="password"
              id="newPassword"
              placeholder="Inserisci la nuova password"
              value={passwords.password}
              onChange={handlePasswordChange}
              onBlur={() => {
                verifyPassword(passwords.password);
                setIsOnBlurPassword(true);
              }}
              className={`${
                isOnBlurPassword &&
                !requirements.hasUppercase &&
                !requirements.hasLowercase &&
                !requirements.hasNumber &&
                !requirements.hasSpecialChar &&
                !requirements.hasMinLength &&
                "error-input"
              }`}
            />
            <p className="error-message">
              {isOnBlurPassword &&
                !requirements.hasUppercase &&
                !requirements.hasLowercase &&
                !requirements.hasNumber &&
                !requirements.hasSpecialChar &&
                !requirements.hasMinLength &&
                "Inserisci una password valida"}
            </p>
          </div>
          <div className="settings-modal-input">
            <label htmlFor="repeatNewPassword">Ripeti password</label>
            <input
              type="password"
              name="repeatPassword"
              id="repeatNewPassword"
              placeholder="Ripeti la nuova password"
              value={passwords.repeatPassword}
              onChange={handlePasswordChange}
              onBlur={() => {
                setIsOnBlurRepeatPassword(true);
              }}
              className={`${
                isOnBlurRepeatPassword &&
                passwords.password !== passwords.repeatPassword &&
                "error-input"
              }`}
            />
            <p className="error-message">
              {isOnBlurRepeatPassword &&
                passwords.password !== passwords.repeatPassword &&
                "Le password non coincidono"}
            </p>
          </div>

          <div className="settings-buttons">
            <button
              type="reset"
              className="reset"
              onClick={() => {
                setPasswords({ password: "", repeatPassword: "" });
                togglePasswordModal();
              }}
            >
              Cancella
            </button>
            <button
              className={mutation.isPending ? "loading-btn" : ""}
              type="submit"
              disabled={mutation.isPending}
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

export default PasswordModal;
