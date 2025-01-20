import { useState } from "react";

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
