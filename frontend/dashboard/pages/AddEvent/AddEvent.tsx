import "./AddEvent.css";
import { useMutation } from "@tanstack/react-query";
import Buttons from "../../components/Buttons/Buttons";
import { useContext, useState } from "react";
import ToastContext from "../../context/ToastContext";

import BookingFormSteps from "../../models/BookingFormSteps.model";
import {
  verifyCodiceFiscale,
  verifyEmail,
  verifyPhoneNumber,
} from "../../utils/verifyFormInputs";

const AddEvent = () => {
  const { toggleToast } = useContext(ToastContext);
  const mutation = useMutation({
    mutationFn: async (newEvent: BookingFormSteps) => {
      const response = await fetch("/api/pub/createJourneyFromAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      toggleToast({
        type: "success",
        message: "Prenotazione creata con successo",
      });
    },
    onError: () => {
      toggleToast({
        type: "error",
        message:
          "Si è verificato un errore durante la creazione della prenotazione",
      });
    },
  });

  const [formData, setFormData] = useState<BookingFormSteps>({
    keeper: {
      firstName: "",
      lastName: "",
      email: "",
      cf: "",
      phone: "",
    },
    group: {
      minors: 0,
      adults: 0,
    },
    organization: {
      name: "",
      type: "",
      address: "",
      phone: "",
      email: "",
    },
    journey: {
      startDate: "",
      endDate: "",
      title: "",
      annotations: "",
    },
  });
  const [duration, setDuration] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumValid, setIsPhoneNumValid] = useState(true);
  const [isCodiceFiscaleValid, setIsCodiceFiscaleValid] = useState(true);

  return (
    <div>
      <Buttons.BackButton></Buttons.BackButton>
      <h2>Aggiungi Prenotazione</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          formData.journey.title =
            formData.keeper.firstName + " " + formData.keeper.lastName;
          formData.journey.startDate += "T" + durationStart(+duration) + ":00";
          formData.journey.endDate += "T" + durationEnd(+duration) + ":00";
          mutation.mutate(formData);
        }}
        className="addEventForm"
      >
        <div className="keeper section">
          <h3>Dati Accompagnatore</h3>
          <div className="firstName-input inputGroup">
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
          <div className="lastName-input inputGroup">
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

          <div className="codiceFiscale-input inputGroup">
            <label htmlFor="codiceFiscale">Codice fiscale</label>
            <input
              type="text"
              id="codiceFiscale"
              value={formData.keeper.cf}
              required
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  keeper: {
                    ...prev.keeper,
                    cf: e.target.value,
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
          <div className="email-input inputGroup">
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
          <div className="phone-input inputGroup">
            <label htmlFor="phone">
              Telefono <span className="required">(obbligatorio)</span>
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
              required
            />
            {!isPhoneNumValid && formData.keeper.phone && (
              <span className="error-message">
                Numero di telefono non valido
              </span>
            )}
          </div>
        </div>
        <div className="organization section">
          <div className="organization-name-input inputGroup">
            <h3>Dati organizzazione</h3>
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

          <div className="organization-type-input inputGroup">
            <label htmlFor="organizationType">Tipo organizzazione</label>
            <select
              name="organizationType"
              id="organizationType"
              value={formData.organization.type}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  organization: {
                    ...prev.organization,
                    type: e.target.value,
                  },
                }));
              }}
            >
              <option value="" disabled>
                Seleziona tipo organizzazione
              </option>
              <option value="scuola">Scuola</option>
              <option value="gruppo">Gruppo</option>
            </select>
          </div>

          <div className="organization-address-input inputGroup">
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

          <div className="organization-email-input inputGroup">
            <label htmlFor="organizationEmail">
              Email organizzazione{" "}
              <span className="required">(obligatorio)</span>
            </label>
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
              onBlur={(e) => {
                if (!verifyEmail(e.target.value)) {
                  setIsEmailValid(false);
                  return;
                }
                setIsEmailValid(true);
              }}
              placeholder="Inserisci email organizzazione"
            />
            {!isEmailValid && (
              <span className="error-message">Email non valida</span>
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
              onBlur={(e) => {
                if (!verifyPhoneNumber(e.target.value)) {
                  setIsPhoneNumValid(false);
                  return;
                }
                setIsPhoneNumValid(true);
              }}
              placeholder="Inserisci telefono organizzazione"
            />
            {!isPhoneNumValid && formData.organization.phone && (
              <span className="error-message">Telefono non valido</span>
            )}
          </div>
        </div>

        <div className="journey section">
          <h3>Dati Prenotazione</h3>
          <div className="minors-input inputGroup">
            <label htmlFor="minors">Minori</label>
            <input
              type="number"
              id="minors"
              value={formData.group.minors}
              required
              min={0}
              max={30}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  group: {
                    ...prev.group,
                    minors: Number(e.target.value),
                  },
                }))
              }
              placeholder="Inserisci numero minorenni"
            />
          </div>

          <div className="adults-input inputGroup">
            <label htmlFor="adults">Adulti</label>
            <input
              type="number"
              id="adults"
              value={formData.group.adults}
              required
              min={0}
              max={30}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  group: {
                    ...prev.group,
                    adults: Number(e.target.value),
                  },
                }))
              }
              placeholder="Inserisci numero adulti"
            />
          </div>

          <div>
            <label htmlFor="">Durata</label>
            <select
              name=""
              id=""
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Scegli periodo di tempo
              </option>
              <option value="1">Mattina</option>
              <option value="2">Pomeriggio</option>
              <option value="3">Tutta la giornata</option>
              <option value="4">Più di un giorno</option>
            </select>
          </div>

          <div className="start-date-input inputGroup">
            <label htmlFor="start">Data inizio</label>
            <input
              type="date"
              id="start"
              min={new Date().toISOString().split("T")[0]}
              value={formData.journey.startDate.split("T")[0]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  journey: {
                    ...prev.journey,
                    startDate: e.target.value,
                    endDate: e.target.value,
                  },
                }))
              }
              placeholder="Inserisci data inizio"
            />
          </div>
          {+duration === 4 && (
            <div className="end-date-input inputGroup">
              <label htmlFor="end">Data fine</label>
              <input
                type="date"
                id="end"
                min={formData.journey.startDate.split(" ")[0]}
                value={formData.journey.endDate.split(" ")[0]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    journey: {
                      ...prev.journey,
                      endDate: e.target.value + durationEnd(+duration),
                    },
                  }))
                }
                placeholder="Inserisci data fine"
              />
            </div>
          )}
        </div>
        <div className="submitButton">
          <button type="submit">Invia</button>
        </div>
      </form>
    </div>
  );
};

const durationStart = (duration?: number) => {
  switch (duration) {
    case 1:
      return "08:00";
    case 2:
      return "13:00";
    case 3:
      return "08:00";
    case 4:
      return "08:00";
  }
};
const durationEnd = (duration?: number) => {
  switch (duration) {
    case 1:
      return "12:00";
    case 2:
      return "19:00";
    case 3:
      return "19:00";
    case 4:
      return "12:00";
  }
};

export default AddEvent;
