import { createContext } from "react";
import { Toast } from "../models/Toast.model";

const ToastContext = createContext<{
  toggleToast: (toast: Toast) => void;
  toasts: Toast[];
}>({
  toggleToast: () => {},
  toasts: [],
});

export default ToastContext;
