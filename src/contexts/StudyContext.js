// contexts/StudyContext.js
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

const StudyContext = createContext();

// Funções para localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('studyPlatformState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Erro ao carregar estado:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('studyPlatformState', serializedState);
  } catch (err) {
    console.error('Erro ao salvar estado:', err);
  }
};

// Dados iniciais mockados
const initialStudyState = loadState() || {
  disciplines: [
    { name: 'Matemática', totalTime: 25, correct: 45, incorrect: 5, totalQuestions: 50, performance: 90 },
    { name: 'Português', totalTime: 18, correct: 35, incorrect: 15, totalQuestions: 50, performance: 70 },
    { name: 'Direito Constitucional', totalTime: 32, correct: 40, incorrect: 10, totalQuestions: 50, performance: 80 },
    { name: 'Informática', totalTime: 15, correct: 30, incorrect: 20, totalQuestions: 50, performance: 60 },
    { name: 'Raciocínio Lógico', totalTime: 20, correct: 42, incorrect: 8, totalQuestions: 50, performance: 84 }
  ],
  studySessions: [
    { id: 1, discipline: 'Matemática', duration: 7200, date: '2024-01-15', type: 'questões' },
    { id: 2, discipline: 'Português', duration: 5400, date: '2024-01-15', type: 'teoria' },
    { id: 3, discipline: 'Direito Constitucional', duration: 3600, date: '2024-01-14', type: 'revisão' }
  ],
  weeklyGoals: {
    studyHours: 20,
    questions: 100
  },
  performance: {
    correct: 192,
    incorrect: 58,
    totalQuestions: 250
  },
  totalStudyTime: 110,
  editalProgress: 45,
  studyConsistency: 85
};

function studyReducer(state, action) {
  let newState;
  
  switch (action.type) {
    case 'ADD_STUDY_SESSION':
      newState = {
        ...state,
        studySessions: [action.payload, ...state.studySessions],
        totalStudyTime: state.totalStudyTime + Math.floor(action.payload.duration / 3600)
      };
      break;
    
    case 'UPDATE_PERFORMANCE':
      newState = {
        ...state,
        performance: action.payload
      };
      break;
    
    case 'UPDATE_DISCIPLINE':
      newState = {
        ...state,
        disciplines: state.disciplines.map(discipline =>
          discipline.name === action.payload.name ? action.payload : discipline
        )
      };
      break;
    
    case 'UPDATE_GOALS':
      newState = {
        ...state,
        weeklyGoals: action.payload
      };
      break;
    
    case 'START_TIMER':
      newState = {
        ...state,
        isTimerRunning: true,
        currentSession: action.payload
      };
      break;
    
    case 'STOP_TIMER':
      newState = {
        ...state,
        isTimerRunning: false,
        currentSession: null
      };
      break;
    
    default:
      return state;
  }
  
  // Salva no localStorage após cada alteração
  saveState(newState);
  return newState;
}

export function StudyProvider({ children }) {
  const [state, dispatch] = useReducer(studyReducer, initialStudyState);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const startTimer = (discipline) => {
    setIsTimerRunning(true);
    const newSession = {
      startTime: new Date(),
      discipline: discipline || 'Estudo Geral',
      type: 'teoria'
    };
    setCurrentSession(newSession);
    dispatch({ type: 'START_TIMER', payload: newSession });
  };

  const stopTimer = () => {
    if (currentSession) {
      const endTime = new Date();
      const duration = Math.floor((endTime - currentSession.startTime) / 1000);
      
      const sessionData = {
        ...currentSession,
        endTime,
        duration,
        date: new Date().toISOString().split('T')[0],
        id: Date.now()
      };

      dispatch({ type: 'ADD_STUDY_SESSION', payload: sessionData });
      
      // Atualiza a disciplina correspondente
      const disciplineIndex = state.disciplines.findIndex(
        d => d.name === currentSession.discipline
      );
      
      if (disciplineIndex !== -1) {
        const updatedDiscipline = {
          ...state.disciplines[disciplineIndex],
          totalTime: state.disciplines[disciplineIndex].totalTime + Math.floor(duration / 3600)
        };
        dispatch({ type: 'UPDATE_DISCIPLINE', payload: updatedDiscipline });
      }
    }
    
    setIsTimerRunning(false);
    setCurrentSession(null);
  };

  return (
    <StudyContext.Provider value={{
      state,
      dispatch,
      isTimerRunning,
      setIsTimerRunning,
      currentSession,
      setCurrentSession,
      startTimer,
      stopTimer
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);