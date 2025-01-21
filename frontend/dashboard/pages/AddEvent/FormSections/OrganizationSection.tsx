import BookingFormSteps from "../../../models/BookingFormSteps.model";
import { ValidationModel } from "../../../models/Validation.model";
import {
  verifyEmail,
  verifyPhoneNumber,
} from "../../../utils/verifyFormInputs";

interface OrganizationSectionProps {
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

const OrganizationSection = ({
  validationForm,
  formData,
  handleChange,
  handleBlur,
}: OrganizationSectionProps) => {
  return (
    <div className="organization section">
      <div className="organization-name-input inputGroup">
        <h3>Dati organizzazione</h3>
        <label htmlFor="organizationName">Nome organizzazione</label>
        <input
          type="text"
          id="organizationName"
          className={`${
            !validationForm.organization.name &&
            validationForm.organization.name !== undefined
              ? "error"
              : ""
          }`}
          value={formData.organization.name}
          required
          onChange={(e) => handleChange("organization", "name", e.target.value)}
          placeholder="Inserisci nome organizzazione"
          onBlur={() => {
            if (formData.organization.name.length < 2) {
              handleBlur("organization", "name", false);
            } else {
              handleBlur("organization", "name", true);
            }
          }}
        />
        {!validationForm.organization.name &&
          validationForm.organization.name !== undefined && (
            <p className="errorMessage">Nome organizzazione non valido</p>
          )}
      </div>

      <div className="organization-type-input inputGroup">
        <label htmlFor="organizationType">Tipo organizzazione</label>
        <select
          name="organizationType"
          id="organizationType"
          className={`${
            !validationForm.organization.type &&
            validationForm.organization.type !== undefined
              ? "error"
              : ""
          }`}
          value={formData.organization.type}
          onChange={(e) => {
            handleChange("organization", "type", e.target.value);
          }}
          required
          onBlur={() => {
            if (formData.organization.type === "") {
              handleBlur("organization", "type", false);
            } else {
              handleBlur("organization", "type", true);
            }
          }}
        >
          <option value="" disabled selected>
            Seleziona tipo organizzazione
          </option>
          <option value="scuola">Scuola</option>
          <option value="gruppo">Gruppo</option>
        </select>
        {!validationForm.organization.type &&
          validationForm.organization.type !== undefined && (
            <p className="errorMessage">Tipo di organizzazione non valido</p>
          )}
      </div>

      <div className="organization-address-input inputGroup">
        <label htmlFor="organizationAddress">Indirizzo organizzazione</label>
        <input
          type="text"
          id="organizationAddress"
          className={`${
            !validationForm.organization.address &&
            validationForm.organization.address !== undefined
              ? "error"
              : ""
          }`}
          value={formData.organization.address}
          required
          onChange={(e) =>
            handleChange("organization", "address", e.target.value)
          }
          onBlur={() => {
            if (formData.organization.address.length < 2) {
              handleBlur("organization", "address", false);
            } else {
              handleBlur("organization", "address", true);
            }
          }}
          placeholder="Inserisci indirizzo organizzazione"
        />
        {!validationForm.organization.address &&
          validationForm.organization.address !== undefined && (
            <p className="errorMessage">Indirizzo organizzazione non valido</p>
          )}
      </div>

      <div className="organization-email-input inputGroup">
        <label htmlFor="organizationEmail">
          Email organizzazione <span className="required">(obligatorio)</span>
        </label>
        <input
          type="email"
          id="organizationEmail"
          className={`${
            !validationForm.organization.email &&
            validationForm.organization.email !== undefined
              ? "error"
              : ""
          }`}
          required
          value={formData.organization.email}
          onChange={(e) =>
            handleChange("organization", "email", e.target.value)
          }
          onBlur={(e) => {
            if (!verifyEmail(e.target.value)) {
              handleBlur("organization", "email", false);
              return;
            }
            handleBlur("organization", "email", true);
          }}
          placeholder="Inserisci email organizzazione"
        />
        {!validationForm.organization.email &&
          validationForm.organization.email !== undefined && (
            <p className="errorMessage">Email organizzazione non valida</p>
          )}
      </div>

      <div className="organization-phone-input inputGroup">
        <label htmlFor="organizationPhone">
          Telefono organizzazione{" "}
          <span className="required">(obligatorio)</span>
        </label>
        <input
          type="tel"
          id="organizationPhone"
          className={`${
            !validationForm.organization.phone &&
            validationForm.organization.phone !== undefined
              ? "error"
              : ""
          }`}
          value={formData.organization.phone}
          required
          onChange={(e) =>
            handleChange("organization", "phone", e.target.value)
          }
          onBlur={(e) => {
            if (!verifyPhoneNumber(e.target.value)) {
              handleBlur("organization", "phone", false);
              return;
            }
            handleBlur("organization", "phone", true);
          }}
          placeholder="Inserisci telefono organizzazione"
        />
        {!validationForm.organization.phone &&
          validationForm.organization.phone !== undefined && (
            <p className="errorMessage">Telefono organizzazione non valido</p>
          )}
      </div>
    </div>
  );
};

export default OrganizationSection;
