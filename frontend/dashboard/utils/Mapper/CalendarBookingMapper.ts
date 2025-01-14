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
    description: booking.annotations || "",
    people: [
      `Aduti: ${booking.keeper.group.adults}`,
      `Minori: ${booking.keeper.group.minors}`,
    ],
  };
};
