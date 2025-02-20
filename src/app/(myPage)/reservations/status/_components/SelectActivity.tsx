interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

interface SelectActivityProps {
  activities: Activity[];
  selectedActivityId: number | null;
  onSelectActivity: (activityId: number) => void;
}

export default function SelectActivity({
  activities,
  selectedActivityId,
  onSelectActivity,
}: SelectActivityProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="activity-select"
        className="block text-lg font-medium text-gray-900 mb-2"
      >
        체험 선택
      </label>
      <select
        id="activity-select"
        value={selectedActivityId ?? ''}
        onChange={(e) => onSelectActivity(Number(e.target.value))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-3"
      >
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.title}
          </option>
        ))}
      </select>
    </div>
  );
}
