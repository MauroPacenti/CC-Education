import { useState } from "react";
import "./AddEventModal.css";
import { Booking } from "../../models/event.model";
import Modal from "../Modal/Modal";

interface Props {
  toggleActiveModal: () => void;
  addEventOnCalendar: (booking: Booking) => void;
}

const AddEventModal = ({ toggleActiveModal, addEventOnCalendar }: Props) => {
  const [formData, setFormData] = useState<Booking>({
    keeper: {
      firstName: "",
      lastName: "",
      email: "",
      codiceFiscale: "",
      phone: "",
    },
    organization: {
      isOrganization: null,
      name: "",
      type: "",
      address: "",
      email: "",
      phone: "",
    },
    bookingDetails: {
      minors: 0,
      adults: 0,
      start: "",
      end: "",
      otherInfo: "",
    },
  });

  const [stepForm, setStepForm] = useState<1 | 2 | 3>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data:  ", formData);
    addEventOnCalendar(formData);
  };

  const handleTimeSelection = (time: string, field: "start" | "end") => {
    setFormData((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        [field]: `${prev.bookingDetails[field].split(" ")[0]} ${time}:00`,
      },
    }));
  };

  return (
    <Modal toggleActiveModal={toggleActiveModal}>
      <form
        className="addEventForm"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3>Aggiungi Evento</h3>
        {stepForm === 1 && (
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
                    ? setStepForm(2)
                    : null
                  : setStepForm(3)
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
        )}

        {stepForm === 2 && formData.organization.isOrganization && (
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
              <label htmlFor="organizationAddress">
                Indirizzo organizzazione
              </label>
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

            <button type="button" onClick={() => setStepForm(1)}>
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
                  setStepForm(3);
                }
              }}
            >
              Avanti
            </button>
          </>
        )}

        {stepForm === 3 && (
          <>
            <div className="minors-input">
              <label htmlFor="minors">Minori</label>
              <input
                type="number"
                id="minors"
                value={formData.bookingDetails.minors}
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bookingDetails: {
                      ...prev.bookingDetails,
                      minors: Number(e.target.value),
                    },
                  }))
                }
                placeholder="Inserisci numero minorenni"
              />
            </div>

            <div className="adults-input">
              <label htmlFor="adults">Adulti</label>
              <input
                type="number"
                id="adults"
                value={formData.bookingDetails.adults}
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bookingDetails: {
                      ...prev.bookingDetails,
                      adults: Number(e.target.value),
                    },
                  }))
                }
                placeholder="Inserisci numero adulti"
              />
            </div>

            <div className="start-date-input">
              <label htmlFor="start">Data inizio</label>
              <input
                type="date"
                id="start"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bookingDetails: {
                      ...prev.bookingDetails,
                      start: e.target.value,
                    },
                  }))
                }
                placeholder="Inserisci data inizio"
              />
            </div>

            {formData.bookingDetails.start && (
              <div className="start-time-input">
                <select
                  onChange={(e) => handleTimeSelection(e.target.value, "start")}
                >
                  <option value="">Ora inizio</option>
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index} value={index + 8}>
                      {index + 8}:00
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="end-date-input">
              <label htmlFor="end">Data fine</label>
              <input
                type="date"
                id="end"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bookingDetails: {
                      ...prev.bookingDetails,
                      end: e.target.value,
                    },
                  }))
                }
                placeholder="Inserisci data fine"
              />
            </div>

            {formData.bookingDetails.end && (
              <div className="end-time-input">
                <select
                  onChange={(e) => handleTimeSelection(e.target.value, "end")}
                >
                  <option value="">Ora fine</option>
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index} value={index + 8}>
                      {index + 8}:00
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="other-info-input">
              <label htmlFor="otherInfo">Altre informazioni</label>
              <textarea
                name="otherInfo"
                id="otherInfo"
                rows={4}
                value={formData.bookingDetails.otherInfo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bookingDetails: {
                      ...prev.bookingDetails,
                      otherInfo: e.target.value,
                    },
                  }))
                }
              ></textarea>
            </div>

            <button
              type="button"
              onClick={() =>
                formData.organization.isOrganization
                  ? setStepForm(2)
                  : setStepForm(1)
              }
            >
              Indietro
            </button>
            <button
              type="submit"
              className="next"
              onClick={() => console.log(formData)}
              disabled={
                !formData.bookingDetails.start ||
                !formData.bookingDetails.end ||
                (formData.bookingDetails.minors === 0 &&
                  formData.bookingDetails.adults === 0)
              }
            >
              Aggiungi Prenotazione
            </button>
          </>
        )}
      </form>
    </Modal>
  );
};

export default AddEventModal;
