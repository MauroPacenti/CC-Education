import { PropsWithChildren } from "react";
import Modal from "../Modal/Modal";
import "./ShowDeleteModal.css";
import { Trash } from "lucide-react";
/**
 * Modal component for confirming deletion of an item
 * @param {Object} props - Component props
 * @param {Function} props.toggleDeleteModal - Function to toggle the delete modal visibility
 * @param {Function} [props.onClick] - Optional callback function when delete is confirmed
 * @param {string} [props.subject] - Optional subject text to display what is being deleted
 * @returns {JSX.Element} Delete confirmation modal
 */
interface Props {
  toggleDeleteModal: (arg?: number) => void;
  onClick?: () => void;
  subject?: string;
}

const ShowDeleteModal = ({
  toggleDeleteModal,
  onClick,
  subject,
}: PropsWithChildren<Props>) => {
  // return <Modal toggleActiveModal={toggleDeleteModal}>{children}</Modal>;
  return (
    <Modal toggleActiveModal={toggleDeleteModal}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon">
          <Trash color="red" width={50} height={50}></Trash>
        </div>
        <p>Sei sicuro di voler eliminare questa {subject}?</p>
        <div className="delete-modal-buttons">
          <button
            className="delete-modal-button"
            onClick={() => toggleDeleteModal()}
          >
            Annulla
          </button>
          <button className="delete-modal-button delete" onClick={onClick}>
            Elimina
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShowDeleteModal;
