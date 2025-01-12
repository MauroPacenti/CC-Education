import Booking from "../../models/Booking.model";
import { CalendarBooking } from "../../models/CalendarBooking.model";

export const CalendarBookingMapper = (booking: Booking): CalendarBooking => {
  return {
    id: Date.now().toString(),
    title:
      booking.organization.name ||
      `${booking.keeper.firstName} ${booking.keeper.lastName}`,
    start: booking.bookingDetails.start,
    end: booking.bookingDetails.end,
    description: booking.bookingDetails.otherInfo || "",
    people: [
      `Aduti: ${booking.bookingDetails.adults}`,
      `Minori: ${booking.bookingDetails.minors}`,
    ],
  };
};
