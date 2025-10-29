// components/home/TodayProgress.js
import React from 'react';
import { TrendingUp, Clock, Target } from 'lucide-react';

const TodayProgress = () => {
  const todayStats = {
    studyTime: 3.5,
    questions: 45,
    goalCompletion: 70
  };

  return (
    <div className="today-progress">
      <div className="section-header">
        <h2>Progresso de Hoje</h2>
        <p>Veja aqui como está o seu avanço no dia: tempo total e distribuição entre as matérias</p>
      </div>
      
      <div className="progress-stats">
        <div className="progress-stat">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{todayStats.studyTime}h</div>
            <div className="stat-label">Tempo de estudo</div>
          </div>
        </div>
        
        <div className="progress-stat">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{todayStats.questions}</div>
            <div className="stat-label">Questões</div>
          </div>
        </div>
        
        <div className="progress-stat">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{todayStats.goalCompletion}%</div>
            <div className="stat-label">Meta diária</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayProgress;