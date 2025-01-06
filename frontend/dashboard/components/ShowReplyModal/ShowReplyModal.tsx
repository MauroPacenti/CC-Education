import Modal from "../Modal/Modal";
import "./ShowReplyModal.css";

interface Props {
  toggleReplyModal: () => void;
}

const ShowReplyModal = ({ toggleReplyModal }: Props) => {
  return <Modal toggleActiveModal={toggleReplyModal}>hello</Modal>;
};

export default ShowReplyModal;
