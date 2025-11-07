// components/planning/ProgressOverview.js
import React from 'react';
import { usePlanning } from '../../contexts/PlanningContext';
import { useStudy } from '../../contexts/StudyContext';
import { HiTrendingUp, HiCheckCircle, HiClock, HiBookOpen } from 'react-icons/hi';
import { Doughnut, Bar } from 'react-chartjs-2';

const ProgressOverview = () => {
  const { studyCycle, currentPlan } = usePlanning();
  const { state } = useStudy();

  // Calcular progresso do ciclo
  const calculateProgress = () => {
    if (!studyCycle.length) return 0;
    
    // Simula progresso baseado nas sessões de estudo registradas
    const completedSessions = Math.min(studyCycle.length, state.studySessions.length);
    return (completedSessions / studyCycle.length * 100).toFixed(1);
  };

  const progress = calculateProgress();

  // Dados para gráfico de distribuição
  const distributionData = {
    labels: studyCycle.map(session => session.discipline),
    datasets: [
      {
        data: studyCycle.reduce((acc, session) => {
          const index = acc.findIndex(item => item.label === session.discipline);
          if (index === -1) {
            acc.push({ label: session.discipline, value: 1 });
          } else {
            acc[index].value++;
          }
          return acc;
        }, []).map(item => item.value),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ],
      },
    ],
  };

  const progressData = {
    labels: ['Concluído', 'Restante'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ['#27ae60', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="progress-overview">
      <div className="progress-header">
        <h3>Progresso do Planejamento</h3>
        <p>Acompanhe seu avanço no ciclo de estudos</p>
      </div>

      {/* Métricas Principais */}
      <div className="progress-metrics">
        <div className="metric-card primary">
          <HiTrendingUp size={24} />
          <div className="metric-content">
            <strong>{progress}%</strong>
            <span>Progresso do Ciclo</span>
          </div>
        </div>
        
        <div className="metric-card">
          <HiCheckCircle size={24} />
          <div className="metric-content">
            <strong>
              {Math.min(studyCycle.length, state.studySessions.length)}/{studyCycle.length}
            </strong>
            <span>Sessões Concluídas</span>
          </div>
        </div>
        
        <div className="metric-card">
          <HiClock size={24} />
          <div className="metric-content">
            <strong>
              {studyCycle.reduce((total, session) => total + session.duration, 0)}h
            </strong>
            <span>Horas Planejadas</span>
          </div>
        </div>
        
        <div className="metric-card">
          <HiBookOpen size={24} />
          <div className="metric-content">
            <strong>
              {[...new Set(studyCycle.map(session => session.discipline))].length}
            </strong>
            <span>Disciplinas no Ciclo</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="progress-charts">
        <div className="chart-container">
          <h4>Progresso do Ciclo</h4>
          <div className="chart-wrapper">
            <Doughnut data={progressData} options={chartOptions} />
          </div>
        </div>
        
        <div className="chart-container">
          <h4>Distribuição por Disciplina</h4>
          <div className="chart-wrapper">
            <Doughnut data={distributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Próximas Sessões */}
      <div className="upcoming-sessions">
        <h4>Próximas Sessões</h4>
        <div className="sessions-list">
          {studyCycle.slice(0, 5).map((session, index) => (
            <div key={index} className="upcoming-session">
              <div className="session-info">
                <div className="session-discipline">
                  {session.discipline}
                </div>
                <div className="session-details">
                  <span>Sessão #{session.order}</span>
                  <span>{session.duration}h</span>
                </div>
              </div>
              <div className="session-status">
                <div className={`status-dot ${index < state.studySessions.length ? 'completed' : 'pending'}`} />
                <span>
                  {index < state.studySessions.length ? 'Concluída' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estatísticas de Performance */}
      <div className="performance-stats">
        <h4>Performance por Disciplina</h4>
        <div className="performance-grid">
          {currentPlan?.disciplinas.map(disciplina => {
            const studyData = state.disciplines.find(d => d.name === disciplina.nome) || {};
            const performance = studyData.performance || 0;
            
            return (
              <div key={disciplina.id} className="performance-item">
                <div className="discipline-name">
                  {disciplina.nome}
                </div>
                <div className="performance-bar">
                  <div 
                    className="performance-fill"
                    style={{ 
                      width: `${performance}%`,
                      backgroundColor: performance >= 70 ? '#27ae60' : 
                                     performance >= 50 ? '#f39c12' : '#e74c3c'
                    }}
                  />
                </div>
                <div className="performance-value">
                  {performance}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;