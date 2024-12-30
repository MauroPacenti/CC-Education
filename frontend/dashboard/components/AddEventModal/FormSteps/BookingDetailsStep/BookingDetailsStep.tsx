import type Booking from "../../../../models/Booking.model";
import "./BookingDetailsStep.css";

interface BookingDetailsStepProps {
  formData: Booking;
  setFormData: React.Dispatch<React.SetStateAction<Booking>>;
  handleSteps: (step: 1 | 2 | 3) => void;
}

const BookingDetailsStep = ({
  formData,
  setFormData,
  handleSteps,
}: BookingDetailsStepProps) => {
  const handleTimeSelection = (time: string, field: "start" | "end") => {
    setFormData((prev) => ({
      ...prev,
      bookingDetails: {
        ...prev.bookingDetails,
        [field]: `${prev.bookingDetails[field].split(" ")[0]} ${
          time.length === 2 ? "" : "0"
        }${time}:00`,
      },
    }));
  };

  return (
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
          min={new Date().toISOString().split("T")[0]}
          value={formData.bookingDetails.start.split(" ")[0]}
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
              <option
                onClick={() => console.log(new Date().getHours())}
                selected={
                  formData.bookingDetails.start.split(" ")[1] ===
                  `${index + 8}:00`
                }
                key={index}
                value={index + 8}
                disabled={+new Date().getHours() >= index + 8}
              >
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
          min={new Date().toISOString().split("T")[0]}
          value={formData.bookingDetails.end.split(" ")[0]}
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
          <select onChange={(e) => handleTimeSelection(e.target.value, "end")}>
            <option value="">Ora fine</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option
                key={index}
                value={index + 8}
                selected={
                  formData.bookingDetails.end.split(" ")[1] ===
                  `${index + 8}:00`
                }
                disabled={
                  formData.bookingDetails.start.split(" ")[0] ===
                    formData.bookingDetails.end.split(" ")[0] &&
                  +formData.bookingDetails.start.split(" ")[1].split(":")[0] >=
                    index + 8
                }
              >
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

      <div className="buttons">
        <button
          type="button"
          className="back"
          onClick={() =>
            formData.organization.isOrganization
              ? handleSteps(2)
              : handleSteps(1)
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
      </div>
    </>
  );
};

export default BookingDetailsStep;
