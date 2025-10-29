// contexts/StudyContext.js - Versão simplificada para teste
import React, { createContext, useContext } from 'react';

const StudyContext = createContext();

// Dados iniciais mockados simplificados
const initialStudyState = {
  disciplines: [
    { name: 'Matemática', totalTime: 25, correct: 45, incorrect: 5, totalQuestions: 50, performance: 90 },
    { name: 'Português', totalTime: 18, correct: 35, incorrect: 15, totalQuestions: 50, performance: 70 }
  ],
  studySessions: [],
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

export function StudyProvider({ children }) {
  return (
    <StudyContext.Provider value={{
      state: initialStudyState,
      dispatch: () => {},
      isTimerRunning: false,
      setIsTimerRunning: () => {},
      currentSession: null,
      setCurrentSession: () => {},
      startTimer: () => {},
      stopTimer: () => {}
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);
