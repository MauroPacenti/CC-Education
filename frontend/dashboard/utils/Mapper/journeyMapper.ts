import { Booking } from "../../models/Booking.model";

/**
 * Maps booking data to a simplified journey format
 * @param {Booking[]} data - Array of booking objects to be mapped
 * @returns {Array<{
 *   id: string,
 *   title: string,
 *   startDate: Date,
 *   endDate: Date,
 *   organizationType: string,
 *   participants: {
 *     minor: number,
 *     adult: number
 *   }
 * }>} Array of mapped journey objects
 */
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
