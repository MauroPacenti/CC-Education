import { PropsWithChildren } from "react";
import Modal from "../Modal/Modal";
import "./ShowDeleteModal.css";
import { Trash } from "lucide-react";

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
