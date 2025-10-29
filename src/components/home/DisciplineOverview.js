// components/home/DisciplineOverview.js
import React from 'react';
import { Clock, Target, BarChart3 } from 'lucide-react';

const DisciplineOverview = ({ disciplines }) => {
  return (
    <div className="discipline-overview">
      <h2>Visão Geral das Matérias</h2>
      <div className="disciplines-grid">
        {disciplines.map((discipline, index) => (
          <div key={index} className="discipline-card">
            <div className="discipline-header">
              <h3>{discipline.name}</h3>
              <div className="performance-badge" style={{
                backgroundColor: discipline.performance >= 70 ? '#27ae60' : 
                               discipline.performance >= 50 ? '#f39c12' : '#e74c3c'
              }}>
                {discipline.performance}%
              </div>
            </div>
            
            <div className="discipline-stats">
              <div className="stat">
                <Clock size={16} />
                <span>{discipline.totalTime}h</span>
              </div>
              <div className="stat">
                <Target size={16} />
                <span>{discipline.correct}/{discipline.totalQuestions}</span>
              </div>
              <div className="stat">
                <BarChart3 size={16} />
                <span>{((discipline.correct / discipline.totalQuestions) * 100).toFixed(1)}% acerto</span>
              </div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${discipline.performance}%`,
                  backgroundColor: discipline.performance >= 70 ? '#27ae60' : 
                                 discipline.performance >= 50 ? '#f39c12' : '#e74c3c'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisciplineOverview;