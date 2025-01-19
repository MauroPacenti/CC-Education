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

interface ValidationModel {
  keeper: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    cf: boolean;
    phone: boolean;
  };
  group: {
    minors: boolean;
    adults: boolean;
  };
  organization: {
    name: boolean;
    type: boolean;
    address: boolean;
    phone: boolean;
    email: boolean;
  };
  journey: {
    startDate: boolean;
    endDate: boolean;
    title: boolean;
    annotations: boolean;
    duration: boolean;
  };
}

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

  const [validationForm, setValidationForm] = useState<ValidationModel>({
    keeper: {
      firstName: true,
      lastName: true,
      email: true,
      cf: true,
      phone: true,
    },
    group: {
      minors: true,
      adults: true,
    },
    organization: {
      name: true,
      type: true,
      address: true,
      phone: true,
      email: true,
    },
    journey: {
      startDate: true,
      endDate: true,
      title: true,
      annotations: true,
      duration: true,
    },
  });

  const handleBlur = (
    obj: "keeper" | "group" | "organization" | "journey",
    key: string,
    isValid: boolean
  ) => {
    setValidationForm((prev: ValidationModel) => ({
      ...prev,
      [obj]: {
        ...prev[obj],
        [key]: isValid,
      },
    }));
  };

  return (
    <div>
      <Buttons.BackButton></Buttons.BackButton>
      <h2>Aggiungi Prenotazione</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
              className={!validationForm.keeper.firstName ? "error" : ""}
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
              onBlur={() => {
                if (formData.keeper.firstName.length < 2) {
                  handleBlur("keeper", "firstName", false);
                } else {
                  handleBlur("keeper", "firstName", true);
                }
              }}
            />
            {!validationForm.keeper.firstName && (
              <p className="errorMessage"> Nome accompagnatore non valido</p>
            )}
          </div>
          <div className="lastName-input inputGroup">
            <label htmlFor="lastName">Cognome accompagnatore</label>
            <input
              type="text"
              id="lastName"
              className={`${!validationForm.keeper.lastName ? "error" : ""}`}
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
              onBlur={() => {
                if (formData.keeper.lastName.length < 2) {
                  handleBlur("keeper", "lastName", false);
                } else {
                  handleBlur("keeper", "lastName", true);
                }
              }}
            />
            {!validationForm.keeper.lastName && (
              <p className="errorMessage">Cognome accompagnatore non valido</p>
            )}
          </div>

          <div className="codiceFiscale-input inputGroup">
            <label htmlFor="codiceFiscale">Codice fiscale</label>
            <input
              type="text"
              id="codiceFiscale"
              className={`${!validationForm.keeper.cf ? "error" : ""}`}
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
                  handleBlur("keeper", "cf", false);
                  return;
                }
                handleBlur("keeper", "cf", true);
              }}
              placeholder="Inserisci codice fiscale"
            />
            {!validationForm.keeper.cf && (
              <p className="errorMessage">
                Codice fiscale accompagnatore non valido
              </p>
            )}
          </div>
          <div className="email-input inputGroup">
            <label htmlFor="email">
              Email <span className="required">(obbligatorio)</span>
            </label>
            <input
              type="email"
              id="email"
              className={`${!validationForm.keeper.email ? "error" : ""}`}
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
                  handleBlur("keeper", "email", false);
                  return;
                }
                handleBlur("keeper", "email", true);
              }}
              placeholder="Inserisci email"
            />
            {!validationForm.keeper.email && (
              <p className="errorMessage">Email accompagnatore non valida</p>
            )}
          </div>
          <div className="phone-input inputGroup">
            <label htmlFor="phone">
              Telefono <span className="required">(obbligatorio)</span>
            </label>
            <input
              type="tel"
              id="phone"
              className={`${!validationForm.keeper.phone ? "error" : ""}`}
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
                  handleBlur("keeper", "phone", false);
                  return;
                }
                handleBlur("keeper", "phone", true);
              }}
              placeholder="Inserisci telefono"
              required
            />
            {!validationForm.keeper.phone && (
              <p className="errorMessage">Telefono accompagnatore non valido</p>
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
              className={`${!validationForm.organization.name ? "error" : ""}`}
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
              onBlur={() => {
                if (formData.organization.name.length < 2) {
                  handleBlur("organization", "name", false);
                } else {
                  handleBlur("organization", "name", true);
                }
              }}
            />
            {!validationForm.organization.name && (
              <p className="errorMessage">Nome organizzazione non valido</p>
            )}
          </div>

          <div className="organization-type-input inputGroup">
            <label htmlFor="organizationType">Tipo organizzazione</label>
            <select
              name="organizationType"
              id="organizationType"
              className={`${!validationForm.organization.type ? "error" : ""}`}
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
            {!validationForm.organization.type && (
              <p className="errorMessage">Tipo di organizzazione non valido</p>
            )}
          </div>

          <div className="organization-address-input inputGroup">
            <label htmlFor="organizationAddress">
              Indirizzo organizzazione
            </label>
            <input
              type="text"
              id="organizationAddress"
              className={`${
                !validationForm.organization.address ? "error" : ""
              }`}
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
              onBlur={() => {
                if (formData.organization.address.length < 2) {
                  handleBlur("organization", "address", false);
                } else {
                  handleBlur("organization", "address", true);
                }
              }}
              placeholder="Inserisci indirizzo organizzazione"
            />
            {!validationForm.organization.address && (
              <p className="errorMessage">
                Indirizzo organizzazione non valido
              </p>
            )}
          </div>

          <div className="organization-email-input inputGroup">
            <label htmlFor="organizationEmail">
              Email organizzazione{" "}
              <span className="required">(obligatorio)</span>
            </label>
            <input
              type="email"
              id="organizationEmail"
              className={`${!validationForm.organization.email ? "error" : ""}`}
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
                  handleBlur("organization", "email", false);
                  return;
                }
                handleBlur("organization", "email", true);
              }}
              placeholder="Inserisci email organizzazione"
            />
            {!validationForm.organization.email && (
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
              className={`${!validationForm.organization.phone ? "error" : ""}`}
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
                  handleBlur("organization", "phone", false);
                  return;
                }
                handleBlur("organization", "phone", true);
              }}
              placeholder="Inserisci telefono organizzazione"
            />
            {!validationForm.organization.phone && (
              <p className="errorMessage">Telefono organizzazione non valido</p>
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
              className={`${!validationForm.group.minors ? "error" : ""}`}
              value={formData.group.minors}
              required
              min={0}
              max={40}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  group: {
                    ...prev.group,
                    minors: Number(e.target.value),
                  },
                }))
              }
              onBlur={() => {
                if (
                  formData.group.minors < 0 ||
                  formData.group.minors > 40 ||
                  formData.group.adults <= 0
                ) {
                  handleBlur("group", "minors", false);
                } else {
                  handleBlur("group", "minors", true);
                }
              }}
              placeholder="Inserisci numero minorenni"
            />
            {!validationForm.group.minors && (
              <p className="errorMessage">Numero di minori non valido(0-40)</p>
            )}
          </div>

          <div className="adults-input inputGroup">
            <label htmlFor="adults">Adulti</label>
            <input
              type="number"
              id="adults"
              className={`${!validationForm.group.adults ? "error" : ""}`}
              value={formData.group.adults}
              required
              min={0}
              max={40}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  group: {
                    ...prev.group,
                    adults: Number(e.target.value),
                  },
                }))
              }
              onBlur={() => {
                if (formData.group.adults < 0 || formData.group.adults > 40) {
                  handleBlur("group", "adults", false);
                } else {
                  handleBlur("group", "adults", true);
                  handleBlur("group", "minors", true);
                }
              }}
              placeholder="Inserisci numero adulti"
            />
            {!validationForm.group.adults && (
              <p className="errorMessage">Numero di adulti non valido(0-40)</p>
            )}
          </div>

          <div>
            <label htmlFor="">Durata</label>
            <select
              name="durata"
              id="durata"
              className={`${!validationForm.journey.duration ? "error" : ""}`}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              required
              onBlur={(e) => {
                if (
                  e.target.value === "" ||
                  (e.target.value !== "1" &&
                    e.target.value !== "2" &&
                    e.target.value !== "3" &&
                    e.target.value !== "4")
                ) {
                  handleBlur("journey", "duration", false);
                } else {
                  handleBlur("journey", "duration", true);
                }
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
            {!validationForm.journey.duration && (
              <p className="errorMessage">Durata non valida</p>
            )}
          </div>

          <div className="start-date-input inputGroup">
            <label htmlFor="start">Data inizio</label>
            <input
              type="date"
              id="start"
              className={`${!validationForm.journey.startDate ? "error" : ""}`}
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
              required
              placeholder="Inserisci data inizio"
              onBlur={() => {
                if (
                  formData.journey.startDate === "" ||
                  formData.journey.startDate === "Invalid Date" ||
                  formData.journey.startDate === null ||
                  new Date(formData.journey.startDate) < new Date()
                ) {
                  handleBlur("journey", "startDate", false);
                } else {
                  handleBlur("journey", "startDate", true);
                }
              }}
            />
            {!validationForm.journey.startDate && (
              <p className="errorMessage">Data non valida</p>
            )}
          </div>
          {+duration === 4 && (
            <div className="end-date-input inputGroup">
              <label htmlFor="end">Data fine</label>
              <input
                type="date"
                id="end"
                className={`${!validationForm.journey.endDate ? "error" : ""}`}
                min={
                  new Date(formData.journey.startDate)
                    .toISOString()
                    .split("T")[0]
                }
                value={formData.journey.endDate.split("T")[0]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    journey: {
                      ...prev.journey,
                      endDate: e.target.value,
                    },
                  }))
                }
                onBlur={() => {
                  if (
                    formData.journey.endDate === "" ||
                    formData.journey.endDate === "Invalid Date" ||
                    formData.journey.endDate === null ||
                    new Date(formData.journey.endDate) < new Date() ||
                    new Date(formData.journey.endDate) <
                      new Date(formData.journey.startDate)
                  ) {
                    handleBlur("journey", "endDate", false);
                  } else {
                    handleBlur("journey", "endDate", true);
                  }
                }}
                required
                placeholder="Inserisci data fine"
              />
              {!validationForm.journey.endDate && (
                <p className="errorMessage">Data non valida</p>
              )}
            </div>
          )}
        </div>
        <div className="submitButton">
          <button
            type="submit"
            disabled={Object.values(validationForm).some((obj) =>
              Object.values(obj).some((value) => value === false)
            )}
            title={
              Object.values(validationForm).some((obj) =>
                Object.values(obj).some((value) => value === false)
              )
                ? "Compila tutti i campi"
                : "Invia Dati"
            }
            onClick={() => {
              if (
                Object.values(validationForm).some((obj) =>
                  Object.values(obj).every((value) => value === true)
                )
              ) {
                formData.journey.title =
                  formData.keeper.firstName + " " + formData.keeper.lastName;
                formData.journey.startDate +=
                  "T" + durationStart(+duration) + ":00";
                formData.journey.endDate +=
                  "T" + durationEnd(+duration) + ":00";
                mutation.mutate(formData);
              }
            }}
          >
            Invia
          </button>
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
