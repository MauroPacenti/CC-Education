import "./Dashboard.css";

import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import ToastProvider from "../../context/ToastProvider";
import Toast from "../../components/Toast/Toast";
import { useContext } from "react";
import ToastContext from "../../context/ToastContext";
/**
 * Main dashboard component that wraps the application layout
 * @returns {JSX.Element} Dashboard component with navigation and toast notifications
 */
const Dashboard = () => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <ToastProvider>
          <ToastContainer></ToastContainer>
          <Outlet></Outlet>
        </ToastProvider>
      </main>
    </>
  );
};

/**
 * Container component for displaying toast notifications
 * @returns {JSX.Element|null} Toast container with notifications or null if no toasts
 */
const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);

  if (toasts.length === 0) return null;

  return (
    <Toast.ToastContainer>
      {toasts.map((toast, index) => (
        <Toast
          key={`toast-${index}`}
          type={toast.type}
          message={toast.message}
        ></Toast>
      ))}
    </Toast.ToastContainer>
  );
};

export default Dashboard;
