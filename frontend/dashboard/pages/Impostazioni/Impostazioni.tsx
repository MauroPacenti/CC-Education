import { ChevronRight } from "lucide-react";
import "./Impostazioni.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Impostazioni = () => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);

  const [isOpenCodePasswordModal, setIsOpenCodePasswordModal] = useState(false);
  const [isOpenCodeEmailModal, setIsOpenCodesEmailModal] = useState(false);

  const togglePasswordModal = () => {
    setIsOpenPasswordModal((prev) => !prev);
  };

  const toggleEmailModal = () => {
    setIsOpenEmailModal((prev) => !prev);
  };

  const toggleCodePasswordModal = () => {
    setIsOpenCodePasswordModal((prev) => !prev);
  };

  const toggleCodesEmailModal = () => {
    setIsOpenCodesEmailModal((prev) => !prev);
  };

  return (
    <>
      {isOpenPasswordModal && (
        <PasswordModal
          setIsOpenCodePasswordModal={setIsOpenCodePasswordModal}
          togglePasswordModal={togglePasswordModal}
        ></PasswordModal>
      )}
      {isOpenCodePasswordModal && (
        <PasswordCodeModal
          toggleCodePasswordModal={toggleCodePasswordModal}
        ></PasswordCodeModal>
      )}
      {isOpenEmailModal && (
        <EmailModal
          setIsOpenCodeEmailModal={setIsOpenCodesEmailModal}
          toggleEmailModal={toggleEmailModal}
        ></EmailModal>
      )}
      {isOpenCodeEmailModal && (
        <EmailCodesModal
          toggleCodesEmailModal={toggleCodesEmailModal}
        ></EmailCodesModal>
      )}
      <div className="settings-container">
        <h2>Impostazioni</h2>
        <p>Gestisci e modifica la tua password oppure email. </p>

        <div className="settings-container-buttons">
          <button className="btn-settings" onClick={togglePasswordModal}>
            <span>Modifica Password</span> <ChevronRight />
          </button>
          <button className="btn-settings" onClick={toggleEmailModal}>
            <span>Modifica Email</span> <ChevronRight />{" "}
          </button>
        </div>
      </div>
    </>
  );
};

const PasswordModal = ({
  togglePasswordModal,
  setIsOpenCodePasswordModal,
}: {
  togglePasswordModal: () => void;
  setIsOpenCodePasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updatePassword = async () => {
    const response = await fetch(
      `/api/auth/saveTemp?password=${passwords.password}`,
      {
        method: "PUT",
      }
    );
    console.log("hey");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return response.json();
  };

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
    setIsLoading(true);
    problemsTimer();

    try {
      const res = await updatePassword();
      console.log(res);
      if (!res) {
        throw new Error("Errore durante l'aggiornamento della password");
      }
      setIsOpenCodePasswordModal(true);
      togglePasswordModal();
      resetPasswordState();
    } catch (error) {
      setError("Errore durante l'aggiornamento della password: " + error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

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

  const [hasProblems, setHasProblems] = useState(false);

  const problemsTimer = () => {
    setTimeout(() => {
      setHasProblems(true);
    }, 10000);
  };

  return (
    <Modal toggleActiveModal={togglePasswordModal}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
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
              }}
            >
              Cancella
            </button>
            <button className={isLoading ? "loading-btn" : ""} type="submit">
              {isLoading ? <span></span> : "Invia"}
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

const PasswordCodeModal = ({
  toggleCodePasswordModal,
}: {
  toggleCodePasswordModal: () => void;
}) => {
  const [code, setCode] = useState(["", "", "", "", "", "", "", "", ""]);

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

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const onSubmitPasswordCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const completeCode = code.join("");
    try {
      const response = await fetch(
        `/api/auth/saveChanges?oldEmailCode=${completeCode}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      toggleCodePasswordModal();
      setCode(["", "", "", "", "", "", "", "", ""]);
      // Toast successo
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
    }
  };

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
            onSubmitPasswordCode(e);
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

const EmailModal = ({
  toggleEmailModal,
  setIsOpenCodeEmailModal,
}: {
  toggleEmailModal: () => void;
  setIsOpenCodeEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [emails, setEmails] = useState({
    email: "",
    repeatEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasProblems, setHasProblems] = useState(false);
  const [isOnBlurEmail, setIsOnBlurEmail] = useState(false);
  const [isOnBlurRepeatEmail, setIsOnBlurRepeatEmail] = useState(false);

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
    setIsLoading(true);
    problemsTimer();
    try {
      const res = await updateEmail();
      console.log(res);
      if (!res) {
        throw new Error("Errore durante l'aggiornamento della password");
      }
      toggleEmailModal();
      setIsOpenCodeEmailModal(true);
      setEmails({ email: "", repeatEmail: "" });
    } catch (error) {
      setError("Errore durante l'aggiornamento della password: " + error);
    } finally {
      setIsLoading(false);
      setIsOnBlurEmail(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmails((prev) => ({ ...prev, [name]: value }));
  };

  const updateEmail = async () => {
    const response = await fetch(`/api/auth/saveTemp?email=${emails.email}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return response.json();
  };

  const problemsTimer = () => {
    setTimeout(() => {
      setHasProblems(true);
    }, 10000);
  };

  return (
    <Modal toggleActiveModal={toggleEmailModal}>
      <div
        className="settings-modal email-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {error && <p className="error-message">{error}</p>}
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
            <button className={isLoading ? "loading-btn" : ""} type="submit">
              {isLoading ? <span></span> : "Invia"}
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

const EmailCodesModal = ({
  toggleCodesEmailModal,
}: {
  toggleCodesEmailModal: () => void;
}) => {
  const [oldCode, setOldCode] = useState(["", "", "", "", "", "", "", "", ""]);
  const [newCode, setNewCode] = useState(["", "", "", "", "", "", "", "", ""]);

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

  const onSubmitEmailCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const completeOldCode = oldCode.join("");
    const completeNewCode = newCode.join("");
    try {
      const response = await fetch(
        `/api/auth/saveChanges?oldEmailCode=${completeOldCode}&newEmailCode=${completeNewCode}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      toggleCodesEmailModal();
      setOldCode(["", "", "", "", "", "", "", "", ""]);
      setNewCode(["", "", "", "", "", "", "", "", ""]);

      // toast successo
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
    }
  };

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
        <form onSubmit={onSubmitEmailCode}>
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

export default Impostazioni;
