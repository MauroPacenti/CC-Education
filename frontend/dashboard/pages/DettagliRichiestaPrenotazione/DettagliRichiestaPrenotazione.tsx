import { useNavigate, useParams } from "react-router";
import "./DettagliRichiestaPrenotazione.css";
import { MoveLeft } from "lucide-react";

const DettagliRichiestaPrenotazione = () => {
  const { idRichiestaPrenotazione } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button className="back-button" onClick={() => navigate(-1)}>
        <MoveLeft></MoveLeft>
      </button>

      <h2>DettagliRichiestaPrenotazione {idRichiestaPrenotazione} </h2>
    </div>
  );
};

export default DettagliRichiestaPrenotazione;
