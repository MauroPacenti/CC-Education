import BookingFormSteps from "../../../models/BookingFormSteps.model";
import { ValidationModel } from "../../../models/Validation.model";

interface JourneySectionProps {
  validationForm: ValidationModel;
  formData: BookingFormSteps;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
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
/**
 * Component for the journey section of the booking form
 * @param {Object} props - Component props
 * @param {ValidationModel} props.validationForm - Form validation state
 * @param {BookingFormSteps} props.formData - Form data state
 * @param {string} props.duration - Selected duration value
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setDuration - Function to update duration
 * @param {Function} props.handleChange - Function to handle form field changes
 * @param {Function} props.handleBlur - Function to handle form field blur events
 * @returns {JSX.Element} Journey section component
 */
const JourneySection = ({
  validationForm,
  formData,
  handleChange,
  handleBlur,
  duration,
  setDuration,
}: JourneySectionProps) => {
  return (
    <div className="journey section">
      <h3>Dati Prenotazione</h3>
      <div className="adults-input inputGroup">
        <label htmlFor="adults">Adulti</label>
        <input
          type="number"
          id="adults"
          className={`${
            !validationForm.group.adults &&
            validationForm.group.adults !== undefined
              ? "error"
              : ""
          }`}
          value={formData.group.adults}
          required
          min={0}
          max={40}
          onChange={(e) => handleChange("group", "adults", +e.target.value)}
          onBlur={() => {
            if (formData.group.adults < 0 || formData.group.adults > 40) {
              handleBlur("group", "adults", false);
            } else if (
              formData.group.adults === 0 &&
              formData.group.minors === 0
            ) {
              handleBlur("group", "adults", false);
              handleBlur("group", "minors", false);
            } else if (formData.group.adults > 0) {
              handleBlur("group", "adults", true);
              handleBlur("group", "minors", true);
            }
          }}
          placeholder="Inserisci numero adulti"
        />
        {!validationForm.group.adults &&
          validationForm.group.adults !== undefined && (
            <p className="errorMessage">Numero di adulti non valido(0-40)</p>
          )}
      </div>
      <div className="minors-input inputGroup">
        <label htmlFor="minors">Minori</label>
        <input
          type="number"
          id="minors"
          className={`${
            !validationForm.group.minors &&
            validationForm.group.minors !== undefined
              ? "error"
              : ""
          }`}
          value={formData.group.minors}
          required
          min={0}
          max={40}
          onChange={(e) => handleChange("group", "minors", +e.target.value)}
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
        {!validationForm.group.minors &&
          validationForm.group.minors !== undefined && (
            <p className="errorMessage">Numero di minori non valido(0-40)</p>
          )}
      </div>

      <div>
        <label htmlFor="">Durata</label>
        <select
          name="durata"
          id="durata"
          className={`${
            !validationForm.journey.duration &&
            validationForm.journey.duration !== undefined
              ? "error"
              : ""
          }`}
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
        {!validationForm.journey.duration &&
          validationForm.journey.duration !== undefined && (
            <p className="errorMessage">Durata non valida</p>
          )}
      </div>

      <div className="start-date-input inputGroup">
        <label htmlFor="start">Data inizio</label>
        <input
          type="date"
          id="start"
          className={`${
            !validationForm.journey.startDate &&
            validationForm.journey.startDate !== undefined
              ? "error"
              : ""
          }`}
          min={new Date().toISOString().split("T")[0]}
          value={formData.journey.startDate.split("T")[0]}
          onChange={(e) => {
            handleChange("journey", "startDate", e.target.value);
            handleChange("journey", "endDate", e.target.value);
            handleBlur("journey", "startDate", true);
            handleBlur("journey", "endDate", true);
          }}
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
              handleBlur("journey", "endDate", true);
            }
          }}
        />
        {!validationForm.journey.startDate &&
          validationForm.journey.startDate !== undefined && (
            <p className="errorMessage">Data non valida</p>
          )}
      </div>
      {+duration === 4 && (
        <div className="end-date-input inputGroup">
          <label htmlFor="end">Data fine</label>
          <input
            type="date"
            id="end"
            className={`${
              !validationForm.journey.endDate &&
              validationForm.journey.endDate !== undefined
                ? "error"
                : ""
            }`}
            min={formData.journey.startDate.split("T")[0]}
            value={formData.journey.endDate.split("T")[0]}
            onChange={(e) => handleChange("journey", "endDate", e.target.value)}
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
          {!validationForm.journey.endDate &&
            validationForm.journey.endDate !== undefined && (
              <p className="errorMessage">Data non valida</p>
            )}
        </div>
      )}
    </div>
  );
};

export default JourneySection;
