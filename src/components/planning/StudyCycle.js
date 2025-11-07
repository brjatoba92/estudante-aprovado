// components/planning/StudyCycle.js
import React, { useState } from 'react';
import { usePlanning } from '../../contexts/PlanningContext';
import { HiRefresh, HiClock, HiBookOpen, HiAdjustments } from 'react-icons/hi';

const StudyCycle = () => {
  const { studyCycle, currentPlan, settings, setStudyCycle, generateStudyCycle } = usePlanning();
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'calendar'

  const daysOfWeek = [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ];

  const cycleByDay = {};
  studyCycle.forEach(session => {
    if (!cycleByDay[session.day]) {
      cycleByDay[session.day] = [];
    }
    cycleByDay[session.day].push(session);
  });

  const handleRegenerateCycle = () => {
    if (currentPlan) {
      const newCycle = generateStudyCycle(currentPlan.disciplinas, settings);
      setStudyCycle(newCycle);
    }
  };

  const calculateCycleStats = () => {
    const totalSessions = studyCycle.length;
    const totalHours = studyCycle.reduce((total, session) => total + session.duration, 0);
    const uniqueDisciplines = [...new Set(studyCycle.map(session => session.discipline))];
    const cyclesPerWeek = Math.ceil(totalSessions / Object.keys(cycleByDay).length);

    return { totalSessions, totalHours, uniqueDisciplines, cyclesPerWeek };
  };

  const stats = calculateCycleStats();

  return (
    <div className="study-cycle">
      <div className="cycle-header">
        <div className="header-content">
          <h3>Ciclo de Estudos</h3>
          <p>Sequência organizada das suas sessões de estudo</p>
        </div>
        
        <div className="cycle-actions">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              Lista
            </button>
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              Calendário
            </button>
          </div>
          
          <button 
            className="btn-outline"
            onClick={handleRegenerateCycle}
          >
            <HiRefresh size={18} />
            Regenerar Ciclo
          </button>
        </div>
      </div>

      {/* Estatísticas do Ciclo */}
      <div className="cycle-stats">
        <div className="stat-item">
          <HiBookOpen size={24} />
          <div>
            <strong>{stats.totalSessions}</strong>
            <span>Sessões totais</span>
          </div>
        </div>
        <div className="stat-item">
          <HiClock size={24} />
          <div>
            <strong>{stats.totalHours}h</strong>
            <span>Horas no ciclo</span>
          </div>
        </div>
        <div className="stat-item">
          <HiAdjustments size={24} />
          <div>
            <strong>{stats.uniqueDisciplines.length}</strong>
            <span>Disciplinas</span>
          </div>
        </div>
        <div className="stat-item">
          <HiRefresh size={24} />
          <div>
            <strong>{stats.cyclesPerWeek}</strong>
            <span>Ciclos/semana</span>
          </div>
        </div>
      </div>

      {/* Conteúdo baseado na visualização */}
      {viewMode === 'list' ? (
        <div className="cycle-list-view">
          <div className="cycle-sequence">
            <h4>Sequência do Ciclo</h4>
            <div className="sequence-list">
              {studyCycle.map((session, index) => (
                <div key={index} className="sequence-item">
                  <div className="session-order">
                    #{index + 1}
                  </div>
                  <div className="session-info">
                    <div className="session-discipline">
                      {session.discipline}
                    </div>
                    <div className="session-details">
                      <span className="session-day">
                        {daysOfWeek[session.day]}
                      </span>
                      <span className="session-duration">
                        <HiClock size={12} />
                        {session.duration}h
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="cycle-calendar-view">
          <div className="calendar-grid">
            {Object.entries(cycleByDay).map(([day, sessions]) => (
              <div key={day} className="calendar-day">
                <div className="day-header">
                  <strong>{daysOfWeek[parseInt(day)]}</strong>
                  <span className="sessions-count">
                    {sessions.length} sessões
                  </span>
                </div>
                
                <div className="day-sessions">
                  {sessions.map((session, index) => (
                    <div key={index} className="calendar-session">
                      <div className="session-time">
                        Sessão #{session.order}
                      </div>
                      <div className="session-discipline">
                        {session.discipline}
                      </div>
                      <div className="session-duration">
                        {session.duration}h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Distribuição por Disciplina */}
      <div className="discipline-distribution">
        <h4>Distribuição por Disciplina</h4>
        <div className="distribution-grid">
          {stats.uniqueDisciplines.map(discipline => {
            const disciplineSessions = studyCycle.filter(s => s.discipline === discipline);
            const totalHours = disciplineSessions.reduce((total, session) => total + session.duration, 0);
            const percentage = (disciplineSessions.length / stats.totalSessions * 100).toFixed(1);
            
            return (
              <div key={discipline} className="discipline-distro-item">
                <div className="discipline-header">
                  <span className="discipline-name">{discipline}</span>
                  <span className="discipline-percentage">{percentage}%</span>
                </div>
                <div className="discipline-stats">
                  <span>{disciplineSessions.length} sessões</span>
                  <span>{totalHours}h totais</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyCycle;