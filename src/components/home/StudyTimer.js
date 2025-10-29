// components/home/StudyTimer.js
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Book } from 'lucide-react';
import { useStudy } from '../../contexts/StudyContext';

const StudyTimer = () => {
  const { 
    state, 
    isTimerRunning, 
    currentSession,
    startTimer, 
    stopTimer 
  } = useStudy();
  
  const [time, setTime] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [studyType, setStudyType] = useState('teoria');

  useEffect(() => {
    let interval = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (!isTimerRunning) {
      setTime(0);
    }
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (selectedDiscipline) {
      startTimer(selectedDiscipline);
    } else {
      alert('Selecione uma disciplina para começar!');
    }
  };

  const handleStop = () => {
    stopTimer();
    setSelectedDiscipline('');
    setStudyType('teoria');
  };

  return (
    <div className="study-timer">
      <div className="timer-display">
        {formatTime(time)}
      </div>
      
      <div className="timer-config">
        <select 
          value={selectedDiscipline}
          onChange={(e) => setSelectedDiscipline(e.target.value)}
          disabled={isTimerRunning}
          className="timer-select"
        >
          <option value="">Selecione a disciplina</option>
          {state.disciplines.map((discipline, index) => (
            <option key={index} value={discipline.name}>
              {discipline.name}
            </option>
          ))}
        </select>
        
        <select 
          value={studyType}
          onChange={(e) => setStudyType(e.target.value)}
          disabled={isTimerRunning}
          className="timer-select"
        >
          <option value="teoria">Teoria</option>
          <option value="questões">Questões</option>
          <option value="revisão">Revisão</option>
          <option value="simulado">Simulado</option>
        </select>
      </div>
      
      <div className="timer-controls">
        {!isTimerRunning ? (
          <button 
            onClick={handleStart} 
            className="timer-btn start"
            disabled={!selectedDiscipline}
          >
            <Play size={20} />
            Iniciar
          </button>
        ) : (
          <button onClick={stopTimer} className="timer-btn pause">
            <Pause size={20} />
            Pausar
          </button>
        )}
        <button onClick={handleStop} className="timer-btn stop">
          <Square size={20} />
          Parar
        </button>
      </div>
      
      {currentSession && (
        <div className="current-session">
          <Book size={16} />
          <span>{currentSession.discipline} - {currentSession.type}</span>
        </div>
      )}
    </div>
  );
};

export default StudyTimer;