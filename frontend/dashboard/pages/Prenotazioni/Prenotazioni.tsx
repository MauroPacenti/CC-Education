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
import { calendarBookingMapper } from "../../utils/Mapper/CalendarBookingMapper";

interface Journey {
  id: number;
  title: string;
  keeper: {
    organization: {
      type: string;
    };
    group: {
      minors: number;
      adults: number;
    };
  };
  annotations: string;
  startDate: string;
  endDate: string;
  duration: number;
}

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
    const postEvent = async () => {
      try {
        const res = await fetch("/api/pub/addJourney", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (err) {
        console.error(err);
      }
    };

    postEvent();

    eventsService.add({ ...newEvent, id: Date.now() });
    eventsService.getAll();
    toggleAddEventModal();
  };

  useEffect(() => {
    fetch("/api/pub/getAllJourney")
      .then((response) => response.json())
      .then((data) => {
        data = data.map((booking: Journey) => calendarBookingMapper(booking));
        eventsService.set(data);
        setEvents(data);
        console.log(eventsService.getAll());
        console.log(data);
      })
      .catch((err) => console.error(err));
    eventsService.getAll();
  }, [eventsService]);

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
          <span className="booking-btn-text">Aggiungi Prenotazione</span>
        </button>
      </div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Prenotazioni;
