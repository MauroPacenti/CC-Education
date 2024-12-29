import "./AddEventModal.css";
import type Booking from "../../models/Booking.model";
import Modal from "../Modal/Modal";
import FormSteps from "./FormSteps/FormSteps";

interface Props {
  toggleActiveModal: () => void;
  addEventOnCalendar: (booking: Booking) => void;
}

const AddEventModal = ({ toggleActiveModal, addEventOnCalendar }: Props) => {
  return (
    <Modal toggleActiveModal={toggleActiveModal}>
      <FormSteps handleSubmit={addEventOnCalendar}></FormSteps>
    </Modal>
  );
};

export default AddEventModal;
