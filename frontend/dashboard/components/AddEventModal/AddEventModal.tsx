import "./AddEventModal.css";
import Modal from "../Modal/Modal";
import FormSteps from "./FormSteps/FormSteps";
import { CalendarBooking } from "../../models/CalendarBooking.model";

interface Props {
  toggleActiveModal: () => void;
  addEventOnCalendar: (booking: CalendarBooking) => void;
}

const AddEventModal = ({ toggleActiveModal, addEventOnCalendar }: Props) => {
  return (
    <Modal toggleActiveModal={toggleActiveModal}>
      <FormSteps handleSubmit={addEventOnCalendar}></FormSteps>
    </Modal>
  );
};

export default AddEventModal;
