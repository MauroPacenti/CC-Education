import "./Prenotazioni.css";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";

import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

import { useEffect, useState } from "react";

import AddEventModal from "../../components/AddEventModal/AddEventModal";
import { Booking } from "../../models/event.model";
import { NavLink } from "react-router";

const Prenotazioni = () => {
  const [eventsService] = useState(() => createEventsServicePlugin());

  // Add Event modal
  const [isActiveModal, setIsActiveModal] = useState(false);
  // event
  const [events, setEvents] = useState<Booking[]>([
    {
      id: 1,
      title: "Prenotazione 1",
      start: "2025-01-01 10:00",
      end: "2025-01-01 12:00",
      description: "Gruppo 1",
    },
  ]);
  const toggleActiveModal = () =>
    setIsActiveModal((isActiveModal) => !isActiveModal);

  const addEventOnCalendar = (newEvent: Booking) => {
    setEvents((events) => [...events, newEvent]);
    eventsService.add({ ...newEvent, id: Date.now() });
    toggleActiveModal();
  };

  const modalService = createEventModalPlugin();

  const calendar = useCalendarApp({
    dayBoundaries: {
      start: "06:00",
      end: "21:00",
    },
    weekOptions: {
      gridHeight: 586,
    },
    callbacks: {
      onEventUpdate(updatedEvent) {
        console.log("onEventUpdate", updatedEvent);
      },
    },

    views: [
      // createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [
      eventsService,
      createScrollControllerPlugin({
        initialScroll: "07:50",
      }),
      modalService,
      createDragAndDropPlugin(),
    ],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
    return () => {
      console.log(eventsService.getAll());
    };
  }, [eventsService]);

  return (
    <div className="dashboard-calendar">
      {isActiveModal && (
        <AddEventModal
          toggleActiveModal={toggleActiveModal}
          addEventOnCalendar={addEventOnCalendar}
        ></AddEventModal>
      )}
      <h1>Prenotazioni</h1>
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          eventModal: ({ calendarEvent }) => (
            <div>
              <NavLink
                to={`/dashboard/prenotazioni/${calendarEvent.id}`}
                key={calendarEvent.id}
                className="calendarEvent-item"
              >
                <p className="calendarEvent-time">
                  {calendarEvent.start} - {calendarEvent.end}
                </p>
                <h4 className="calendarEvent-title">{calendarEvent.title}</h4>
              </NavLink>

              <button
                id="calendarEvent-remove"
                onClick={() => {
                  eventsService.remove(calendarEvent.id);
                  modalService.close();
                }}
              >
                Rimovi
              </button>
            </div>
          ),
        }}
      />

      <button className="add-event-button" onClick={toggleActiveModal}>
        Aggiungi
      </button>
    </div>
  );
};

export default Prenotazioni;
