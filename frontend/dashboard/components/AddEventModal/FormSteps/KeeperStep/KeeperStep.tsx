import { useState } from "react";
import type Booking from "../../../../models/BookingFormSteps.model";
import "./KeeperStep.css";
import {
  verifyCodiceFiscale,
  verifyEmail,
  verifyPhoneNumber,
} from "../../../../utils/verifyFormInputs";

interface KeeperStepProps {
  formData: Booking;
  setFormData: React.Dispatch<React.SetStateAction<Booking>>;
  handleSteps: (step: 1 | 2 | 3) => void;
}

const KeeperStep = ({
  formData,
  setFormData,
  handleSteps,
}: KeeperStepProps) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumValid, setIsPhoneNumValid] = useState(true);
  const [isCodiceFiscaleValid, setIsCodiceFiscaleValid] = useState(true);

  return (
    <>
      <div className="firstName-input">
        <label htmlFor="firstName">Nome accompagnatore</label>
        <input
          type="text"
          id="firstName"
          value={formData.keeper.firstName}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              keeper: {
                ...prev.keeper,
                firstName: e.target.value,
              },
            }))
          }
          placeholder="Inserisci nome accompagnatore"
        />
      </div>
      <div className="lastName-input">
        <label htmlFor="lastName">Cognome accompagnatore</label>
        <input
          type="text"
          id="lastName"
          value={formData.keeper.lastName}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              keeper: {
                ...prev.keeper,
                lastName: e.target.value,
              },
            }))
          }
          placeholder="Inserisci cognome accompagnatore"
        />
      </div>

      <div className="codiceFiscale-input">
        <label htmlFor="codiceFiscale">Codice fiscale</label>
        <input
          type="text"
          id="codiceFiscale"
          value={formData.keeper.codiceFiscale}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              keeper: {
                ...prev.keeper,
                codiceFiscale: e.target.value,
              },
            }))
          }
          onBlur={(e) => {
            if (!verifyCodiceFiscale(e.target.value)) {
              setIsCodiceFiscaleValid(false);
              return;
            }
            setIsCodiceFiscaleValid(true);
          }}
          placeholder="Inserisci codice fiscale"
        />
        {!isCodiceFiscaleValid && (
          <span className="error-message">Codice fiscale non valido</span>
        )}
      </div>
      <div className="email-input">
        <label htmlFor="email">
          Email <span className="required">(obbligatorio)</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.keeper.email}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              keeper: {
                ...prev.keeper,
                email: e.target.value,
              },
            }));
          }}
          onBlur={(e) => {
            if (!verifyEmail(e.target.value)) {
              // add error message
              setIsEmailValid(false);
              return;
            }
            setIsEmailValid(true);
          }}
          placeholder="Inserisci email"
        />
        {!isEmailValid && (
          <span className="error-message">Email non valida</span>
        )}
      </div>
      <div>
        <label htmlFor="phone">
          Telefono <span className="required">(opzionale)</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.keeper.phone}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              keeper: {
                ...prev.keeper,
                phone: e.target.value,
              },
            }))
          }
          onBlur={(e) => {
            if (!verifyPhoneNumber(e.target.value)) {
              setIsPhoneNumValid(false);
              return;
            }
            setIsPhoneNumValid(true);
          }}
          placeholder="Inserisci telefono"
        />
        {!isPhoneNumValid && formData.keeper.phone && (
          <span className="error-message">Numero di telefono non valido</span>
        )}
      </div>

      <div>
        <label htmlFor="organization">Sei un'organizzazione?</label>
        <div>
          <input
            type="radio"
            name="organization"
            value="yes"
            required
            {...(formData.organization.isOrganization === true && {
              checked: true,
            })}
            id="yes"
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                organization: {
                  ...prev.organization,
                  isOrganization: true,
                },
              }))
            }
          />
          <label htmlFor="yes">Si</label>
        </div>
        <div>
          <input
            type="radio"
            name="organization"
            value="no"
            {...(formData.organization.isOrganization === false && {
              checked: true,
            })}
            id="no"
            required
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                organization: {
                  ...prev.organization,
                  isOrganization: false,
                },
              }))
            }
          />
          <label htmlFor="no">No</label>
        </div>
      </div>

      <div className="buttons">
        <button
          type="button"
          className="next"
          onClick={() =>
            formData.organization.isOrganization === true
              ? handleSteps(2)
              : handleSteps(3)
          }
          disabled={
            !formData.keeper.firstName ||
            !formData.keeper.lastName ||
            !verifyEmail(formData.keeper.email) ||
            !formData.keeper.codiceFiscale ||
            (formData.keeper.phone &&
              !verifyPhoneNumber(formData.keeper.phone)) ||
            formData.organization.isOrganization === null
          }
        >
          Avanti
        </button>
      </div>
    </>
  );
};

export default KeeperStep;
