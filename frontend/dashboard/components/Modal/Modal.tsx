import { PropsWithChildren } from "react";
import "./Modal.css";

interface Props {
  toggleActiveModal: () => void;
}
/**
 * Modal component that can be toggled open/closed
 * @param {Object} props - Component props
 * @param {Function} props.toggleActiveModal - Function to toggle the modal state
 * @param {React.ReactNode} props.children - Child elements to render inside the modal
 * @returns {JSX.Element} Modal component
 */
const Modal = ({ children, toggleActiveModal }: PropsWithChildren<Props>) => {
  return (
    <div className="modal" onClick={toggleActiveModal}>
      {children}
    </div>
  );
};

export default Modal;
