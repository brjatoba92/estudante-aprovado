// components/home/RecentActivities.js
import React from 'react';

const RecentActivities = ({ activities }) => {
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="metric-card">
      <h3>Últimas Atividades</h3>
      <div className="activities-list">
        {activities.slice(0, 3).map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-discipline">{activity.discipline}</div>
            <div className="activity-details">
              {formatDuration(activity.duration)} • {activity.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;