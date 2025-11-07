// components/planning/wizard/SettingsStep.js
import React from 'react';
import { HiClock, HiCalendar } from 'react-icons/hi';

const SettingsStep = ({ settings, onSettingsUpdate }) => {
  const daysOfWeek = [
    { id: 1, name: 'Segunda', short: 'Seg' },
    { id: 2, name: 'Terça', short: 'Ter' },
    { id: 3, name: 'Quarta', short: 'Qua' },
    { id: 4, name: 'Quinta', short: 'Qui' },
    { id: 5, name: 'Sexta', short: 'Sex' },
    { id: 6, name: 'Sábado', short: 'Sáb' },
    { id: 0, name: 'Domingo', short: 'Dom' }
  ];

  const handleDayToggle = (dayId) => {
    const newStudyDays = settings.studyDays.includes(dayId)
      ? settings.studyDays.filter(d => d !== dayId)
      : [...settings.studyDays, dayId];
    
    onSettingsUpdate({ ...settings, studyDays: newStudyDays });
  };

  const handleHoursChange = (hours) => {
    onSettingsUpdate({ ...settings, weeklyHours: parseInt(hours) });
  };

  const handlePriorityChange = (method) => {
    onSettingsUpdate({ ...settings, priorityMethod: method });
  };

  return (
    <div className="wizard-step">
      <div className="step-header">
        <h3>Configurações do Planejamento</h3>
        <p>Personalize como seu ciclo de estudos será gerado</p>
      </div>

      <div className="settings-grid">
        {/* Horas Semanais */}
        <div className="setting-group">
          <label className="setting-label">
            <HiClock size={20} />
            <span>Horas de Estudo por Semana</span>
          </label>
          <div className="hours-selector">
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={settings.weeklyHours}
              onChange={(e) => handleHoursChange(e.target.value)}
              className="hours-slider"
            />
            <div className="hours-value">{settings.weeklyHours} horas</div>
          </div>
          <div className="setting-description">
            Total de horas que você pretende estudar por semana
          </div>
        </div>

        {/* Dias de Estudo */}
        <div className="setting-group">
          <label className="setting-label">
            <HiCalendar size={20} />
            <span>Dias de Estudo</span>
          </label>
          <div className="days-selector">
            {daysOfWeek.map(day => (
              <button
                key={day.id}
                className={`day-button ${settings.studyDays.includes(day.id) ? 'selected' : ''}`}
                onClick={() => handleDayToggle(day.id)}
              >
                {day.short}
              </button>
            ))}
          </div>
          <div className="setting-description">
            Selecione os dias da semana que você vai estudar
          </div>
        </div>

        {/* Método de Prioridade */}
        <div className="setting-group">
          <label className="setting-label">
            <span>Método de Priorização</span>
          </label>
          <div className="priority-selector">
            <label className="priority-option">
              <input
                type="radio"
                name="priorityMethod"
                value="importance"
                checked={settings.priorityMethod === 'importance'}
                onChange={() => handlePriorityChange('importance')}
              />
              <span>Por Importância</span>
              <small>Prioriza matérias mais importantes para o concurso</small>
            </label>
            
            <label className="priority-option">
              <input
                type="radio"
                name="priorityMethod"
                value="knowledge"
                checked={settings.priorityMethod === 'knowledge'}
                onChange={() => handlePriorityChange('knowledge')}
              />
              <span>Por Conhecimento</span>
              <small>Prioriza matérias com menor desempenho</small>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsStep;