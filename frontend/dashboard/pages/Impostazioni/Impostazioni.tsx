import { ChevronRight } from "lucide-react";
import "./Impostazioni.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Impostazioni = () => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);

  const [isOpenCodePasswordModal, setIsOpenCodePasswordModal] = useState(false);
  const [isOpenCodeEmailModal, setIsOpenCodeEmailModal] = useState(false);

  const [requirements, setRequirements] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [passwords, setPasswords] = useState({
    password: "",
    repeatPassword: "",
  });
  const [emails, setEmails] = useState({
    email: "",
    repeatEmail: "",
  });

  const [code, setCode] = useState("");

  const [emailCodes, setEmailCodes] = useState({
    emailCode: "",
    newEmailCode: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmails((prev) => ({ ...prev, [name]: value }));
  };

  const updatePassword = async () => {
    const response = await fetch(
      `/api/auth/saveTemp?password=${passwords.password}`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return response.json();
  };

  const onSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updatePassword();
      console.log(res);
      if (!res) {
        throw new Error("Errore durante l'aggiornamento della password");
      }
      setIsOpenPasswordModal(false);
      setIsOpenCodePasswordModal(true);
      setRequirements({
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
      setPasswords({ password: "", repeatPassword: "" });
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
    }
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

  const onSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateEmail();
      console.log(res);
      if (!res) {
        throw new Error("Errore durante l'aggiornamento della password");
      }
      setIsOpenEmailModal(false);
      setIsOpenCodeEmailModal(true);
      setEmails({ email: "", repeatEmail: "" });
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
    }
  };

  const onSubmitPasswordCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/auth/saveChanges?oldEmailCode=${code}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      setIsOpenCodePasswordModal(false);
      setCode("");
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
    }
  };

  const onSubmitEmailCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/auth/saveChanges?oldEmailCode=${emailCodes.emailCode}&newEmailCode=${emailCodes.newEmailCode}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      setIsOpenCodeEmailModal(false);
      setCode("");
    } catch (error) {
      console.error("Errore durante l'aggiornamento della password:", error);
    }
  };

  const togglePasswordModal = () => {
    setIsOpenPasswordModal((prev) => !prev);
  };

  const toggleEmailModal = () => {
    setIsOpenEmailModal((prev) => !prev);
  };

  const toggleCodePasswordModal = () => {
    setIsOpenCodePasswordModal((prev) => !prev);
  };

  const toggleCodeEmailModal = () => {
    setIsOpenCodeEmailModal((prev) => !prev);
  };

  return (
    <>
      {isOpenPasswordModal && (
        <Modal toggleActiveModal={togglePasswordModal}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>Modifica Password</h3>
              <div className="password-requirements">
                <h4>Sono necessari almeno:</h4>
                <p
                  className={`${
                    passwords.password && requirements.hasUppercase
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  una lettera maiuscola
                </p>
                <p
                  className={`${
                    passwords.password && requirements.hasUppercase
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  una lettera minuscola
                </p>

                <p
                  className={`${
                    passwords.password && requirements.hasNumber
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  un numero
                </p>
                <p
                  className={`
                  ${
                    passwords.password && requirements.hasSpecialChar
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  un carattere speciale
                </p>
              </div>
            </div>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitPassword(e);
              }}
            >
              <div className="settings-modal-input">
                <label htmlFor="newPassword">Inserisci nuova password</label>
                <input
                  type="password"
                  name="password"
                  id="newPassword"
                  value={passwords.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="settings-modal-input">
                <label htmlFor="repeatNewPassword">Ripeti password</label>
                <input
                  type="password"
                  name="repeatPassword"
                  id="repeatNewPassword"
                />
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
                <button type="submit">Invia</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {isOpenCodePasswordModal && (
        <Modal toggleActiveModal={toggleCodePasswordModal}>
          <div
            className="settings-modal-code"
            onClick={(e) => e.stopPropagation()}
          >
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
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="settings-buttons">
                <button
                  type="reset"
                  className="reset"
                  onClick={() => {
                    setCode("");
                  }}
                >
                  Cancella
                </button>
                <button type="submit">Invia</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {isOpenEmailModal && (
        <Modal toggleActiveModal={toggleEmailModal}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>Modifica Email</h3>
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
                  <label htmlFor="email">Inserisci nuova email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={emails.email}
                    onChange={handleEmailChange}
                  />
                  <p>
                    {emails.email && !emails.email.includes("@")
                      ? "Inserisci un indirizzo email valido"
                      : ""}
                  </p>
                </div>
                <div className="settings-modal-input">
                  <label htmlFor="repeatEmail">Ripeti email</label>
                  <input
                    type="email"
                    name="repeatEmail"
                    id="repeatEmail"
                    value={emails.repeatEmail}
                    onChange={handleEmailChange}
                  />
                  <p>
                    {emails.repeatEmail !== emails.email
                      ? "Le email non coincidono"
                      : ""}
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
                <button type="submit">Invia</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {isOpenCodeEmailModal && (
        <Modal toggleActiveModal={toggleCodeEmailModal}>
          <div
            className="settings-modal-code"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Inserisci il codice di conferma</h3>
            <p>
              Abbiamo inviato un codice di conferma alla vecchia email e
              all'email inserita.
              <br />
              Inserisci il codice per confermare la modifica.
            </p>
            <form
              action=""
              onSubmit={(e) => {
                onSubmitEmailCode(e);
              }}
            >
              <div className="settings-modal-input">
                <label htmlFor="code">Codice di conferma vecchia email</label>
                <input
                  type="text"
                  name="oldEmailCode"
                  id="code"
                  value={emailCodes.emailCode}
                  onChange={(e) =>
                    setEmailCodes((prev: any) => ({
                      ...prev,
                      emailCode: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="settings-modal-input">
                <label htmlFor="code">Codice di conferma nuova email</label>
                <input
                  type="text"
                  name="newEmailCode"
                  id="code"
                  value={emailCodes.newEmailCode}
                  onChange={(e) =>
                    setEmailCodes((prev: any) => ({
                      ...prev,
                      newEmailCode: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="settings-buttons">
                <button
                  type="reset"
                  className="reset"
                  onClick={() => {
                    setCode("");
                  }}
                >
                  Cancella
                </button>
                <button type="submit">Invia</button>
              </div>
            </form>
          </div>
        </Modal>
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

export default Impostazioni;
