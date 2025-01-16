import Booking from "../../models/BookingFormSteps.model";

const addBookingOnCalendarMapper = (booking: Booking) => {
  return {
    id: Date.now(),
    title: booking.organization.name,
    start: booking.bookingDetails.start,
    end: booking.bookingDetails.end,
    description: booking.bookingDetails.otherInfo,
    people: [
      `Aduti: ${booking.bookingDetails.adults}`,
      `Minori: ${booking.bookingDetails.minors}`,
    ],
  };
};

export default addBookingOnCalendarMapper;
