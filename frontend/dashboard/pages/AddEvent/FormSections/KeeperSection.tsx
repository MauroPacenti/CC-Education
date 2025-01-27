import BookingFormSteps from "../../../models/BookingFormSteps.model";
import { ValidationModel } from "../../../models/Validation.model";
import {
  verifyCodiceFiscale,
  verifyEmail,
  verifyPhoneNumber,
} from "../../../utils/verifyFormInputs";

interface KeeperSectionProps {
  validationForm: ValidationModel;
  formData: BookingFormSteps;
  handleChange: (
    obj: "keeper" | "group" | "organization" | "journey",
    key: string,
    value: string | number
  ) => void;
  handleBlur: (
    obj: "keeper" | "group" | "organization" | "journey",
    key: string,
    isValid: boolean
  ) => void;
}

const KeeperSection = ({
  validationForm,
  formData,
  handleChange,
  handleBlur,
}: KeeperSectionProps) => {
  return (
    <div className="keeper section">
      <h3>Dati Accompagnatore</h3>
      <div className="firstName-input inputGroup">
        <label htmlFor="firstName">Nome accompagnatore</label>
        <input
          type="text"
          id="firstName"
          className={
            !validationForm.keeper.firstName &&
            validationForm.keeper.firstName !== undefined
              ? "error"
              : ""
          }
          value={formData.keeper.firstName}
          required
          onChange={(e) => handleChange("keeper", "firstName", e.target.value)}
          placeholder="Inserisci nome accompagnatore"
          onBlur={() => {
            if (formData.keeper.firstName.length < 2) {
              handleBlur("keeper", "firstName", false);
            } else {
              handleBlur("keeper", "firstName", true);
            }
          }}
        />
        {!validationForm.keeper.firstName &&
          validationForm.keeper.firstName !== undefined && (
            <p className="errorMessage"> Nome accompagnatore non valido</p>
          )}
      </div>
      <div className="lastName-input inputGroup">
        <label htmlFor="lastName">Cognome accompagnatore</label>
        <input
          type="text"
          id="lastName"
          className={`${
            !validationForm.keeper.lastName &&
            validationForm.keeper.lastName !== undefined
              ? "error"
              : ""
          }`}
          value={formData.keeper.lastName}
          required
          onChange={(e) => handleChange("keeper", "lastName", e.target.value)}
          placeholder="Inserisci cognome accompagnatore"
          onBlur={() => {
            if (formData.keeper.lastName.length < 2) {
              handleBlur("keeper", "lastName", false);
            } else {
              handleBlur("keeper", "lastName", true);
            }
          }}
        />
        {!validationForm.keeper.lastName &&
          validationForm.keeper.lastName !== undefined && (
            <p className="errorMessage">Cognome accompagnatore non valido</p>
          )}
      </div>

      <div className="codiceFiscale-input inputGroup">
        <label htmlFor="codiceFiscale">Codice fiscale</label>
        <input
          type="text"
          id="codiceFiscale"
          className={`${
            !validationForm.keeper.cf && validationForm.keeper.cf !== undefined
              ? "error"
              : ""
          }`}
          value={formData.keeper.cf}
          required
          onChange={(e) => handleChange("keeper", "cf", e.target.value)}
          onBlur={(e) => {
            if (!verifyCodiceFiscale(e.target.value)) {
              handleBlur("keeper", "cf", false);
              return;
            }
            handleBlur("keeper", "cf", true);
          }}
          placeholder="Inserisci codice fiscale"
        />
        {!validationForm.keeper.cf &&
          validationForm.keeper.cf !== undefined && (
            <p className="errorMessage">
              Codice fiscale accompagnatore non valido
            </p>
          )}
      </div>
      <div className="email-input inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={`${
            !validationForm.keeper.email &&
            validationForm.keeper.email !== undefined
              ? "error"
              : ""
          }`}
          required
          value={formData.keeper.email}
          onChange={(e) => {
            handleChange("keeper", "email", e.target.value);
          }}
          onBlur={(e) => {
            if (!verifyEmail(e.target.value)) {
              // add error message
              handleBlur("keeper", "email", false);
              return;
            }
            handleBlur("keeper", "email", true);
          }}
          placeholder="Inserisci email"
        />
        {!validationForm.keeper.email &&
          validationForm.keeper.email !== undefined && (
            <p className="errorMessage">Email accompagnatore non valida</p>
          )}
      </div>
      <div className="phone-input inputGroup">
        <label htmlFor="phone">Telefono</label>
        <input
          type="tel"
          id="phone"
          className={`${
            !validationForm.keeper.phone &&
            validationForm.keeper.phone !== undefined
              ? "error"
              : ""
          }`}
          value={formData.keeper.phone}
          onChange={(e) => handleChange("keeper", "phone", e.target.value)}
          onBlur={(e) => {
            if (!verifyPhoneNumber(e.target.value)) {
              handleBlur("keeper", "phone", false);
              return;
            }
            handleBlur("keeper", "phone", true);
          }}
          placeholder="Inserisci telefono"
          required
        />
        {!validationForm.keeper.phone &&
          validationForm.keeper.phone !== undefined && (
            <p className="errorMessage">Telefono accompagnatore non valido</p>
          )}
      </div>
    </div>
  );
};

export default KeeperSection;
