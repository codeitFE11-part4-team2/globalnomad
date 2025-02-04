export default function Loading() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 예약 아이템들의 로딩 스켈레톤 */}
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="w-full h-24 bg-gray-200 rounded-md animate-pulse"
        />
      ))}
    </div>
  );
}
