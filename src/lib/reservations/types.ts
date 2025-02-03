export interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: 'completed' | 'canceled' | 'declined' | 'confirmed' | 'pending';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}
