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

const Prenotazioni = () => {
  const navigate = useNavigate();
  const [eventsService] = useState(() => createEventsServicePlugin());
  // Add Event modal
  const [isActiveModal, setIsActiveModal] = useState(false);

  // event
  const [events, setEvents] = useState<CalendarBooking[]>([
    {
      id: "1",
      title: "Prenotazione 1",
      start: "2025-01-01 10:00",
      end: "2025-01-01 12:00",
      description: "Gruppo 1",
      people: ["Adulti: 2", "Bambini: 3"],
    },
  ]);
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
    // get all events
    eventsService.getAll();
  }, [eventsService, events]);

  return (
    <div className="dashboard-calendar">
      {isActiveModal && (
        <AddEventModal
          toggleActiveModal={toggleAddEventModal}
          addEventOnCalendar={addEventOnCalendar}
        ></AddEventModal>
      )}
      <div className="dashboard-calendar-header">
        <h1 className="dashboard-calendar-title">Prenotazioni</h1>
        <button className="add-event-button" onClick={toggleAddEventModal}>
          Aggiungi Prenotazione
        </button>
      </div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Prenotazioni;
