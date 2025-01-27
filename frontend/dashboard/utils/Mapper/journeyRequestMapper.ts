interface JourneyRequestData {
  id: number;
  keeper: {
    email: string;
    firstName: string;
    lastName: string;
    organization: {
      type: string;
    };
  };
  startAvailabilityDate: string;
  endAvailabilityDate: string;
  duration: number;
}

/**
 * Maps journey request data to a simplified format
 * @param {JourneyRequestData[]} data - Array of journey request data objects
 * @returns {Array<{
 *   id: number,
 *   email: string,
 *   firstName: string,
 *   lastName: string,
 *   organizationType: string,
 *   startAvailabilityDate: string,
 *   endAvailabilityDate: string,
 *   duration: number
 * }>} Mapped journey request data
 */
const journeyRequestMapper = (data: JourneyRequestData[]) => {
  return data.map((request: JourneyRequestData) => ({
    id: request.id,
    email: request.keeper.email,
    firstName: request.keeper.firstName,
    lastName: request.keeper.lastName,
    organizationType: request.keeper.organization.type,
    startAvailabilityDate: request.startAvailabilityDate,
    endAvailabilityDate: request.endAvailabilityDate,
    duration: request.duration,
  }));
};
export default journeyRequestMapper;
