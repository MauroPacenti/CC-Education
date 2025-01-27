import { useState } from "react";

/**
 * Custom hook for managing toast notifications
 * @returns {Object} Object containing toast state and control functions
 * @returns {boolean} isToastOpen - Whether the toast is currently visible
 * @returns {('successo'|'errore'|'problema'|'info')} toastType - The type of toast message
 * @returns {string} toastMessage - The message to display in the toast
 * @returns {function} toggleToastMessage - Function to show a toast notification
 */
const useToast = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastType, setToastType] = useState<
    "successo" | "errore" | "problema" | "info"
  >("successo");
  const [toastMessage, setToastMessage] = useState("");

  const toggleToastMessage = (
    type: "successo" | "errore" | "problema" | "info",
    message: string
  ) => {
    setToastType(type);
    setToastMessage(message);
    setIsToastOpen(true);
    setTimeout(() => {
      setIsToastOpen(false);
    }, 3000);
  };

  return {
    isToastOpen,
    toastType,
    toastMessage,
    toggleToastMessage,
  };
};
export default useToast;
