import type Booking from "../../../../models/Booking.model";
import "./KeeperStep.css";

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
          placeholder="Inserisci codice fiscale"
        />
      </div>
      <div className="email-input">
        <label htmlFor="email">
          Email <span>(obbligatorio)</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.keeper.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              keeper: {
                ...prev.keeper,
                email: e.target.value,
              },
            }))
          }
          placeholder="Inserisci email"
        />
      </div>
      <div>
        <label htmlFor="phone">
          Telefono <span>(opzionale)</span>
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
          placeholder="Inserisci telefono"
        />
      </div>

      <div>
        <label htmlFor="organization">Sei un'organizzazione?</label>
        <div>
          <input
            type="radio"
            name="organization"
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

      <button
        type="button"
        className="next"
        onClick={() =>
          formData.organization.isOrganization
            ? formData.keeper.phone &&
              formData.keeper.codiceFiscale &&
              formData.keeper.email &&
              formData.keeper.lastName &&
              formData.keeper.firstName
              ? handleSteps(2)
              : null
            : handleSteps(3)
        }
        disabled={
          !formData.keeper.firstName ||
          !formData.keeper.lastName ||
          !formData.keeper.email ||
          !formData.keeper.codiceFiscale ||
          formData.organization.isOrganization === null
        }
      >
        Avanti
      </button>
    </>
  );
};

export default KeeperStep;
