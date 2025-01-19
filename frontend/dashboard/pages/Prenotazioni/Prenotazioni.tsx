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

import { useState } from "react";

import { NavLink, useNavigate } from "react-router";
import { CirclePlus } from "lucide-react";
import { calendarBookingMapper } from "../../utils/Mapper/CalendarBookingMapper";
import { useQuery } from "@tanstack/react-query";

interface Journey {
  id: number;
  title: string;
  keeper: {
    organization: {
      name: string;
      type: string;
      email: string;
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

  // event
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["journey"],
    queryFn: () =>
      fetch("/api/pub/getAllJourney")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data = data.map((event: Journey) => calendarBookingMapper(event));
          eventsService.set(data);
          eventsService.getAll();
          return data;
        })
        .finally(() => {
          eventsService.getAll();
          return data;
        }),
  });

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
    events: data,
    plugins: [eventsService, createEventModalPlugin()],
  });

  if (isError) {
    return (
      <div>
        <h2>Prenotazioni</h2>
        Error: {error.message}
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
