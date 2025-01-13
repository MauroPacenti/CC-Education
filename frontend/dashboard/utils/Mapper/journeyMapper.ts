interface JourneyRequestData {
  id: number;
  keeper: {
    organization: {
      type: string;
      name: string;
    };
    group: {
      minors: number;
      adults: number;
    };
  };
  annotations: string;
  startDate: string;
  endDate: string;
}

const journeyMapper = (data: JourneyRequestData[]) => {
  return data.map((journey: JourneyRequestData) => ({
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
