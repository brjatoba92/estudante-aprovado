// components/planning/WeeklySchedule.js
import React from 'react';
import { usePlanning } from '../../contexts/PlanningContext';
import { HiPlus, HiClock } from 'react-icons/hi';

const WeeklySchedule = () => {
  const { weeklySchedule, currentPlan } = usePlanning();

  const daysOfWeek = [
    { id: 0, name: 'Domingo', short: 'DOM' },
    { id: 1, name: 'Segunda', short: 'SEG' },
    { id: 2, name: 'Terça', short: 'TER' },
    { id: 3, name: 'Quarta', short: 'QUA' },
    { id: 4, name: 'Quinta', short: 'QUI' },
    { id: 5, name: 'Sexta', short: 'SEX' },
    { id: 6, name: 'Sábado', short: 'SÁB' }
  ];

  return (
    <div className="weekly-schedule">
      <div className="schedule-header">
        <h3>Agenda Semanal</h3>
        <p>Distribuição das sessões de estudo ao longo da semana</p>
      </div>

      <div className="schedule-grid">
        {daysOfWeek.map(day => {
          const daySessions = weeklySchedule[day.id] || [];
          
          return (
            <div key={day.id} className="schedule-day">
              <div className="day-header">
                <strong>{day.short}</strong>
                <span className="session-count">
                  {daySessions.length} sessões
                </span>
              </div>
              
              <div className="sessions-list">
                {daySessions.length > 0 ? (
                  daySessions.map((session, index) => (
                    <div key={index} className="session-card">
                      <div className="session-time">
                        <HiClock size={12} />
                        {session.duration}h
                      </div>
                      <div className="session-discipline">
                        {session.discipline}
                      </div>
                      <div className="session-order">
                        #{session.order}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-sessions">
                    <HiPlus size={20} />
                    <span>Dia livre</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="schedule-stats">
        <div className="stat-card">
          <strong>{Object.values(weeklySchedule).flat().length}</strong>
          <span>Sessões na semana</span>
        </div>
        <div className="stat-card">
          <strong>
            {Object.values(weeklySchedule).flat().reduce((total, session) => total + session.duration, 0)}h
          </strong>
          <span>Total de horas</span>
        </div>
        <div className="stat-card">
          <strong>{currentPlan?.disciplinas.length}</strong>
          <span>Disciplinas no ciclo</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;