import { ChevronRight } from "lucide-react";
import "./Impostazioni.css";

const Impostazioni = () => {
  return (
    <div className="settings-container">
      <h2>Impostazioni</h2>
      <p>Gestisci e modifica la tua password oppure email. </p>

      <div className="settings-container-buttons">
        <button className="btn-settings">
          <span>Modifica Password</span> <ChevronRight />
        </button>
        <button className="btn-settings">
          <span>Modifica Email</span> <ChevronRight />{" "}
        </button>
        <button className="btn-settings">
          <span>Modifica Email e Password</span> <ChevronRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default Impostazioni;
