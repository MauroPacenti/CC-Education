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
 * Maps a Journey object to a calendar booking format
 * @param {Journey} booking - The journey booking object to map
 * @returns {Object} The mapped calendar booking object containing:
 *  - id: number
 *  - title: string
 *  - start: string (formatted date-time)
 *  - end: string (formatted date-time)
 *  - description: string (annotations or organization details)
 *  - people: string[] (array of group size details)
 */
export const calendarBookingMapper = (booking: Journey) => {
  return {
    id: booking.id,
    title: booking.title,
    start: `${booking.startDate.split("T")[0]} ${booking.startDate
      .split("T")[1]
      .slice(0, 5)}`,
    end: `${booking.endDate.split("T")[0]} ${booking.endDate
      .split("T")[1]
      .slice(0, 5)}`,
    description:
      booking.annotations ||
      `${booking.keeper.organization.name} | ${booking.keeper.organization.type}
      ${booking.keeper.organization.email}
      `,
    people: [
      `Aduti: ${booking.keeper.group.adults}`,
      `Minori: ${booking.keeper.group.minors}`,
    ],
  };
};
