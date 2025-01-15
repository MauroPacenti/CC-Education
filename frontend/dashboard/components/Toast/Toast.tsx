import "./Toast.css";
import { PropsWithChildren } from "react";

const ToastContainer = ({ children }: PropsWithChildren) => {
  return <div className="toast-container">{children}</div>;
};

type ToastType = "successo" | "errore" | "problema" | "info";

const ToastItem = ({
  children,
  toastType,
  isToastOpen,
}: PropsWithChildren<{ toastType: ToastType; isToastOpen: boolean }>) => {
  return (
    <div className={`toast ${toastType} ${isToastOpen ? "show" : ""}`}>
      {children}
    </div>
  );
};

const ToastMessage = ({ children }: PropsWithChildren) => {
  return <div className="toast-message">{children}</div>;
};

const Toast = {
  ToastContainer,
  ToastItem,
  ToastMessage,
};

export default Toast;
