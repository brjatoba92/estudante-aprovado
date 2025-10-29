// components/home/WeeklyGoals.js
import React from 'react';

const WeeklyGoals = ({ goals }) => {
  return (
    <div className="metric-card">
      <h3>Metas Semanais</h3>
      <div className="goals-list">
        <div className="goal-item">
          <span>Horas de estudo:</span>
          <strong>{goals.studyHours}h</strong>
        </div>
        <div className="goal-item">
          <span>Questões:</span>
          <strong>{goals.questions}</strong>
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoals;