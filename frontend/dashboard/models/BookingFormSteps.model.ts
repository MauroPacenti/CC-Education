export default interface BookingFormSteps {
  keeper: {
    firstName: string;
    lastName: string;
    email: string;
    codiceFiscale: string;
    phone: string;
  };
  organization: {
    isOrganization: boolean | null;
    name: string;
    type: string;
    address: string;
    email: string;
    phone: string;
  };
  bookingDetails: {
    minors: number;
    adults: number;
    start: string;
    end: string;
    otherInfo: string;
  };
}