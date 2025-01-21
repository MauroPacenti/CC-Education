export interface CalendarBooking {
  id: number;
  title: string;
  // The timestamps of an event can have two different formats: YYYY-MM-DD or YYYY-MM-DD HH:mm
  start: string;
  end: string;
  description: string;
  people: string[];
}
