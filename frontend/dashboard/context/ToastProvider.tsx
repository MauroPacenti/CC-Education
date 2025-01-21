import { PropsWithChildren, useState } from "react";
import ToastContext from "./ToastContext";
import { Toast } from "../models/Toast.model";

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.message !== toast.message));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toasts, toggleToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
