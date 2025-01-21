import { useState } from "react";

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
