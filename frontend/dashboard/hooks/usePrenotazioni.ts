import { useCalendarApp } from "@schedule-x/react";
import { calendarBookingMapper } from "../utils/Mapper/CalendarBookingMapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useNavigate } from "react-router";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import PrenotazioniService from "../services/Prenotazioni.service";

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
/**
 * Custom hook for managing prenotazioni (bookings) with calendar integration
 * @returns {Object} An object containing:
 * - calendar: Calendar instance from @schedule-x/react
 * - isLoading: Boolean indicating if data is being fetched
 * - isError: Boolean indicating if there was an error fetching data
 */
const usePrenotazioni = () => {
  const navigate = useNavigate();
  const [eventsService] = useState(() => createEventsServicePlugin());
  // Add Event modal

  // event
  const { data, isLoading, isError } = useQuery({
    queryKey: ["journey"],
    queryFn: () =>
      PrenotazioniService.getAllBookings()
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

  return {
    calendar,
    isLoading,
    isError,
  };
};

export default usePrenotazioni;
