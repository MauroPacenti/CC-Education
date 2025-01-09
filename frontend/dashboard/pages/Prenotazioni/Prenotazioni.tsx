import "./Prenotazioni.css";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";

import { createEventModalPlugin } from "@schedule-x/event-modal";

import { useEffect, useState } from "react";

import AddEventModal from "../../components/AddEventModal/AddEventModal";
import { useNavigate } from "react-router";
import { CalendarBooking } from "../../models/CalendarBooking.model";
import { CirclePlus } from "lucide-react";

const Prenotazioni = () => {
  const navigate = useNavigate();
  const [eventsService] = useState(() => createEventsServicePlugin());
  // Add Event modal
  const [isActiveModal, setIsActiveModal] = useState(false);

  // event
  const [events, setEvents] = useState<CalendarBooking[]>([]);
  const toggleAddEventModal = () =>
    setIsActiveModal((isActiveModal) => !isActiveModal);

  const addEventOnCalendar = (newEvent: CalendarBooking) => {
    console.log(newEvent);
    setEvents((events) => [...events, newEvent]);
    eventsService.add({ ...newEvent, id: Date.now() });
    eventsService.getAll();
    toggleAddEventModal();
  };

  const calendar = useCalendarApp({
    locale: "it-IT",
    dayBoundaries: {
      start: "06:00",
      end: "21:00",
    },
    weekOptions: {
      gridHeight: 586,
    },
    callbacks: {
      onDoubleClickEvent(event) {
        navigate(`/dashboard/prenotazioni/${event.id}`);
      },
    },

    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService, createEventModalPlugin()],
  });

  useEffect(() => {
    fetch("/api/pub/getAllBookings")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.error(err));
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className="dashboard-calendar">
      {isActiveModal && (
        <AddEventModal
          toggleActiveModal={toggleAddEventModal}
          addEventOnCalendar={addEventOnCalendar}
        ></AddEventModal>
      )}
      <div className="dashboard-calendar-header">
        <h2 className="dashboard-calendar-title">Prenotazioni</h2>
        <button className="add-event-button" onClick={toggleAddEventModal}>
          <CirclePlus />
          <span className="btn-text">Aggiungi Prenotazione</span>
        </button>
      </div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Prenotazioni;
