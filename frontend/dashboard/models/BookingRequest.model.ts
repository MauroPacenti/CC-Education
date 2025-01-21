export interface BookingRequest {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  organizationType: string;
  startAvailabilityDate: string;
  endAvailabilityDate: string;
  duration: number;
}
