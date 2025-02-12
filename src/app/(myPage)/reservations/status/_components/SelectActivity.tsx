import { Activity } from '@/lib/reservations/types';

interface SelectActivityProps {
  activities: Activity[];
  selectedActivity: Activity;
  onSelectActivity: (activity: Activity) => void;
}

export default function SelectActivity({
  activities,
  selectedActivity,
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
        value={selectedActivity.id}
        onChange={(e) => {
          const activity = activities.find(
            (a) => a.id === Number(e.target.value)
          );
          if (activity) onSelectActivity(activity);
        }}
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
