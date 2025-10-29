// components/home/Reminders.js
import React, { useState } from 'react';
import { CheckSquare, Square, Bell, FileText, Download, CreditCard } from 'lucide-react';

const Reminders = () => {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Pagar boleto do curso', type: 'financeiro', completed: false },
    { id: 2, text: 'Fazer inscrição no concurso', type: 'concurso', completed: false },
    { id: 3, text: 'Baixar aulas novas', type: 'estudo', completed: true },
    { id: 4, text: 'Enviar documentação', type: 'concurso', completed: false }
  ]);

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'financeiro':
        return <CreditCard size={16} />;
      case 'concurso':
        return <FileText size={16} />;
      case 'estudo':
        return <Download size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  return (
    <div className="reminders-section">
      <div className="section-header">
        <h2>Lembretes</h2>
        <p>Chega de se esquecer de pagar os boletos, fazer inscrições, baixar aulas... Organize seus lembretes em um só lugar!</p>
      </div>
      
      <div className="reminders-list">
        {reminders.map(reminder => (
          <div 
            key={reminder.id} 
            className={`reminder-item ${reminder.completed ? 'completed' : ''}`}
            onClick={() => toggleReminder(reminder.id)}
          >
            <div className="reminder-icon">
              {getIconByType(reminder.type)}
            </div>
            <div className="reminder-content">
              <span className="reminder-text">{reminder.text}</span>
              <span className="reminder-type">{reminder.type}</span>
            </div>
            <div className="reminder-checkbox">
              {reminder.completed ? <CheckSquare size={18} /> : <Square size={18} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;