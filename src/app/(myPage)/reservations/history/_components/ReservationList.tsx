interface Reservation {
  id: string;
  date: string;
  status: 'completed' | 'cancelled' | 'pending';
  serviceName: string;
}

interface ReservationListProps {
  reservations: Reservation[];
  onSomeAction: (id: string) => void;
}

export const ReservationList = ({
  reservations,
  onSomeAction,
}: ReservationListProps) => {
  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div key={reservation.id}>예약 내역 아이템 {reservation.id}</div>
      ))}
    </div>
  );
};
