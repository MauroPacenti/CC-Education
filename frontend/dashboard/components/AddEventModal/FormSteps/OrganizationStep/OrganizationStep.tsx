import type Booking from "../../../../models/Booking.model";
import "./OrganizationStep.css";

interface OrganizationStepProps {
  formData: Booking;
  setFormData: React.Dispatch<React.SetStateAction<Booking>>;
  handleSteps: (step: 1 | 2 | 3) => void;
}

const OrganizationStep = ({
  formData,
  setFormData,
  handleSteps,
}: OrganizationStepProps) => {
  return (
    <>
      <div className="organization-name-input">
        <label htmlFor="organizationName">Nome organizzazione</label>
        <input
          type="text"
          id="organizationName"
          value={formData.organization.name}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              organization: {
                ...prev.organization,
                name: e.target.value,
              },
            }))
          }
          placeholder="Inserisci nome organizzazione"
        />
      </div>

      <div className="organization-type-input">
        <label htmlFor="organizationType">Tipo organizzazione</label>
        <input
          type="text"
          id="organizationType"
          value={formData.organization.type}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              organization: {
                ...prev.organization,
                type: e.target.value,
              },
            }))
          }
          placeholder="Inserisci tipo organizzazione"
        />
      </div>

      <div className="organization-address-input">
        <label htmlFor="organizationAddress">Indirizzo organizzazione</label>
        <input
          type="text"
          id="organizationAddress"
          value={formData.organization.address}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              organization: {
                ...prev.organization,
                address: e.target.value,
              },
            }))
          }
          placeholder="Inserisci indirizzo organizzazione"
        />
      </div>

      <div className="organization-email-input">
        <label htmlFor="organizationEmail">Email organizzazione</label>
        <input
          type="email"
          id="organizationEmail"
          required
          value={formData.organization.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              organization: {
                ...prev.organization,
                email: e.target.value,
              },
            }))
          }
          placeholder="Inserisci email organizzazione"
        />
      </div>

      <div className="organization-phone-input">
        <label htmlFor="organizationPhone">Telefono organizzazione</label>
        <input
          type="tel"
          id="organizationPhone"
          value={formData.organization.phone}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              organization: {
                ...prev.organization,
                phone: e.target.value,
              },
            }))
          }
          placeholder="Inserisci telefono organizzazione"
        />
      </div>

      <button type="button" onClick={() => handleSteps(1)}>
        Indietro
      </button>

      <button
        type="button"
        className="next"
        disabled={
          !formData.organization.name ||
          !formData.organization.type ||
          !formData.organization.address ||
          !formData.organization.email ||
          !formData.organization.phone
        }
        onClick={() => {
          if (
            formData.organization.name &&
            formData.organization.type &&
            formData.organization.address &&
            formData.organization.email &&
            formData.organization.phone
          ) {
            handleSteps(3);
          }
        }}
      >
        Avanti
      </button>
    </>
  );
};
export default OrganizationStep;
