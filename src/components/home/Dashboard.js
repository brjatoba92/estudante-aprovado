// components/home/Dashboard.js
import React from 'react';

const Dashboard = ({ totalStudyTime, performance, progress, consistency }) => {
  const calculatePerformance = () => {
    if (performance.totalQuestions === 0) return 0;
    return ((performance.correct / performance.totalQuestions) * 100).toFixed(1);
  };

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Tempo Total de Estudo</h3>
          <div className="metric-value">
            {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Desempenho em Questões</h3>
          <div className="metric-value">
            {calculatePerformance()}%
          </div>
          <div className="metric-subtitle">
            {performance.correct}/{performance.totalQuestions} acertos
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Progresso do Edital</h3>
          <div className="metric-value">
            {progress}%
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Constância</h3>
          <div className="metric-value">
            {consistency}%
          </div>
          <div className="metric-subtitle">
            Dias estudados / Dias totais
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;