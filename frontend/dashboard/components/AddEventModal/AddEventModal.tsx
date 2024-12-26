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
    id: 0,
    title: "",
    start: "",
    end: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data:  ", formData);
    addEventOnCalendar(formData);
  };

  const handleTimeSelection = (time: string, field: "start" | "end") => {
    setFormData((prev) => ({
      ...prev,
      [field]: `${prev[field].split(" ")[0]} ${time}:00`,
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

        <div className="title-input">
          <label htmlFor="title">Nome accompagnatore</label>
          <input
            type="text"
            id="title"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Inserisci nome accompagnatore"
          />
        </div>

        <div className="description-input">
          <label htmlFor="description">Descrizione</label>
          <input
            type="text"
            id="description"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Inserisci descrizione"
          />
        </div>

        <div className="start-date-input">
          <label htmlFor="start">Data inizio</label>
          <input
            type="date"
            id="start"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, start: e.target.value }))
            }
            placeholder="Inserisci data inizio"
          />
        </div>

        {formData.start && (
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
              setFormData((prev) => ({ ...prev, end: e.target.value }))
            }
            placeholder="Inserisci data fine"
          />
        </div>

        {formData.end && (
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

        <button type="submit" onClick={() => console.log(formData)}>
          Aggiungi Prenotazione
        </button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
