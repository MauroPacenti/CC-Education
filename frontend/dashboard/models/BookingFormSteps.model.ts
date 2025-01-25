export default interface BookingFormSteps {
  keeper: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    cf: string;
    phone: string;
  };
  group: {
    id?: number;
    minors: number;
    adults: number;
  };
  organization: {
    id?: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    email: string;
  };
  journey: {
    id?: number;
    title: string;
    annotations: string;
    startDate: string;
    endDate: string;
  };
}
