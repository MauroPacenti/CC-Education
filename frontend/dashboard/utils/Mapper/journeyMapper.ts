import { Booking } from "../../models/Booking.model";

const journeyMapper = (data: Booking[]) => {
  return data.map((journey: Booking) => ({
    id: journey.id,
    title: journey.annotations || journey.keeper.organization.name,
    startDate: journey.startDate,
    endDate: journey.endDate,
    organizationType: journey.keeper?.organization?.type,
    participants: {
      minor: journey.keeper.group.minors,
      adult: journey.keeper.group.adults,
    },
  }));
};

export default journeyMapper;
