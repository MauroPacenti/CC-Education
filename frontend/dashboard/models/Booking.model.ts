export interface Booking {
  id: number;
  keeper: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cf: string;
    phone: string;
    group: {
      id: number;
      minors: number;
      adults: number;
      keeper: string;
    };
    organization: {
      id: number;
      name: string;
      type: string;
      address: string;
      phone: string;
      email: string;
      keeper: string;
    };
  };
  startDate: string;
  endDate: string;
  duration: number;
  status: {
    id: number;
    name: string;
    journeyRequests: string[];
    infoRequests: {
      id: number;
      email: string;
      title: string;
      content: string;
      status: string;
    }[];
  };
}
