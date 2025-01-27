import "./AddEvent.css";
import Buttons from "../../components/Buttons/Buttons";
import KeeperSection from "./FormSections/KeeperSection";
import OrganizationSection from "./FormSections/OrganizationSection";
import JourneySection from "./FormSections/JourneySection";
import useAddEvent from "../../hooks/useAddEvent";
/**
 * AddEvent component for creating new event/booking entries
 * @returns {JSX.Element} The AddEvent form component
 */
const AddEvent = () => {
  const {
    duration,
    handleBlur,
    handleChange,
    handleClick,
    isFormValid,
    formData,
    validationForm,
    setDuration,
    mutation,
  } = useAddEvent();

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
        <KeeperSection
          formData={formData}
          handleBlur={handleBlur}
          handleChange={handleChange}
          validationForm={validationForm}
        ></KeeperSection>

        <OrganizationSection
          formData={formData}
          handleBlur={handleBlur}
          handleChange={handleChange}
          validationForm={validationForm}
        ></OrganizationSection>

        <JourneySection
          formData={formData}
          handleBlur={handleBlur}
          handleChange={handleChange}
          validationForm={validationForm}
          setDuration={setDuration}
          duration={duration}
        ></JourneySection>

        <div className="submitButton">
          <button
            type="submit"
            className={mutation.isPending ? "loading-btn" : ""}
            disabled={!isFormValid || mutation.isPending}
            title={
              Object.values(validationForm).some((obj) =>
                Object.values(obj).some((value) => value === false)
              )
                ? "Compila tutti i campi"
                : "Invia Dati"
            }
            onClick={handleClick}
          >
            {mutation.isPending ? <span></span> : "Invia"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
