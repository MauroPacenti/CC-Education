import { PropsWithChildren, useState } from "react";
import ToastContext from "./ToastContext";
import { Toast } from "../models/Toast.model";

/**
 * Provider component for managing toast notifications
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 * @returns {JSX.Element} Toast provider component
 */
const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a new toast and removes it after a delay
   * @param {Toast} toast - The toast notification to display
   */
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
