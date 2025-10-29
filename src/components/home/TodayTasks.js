// components/home/TodayTasks.js
import React from 'react';
import { Calendar, Clock, Book } from 'lucide-react';

const TodayTasks = () => {
  const todayTasks = [
    { 
      id: 1, 
      type: 'revisão', 
      subject: 'Matemática', 
      time: '09:00', 
      description: 'Revisão de 1 dia - Funções' 
    },
    { 
      id: 2, 
      type: 'estudo', 
      subject: 'Português', 
      time: '14:00', 
      description: 'Nova matéria - Sintaxe' 
    },
    { 
      id: 3, 
      type: 'revisão', 
      subject: 'Direito', 
      time: '16:00', 
      description: 'Revisão de 7 dias - CF Art. 1-10' 
    }
  ];

  const getTaskIcon = (type) => {
    switch (type) {
      case 'revisão':
        return <Clock size={16} />;
      case 'estudo':
        return <Book size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  const getTaskColor = (type) => {
    switch (type) {
      case 'revisão':
        return '#e74c3c';
      case 'estudo':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="today-tasks">
      <div className="section-header">
        <h2>Próximas Tarefas do Dia</h2>
        <p>Confira aqui as próximas tarefas do dia e as revisões programadas</p>
      </div>
      
      <div className="tasks-list">
        {todayTasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-time">
              <Clock size={14} />
              {task.time}
            </div>
            <div className="task-content">
              <div className="task-header">
                <div 
                  className="task-type" 
                  style={{ color: getTaskColor(task.type) }}
                >
                  {getTaskIcon(task.type)}
                  {task.type}
                </div>
                <span className="task-subject">{task.subject}</span>
              </div>
              <p className="task-description">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;