export interface ValidationModel {
  keeper: {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    cf?: boolean;
    phone?: boolean;
  };
  group: {
    minors?: boolean;
    adults?: boolean;
  };
  organization: {
    name?: boolean;
    type?: boolean;
    address?: boolean;
    phone?: boolean;
    email?: boolean;
  };
  journey: {
    startDate?: boolean;
    endDate?: boolean;
    title?: boolean;
    annotations?: boolean;
    duration?: boolean;
  };
}
