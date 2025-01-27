import "./Toast.css";
import { PropsWithChildren } from "react";

type ToastType = "success" | "error";

const ToastContainer = ({ children }: PropsWithChildren) => {
  return <div className="toast-container">{children}</div>;
};

/**
 * Individual toast notification item
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {ToastType} props.type - Type of toast notification
 * @returns {JSX.Element} Toast item component
 */
const ToastItem = ({
  children,
  type,
}: PropsWithChildren<{ type: ToastType }>) => {
  return <div className={`toast-item ${type}`}>{children}</div>;
};

/**
 * Message content for toast notification
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @returns {JSX.Element} Toast message component
 */
const ToastMessage = ({ children }: PropsWithChildren) => {
  return <div className="toast-message">{children}</div>;
};

/**
 * Main toast notification component
 * @param {object} props - Component props
 * @param {ToastType} props.type - Type of toast notification
 * @param {string} props.message - Message to display in the toast
 * @returns {JSX.Element} Toast component
 */
const Toast = ({ type, message }: { type: ToastType; message: string }) => {
  return (
    <ToastItem type={type}>
      <ToastMessage>{message}</ToastMessage>
    </ToastItem>
  );
};

Toast.ToastContainer = ToastContainer;

export default Toast;
