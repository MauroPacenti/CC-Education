export default interface BookingFormSteps {
  keeper: {
    firstName: string;
    lastName: string;
    email: string;
    cf: string;
    phone: string;
  };
  group: {
    minors: number;
    adults: number;
  };
  organization: {
    name: string;
    type: string;
    address: string;
    phone: string;
    email: string;
  };
  journey: {
    title: string;
    annotations: string;
    startDate: string;
    endDate: string;
  };
}
