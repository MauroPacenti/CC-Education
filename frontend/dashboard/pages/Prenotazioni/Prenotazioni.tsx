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
const Prenotazioni = () => {
  const [eventsService] = useState(() => createEventsServicePlugin());

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
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2025-01-01 10:00",
        end: "2025-01-01 12:00",
      },
    ],
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
    console.log(eventsService.getAll());
    return () => {
      console.log(eventsService.getAll());
    };
  }, [eventsService]);

  return (
    <div className="dashboard-calendar">
      <h1>Prenotazioni</h1>
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          eventModal: ({ calendarEvent }) => (
            <div>
              <p>Component {calendarEvent.id}</p>
              <button
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

      <button
        onClick={() => {
          if (eventsService.getAll().some((e) => e.id === "2")) return;
          eventsService.add({
            id: "2",
            title: "test",
            start: "2025-01-01 12:00",
            end: "2025-01-01 14:00",
          });
        }}
      >
        Aggiungi
      </button>
    </div>
  );
};

export default Prenotazioni;
