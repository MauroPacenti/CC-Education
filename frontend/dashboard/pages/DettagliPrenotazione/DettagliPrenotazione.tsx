import "./DettagliPrenotazione.css";

import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

interface Booking {
  id: number;
  title: string;
  startHour: string;
  endHour: string;
  participants: { minor: number; adult: number };
  group: string;
}

const DettagliPrenotazione = () => {
  const { idPrenotazione } = useParams();

  const [bookingDetails, setBookingDetails] = useState<Booking>({
    id: 0,
    title: "",
    startHour: "",
    endHour: "",
    participants: { minor: 0, adult: 0 },
    group: "",
  });

  useEffect(() => {
    fetch(
      ""
      // /api/booking/${idPrenotazione}
    )
      .then((response) => response.json())
      .then((data) => setBookingDetails(data));
  }, [idPrenotazione]);

  return (
    <div className="booking-details">
      <NavLink to="/dashboard/">
        <MoveLeft />
      </NavLink>
      <h2>Dettagli Prenotazione {idPrenotazione}</h2>
      <p>{bookingDetails?.title}</p>
    </div>
  );
};

export default DettagliPrenotazione;
