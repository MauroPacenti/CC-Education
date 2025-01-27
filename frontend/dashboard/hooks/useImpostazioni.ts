import { useState } from "react";
/**
 * Custom hook for managing modal states and toggle functions related to user settings
 * @returns {Object} Object containing modal states and their toggle functions
 * @returns {boolean} isOpenPasswordModal - State for password change modal
 * @returns {boolean} isOpenEmailModal - State for email change modal
 * @returns {boolean} isOpenCodePasswordModal - State for password verification code modal
 * @returns {boolean} isOpenCodeEmailModal - State for email verification code modal
 * @returns {Function} togglePasswordModal - Function to toggle password modal
 * @returns {Function} toggleEmailModal - Function to toggle email modal
 * @returns {Function} toggleCodePasswordModal - Function to toggle password code modal
 * @returns {Function} toggleCodesEmailModal - Function to toggle email code modal
 * @returns {Function} setIsOpenCodePasswordModal - State setter for password code modal
 * @returns {Function} setIsOpenCodesEmailModal - State setter for email code modal
 */
const useImpostazioni = () => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);

  const [isOpenCodePasswordModal, setIsOpenCodePasswordModal] = useState(false);
  const [isOpenCodeEmailModal, setIsOpenCodesEmailModal] = useState(false);

  const togglePasswordModal = () => {
    setIsOpenPasswordModal((prev) => !prev);
  };

  const toggleEmailModal = () => {
    setIsOpenEmailModal((prev) => !prev);
  };

  const toggleCodePasswordModal = () => {
    setIsOpenCodePasswordModal((prev) => !prev);
  };

  const toggleCodesEmailModal = () => {
    setIsOpenCodesEmailModal((prev) => !prev);
  };
  return {
    isOpenPasswordModal,
    isOpenEmailModal,
    isOpenCodePasswordModal,
    isOpenCodeEmailModal,
    togglePasswordModal,
    toggleEmailModal,
    toggleCodePasswordModal,
    toggleCodesEmailModal,
    setIsOpenCodePasswordModal,
    setIsOpenCodesEmailModal,
  };
};
export default useImpostazioni;
