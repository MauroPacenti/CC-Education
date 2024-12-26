import { PropsWithChildren } from "react";
import "./Modal.css";

interface Props {
  toggleActiveModal: () => void;
}
const Modal = ({ children, toggleActiveModal }: PropsWithChildren<Props>) => {
  return (
    <div className="modal" onClick={toggleActiveModal}>
      {children}
    </div>
  );
};

export default Modal;
