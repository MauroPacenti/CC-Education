import { ChevronRight } from "lucide-react";
import "./Impostazioni.css";

import PasswordModal from "../../components/PasswordModal/PasswordModal";
import PasswordCodeModal from "../../components/PasswordModal/PasswordCodeModal";
import EmailModal from "../../components/EmailModal/EmailModal";
import EmailCodesModal from "../../components/EmailModal/EmailCodesModal";
import useImpostazioni from "../../hooks/useImpostazioni";

const Impostazioni = () => {
  const {
    isOpenPasswordModal,
    isOpenCodePasswordModal,
    isOpenEmailModal,
    isOpenCodeEmailModal,

    togglePasswordModal,
    toggleCodePasswordModal,
    toggleEmailModal,
    toggleCodesEmailModal,

    setIsOpenCodePasswordModal,
    setIsOpenCodesEmailModal,
  } = useImpostazioni();
  return (
    <>
      {isOpenPasswordModal && (
        <PasswordModal
          setIsOpenCodePasswordModal={setIsOpenCodePasswordModal}
          togglePasswordModal={togglePasswordModal}
        ></PasswordModal>
      )}
      {isOpenCodePasswordModal && (
        <PasswordCodeModal
          toggleCodePasswordModal={toggleCodePasswordModal}
        ></PasswordCodeModal>
      )}
      {isOpenEmailModal && (
        <EmailModal
          setIsOpenCodeEmailModal={setIsOpenCodesEmailModal}
          toggleEmailModal={toggleEmailModal}
        ></EmailModal>
      )}
      {isOpenCodeEmailModal && (
        <EmailCodesModal
          toggleCodesEmailModal={toggleCodesEmailModal}
        ></EmailCodesModal>
      )}
      <div className="settings-container">
        <h2>Impostazioni</h2>
        <p>Gestisci e modifica la tua password oppure email. </p>

        <div className="settings-container-buttons">
          <button className="btn-settings" onClick={togglePasswordModal}>
            <span>Modifica Password</span> <ChevronRight />
          </button>
          <button className="btn-settings" onClick={toggleEmailModal}>
            <span>Modifica Email</span> <ChevronRight />{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Impostazioni;
