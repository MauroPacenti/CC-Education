import { PropsWithChildren } from "react";
import Modal from "../Modal/Modal";
import "./ShowDeleteModal.css";

interface Props {
  toggleDeleteModal: () => void;
}

const ShowDeleteModal = ({
  toggleDeleteModal,
  children,
}: PropsWithChildren<Props>) => {
  return <Modal toggleActiveModal={toggleDeleteModal}>{children}</Modal>;
};

export default ShowDeleteModal;
