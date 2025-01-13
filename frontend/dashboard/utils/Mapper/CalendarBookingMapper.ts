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

const durationStart = (duration: number) => {
  switch (duration) {
    case 1:
      return "08:00";
    case 2:
      return "13:00";
    case 3:
      return "08:00";
    default:
      return "";
  }
};
const durationEnd = (duration: number) => {
  switch (duration) {
    case 1:
      return "12:00";
    case 2:
      return "19:00";
    case 3:
      return "12:00";
    default:
      return "";
  }
};

export const calendarBookingMapper = (booking: Journey) => {
  return {
    id: booking.id,
    title: booking.title,
    start: `${booking.startDate}${durationStart(booking.duration)}`,
    end: `${booking.endDate}${durationEnd(booking.duration)}`,
    description: booking.annotations || "",
    people: [
      `Aduti: ${booking.keeper.group.adults}`,
      `Minori: ${booking.keeper.group.minors}`,
    ],
  };
};
