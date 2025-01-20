export interface BookingHome {
  id: number;
  title: string;
  endDate: string;
  organizationType: string;
  participants: {
    minor: number;
    adult: number;
  };
  startDate: string;
}
