import "./Prenotazioni.css";
import { ScheduleXCalendar } from "@schedule-x/react";

import "@schedule-x/theme-default/dist/index.css";

import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import usePrenotazioni from "../../hooks/usePrenotazioni";
/**
 * Prenotazioni component displays a calendar view of bookings/reservations
 * @returns {JSX.Element} The rendered Prenotazioni component
 */
const Prenotazioni = () => {
  const { calendar, isError, isLoading } = usePrenotazioni();

  if (isError) {
    return (
      <div>
        <h2>Prenotazioni</h2>
        Errore durante il caricamento delle prenotazioni.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Prenotazioni</h2>
        Loading...
      </div>
    );
  }

  return (
    <div className="dashboard-calendar">
      <div className="dashboard-calendar-header">
        <h2 className="dashboard-calendar-title">Prenotazioni</h2>
        <NavLink
          to={"/dashboard/prenotazioni/aggiungi-prenotazione"}
          className="add-event-button"
        >
          <CirclePlus />
          <span className="booking-btn-text">Aggiungi Prenotazione</span>
        </NavLink>
      </div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Prenotazioni;
