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

  const existingStatuses = [
    pending > 0 && (
      <div
        key="pending"
        className="flex items-center justify-center text-xs px-1 bg-blue-3 text-blue-1 rounded whitespace-nowrap h-full"
      >
        신청 {pending}
      </div>
    ),
    confirmed > 0 && (
      <div
        key="confirmed"
        className="flex items-center justify-center text-xs px-1 bg-red-1 text-red-3 rounded whitespace-nowrap h-full"
      >
        승인 {confirmed}
      </div>
    ),
    completed > 0 && (
      <div
        key="completed"
        className="flex items-center justify-center text-xs px-1 bg-gray-700 text-gray-100 rounded whitespace-nowrap h-full"
      >
        완료 {completed}
      </div>
    ),
  ].filter(Boolean);

  const statusCount = existingStatuses.length;

  return (
    <div className="flex flex-col gap-0.5 h-10">
      {existingStatuses.map((status, index) => (
        <div key={index} style={{ height: `33%` }}>
          {status}
        </div>
      ))}
    </div>
  );
};

export default ReservationStatus;
