import { PropsWithChildren } from "react";
import Modal from "../Modal/Modal";
import "./ShowDeleteModal.css";

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
        <h3>Sei sicuro di voler eliminare questa {subject}?</h3>
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
