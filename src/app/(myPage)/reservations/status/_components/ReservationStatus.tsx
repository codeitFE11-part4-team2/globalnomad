interface ReservationStatusProps {
  completed: number;
  confirmed: number;
  pending: number;
}

const ReservationStatus = ({
  completed,
  confirmed,
  pending,
}: ReservationStatusProps) => {
  if (completed + confirmed + pending === 0) return null;

  return (
    <div className="flex flex-col gap-0.5 h-6">
      {completed > 0 && (
        <div className="text-xs px-1 py-0.5 bg-gray-700 text-gray-100 rounded whitespace-nowrap">
          완료 {completed}
        </div>
      )}
      {confirmed > 0 && (
        <div className="text-xs px-1 py-0.5 bg-red-1 text-red-3 rounded whitespace-nowrap">
          승인 {confirmed}
        </div>
      )}
      {pending > 0 && (
        <div className="text-xs px-1 py-0.5 bg-blue-3 text-blue-1 rounded whitespace-nowrap">
          신청 {pending}
        </div>
      )}
    </div>
  );
};

export default ReservationStatus;
