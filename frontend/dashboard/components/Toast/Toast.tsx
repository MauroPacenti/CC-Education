import "./Toast.css";
import { PropsWithChildren } from "react";

type ToastType = "success" | "error";

const ToastContainer = ({ children }: PropsWithChildren) => {
  return <div className="toast-container">{children}</div>;
};

const ToastItem = ({
  children,
  type,
}: PropsWithChildren<{ type: ToastType }>) => {
  return <div className={`toast-item ${type}`}>{children}</div>;
};

const ToastMessage = ({ children }: PropsWithChildren) => {
  return <div className="toast-message">{children}</div>;
};

const Toast = ({ type, message }: { type: ToastType; message: string }) => {
  return (
    <ToastItem type={type}>
      <ToastMessage>{message}</ToastMessage>
    </ToastItem>
  );
};

Toast.ToastContainer = ToastContainer;

export default Toast;
