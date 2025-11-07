// contexts/PlanningContext.js
import React, { createContext, useContext, useReducer } from 'react';

const PlanningContext = createContext();

const initialPlanningState = {
  currentPlan: null,
  studyCycle: [],
  weeklySchedule: {},
  settings: {
    weeklyHours: 20,
    studyDays: [1, 2, 3, 4, 5], // Segunda a Sexta
    minSession: 1, // horas
    maxSession: 3, // horas
    priorityMethod: 'importance' // 'importance' ou 'knowledge'
  }
};

function planningReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_PLAN':
      return {
        ...state,
        currentPlan: action.payload
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case 'SET_STUDY_CYCLE':
      return {
        ...state,
        studyCycle: action.payload
      };
    
    case 'SET_WEEKLY_SCHEDULE':
      return {
        ...state,
        weeklySchedule: action.payload
      };
    
    case 'ADD_STUDY_SESSION':
      return {
        ...state,
        weeklySchedule: {
          ...state.weeklySchedule,
          [action.payload.day]: [
            ...(state.weeklySchedule[action.payload.day] || []),
            action.payload.session
          ]
        }
      };
    
    default:
      return state;
  }
}

export const PlanningProvider = ({ children }) => {
  const [state, dispatch] = useReducer(planningReducer, initialPlanningState);

  const setCurrentPlan = (plan) => {
    dispatch({ type: 'SET_CURRENT_PLAN', payload: plan });
  };

  const updateSettings = (settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const setStudyCycle = (cycle) => {
    dispatch({ type: 'SET_STUDY_CYCLE', payload: cycle });
  };

  const setWeeklySchedule = (schedule) => {
    dispatch({ type: 'SET_WEEKLY_SCHEDULE', payload: schedule });
  };

  const addStudySession = (day, session) => {
    dispatch({ type: 'ADD_STUDY_SESSION', payload: { day, session } });
  };

  const generateStudyCycle = (disciplines, settings) => {
    // Algoritmo para gerar ciclo de estudos baseado em prioridade
    // Normalizar disciplinas - pode ter 'name' ou 'nome'
    const normalizedDisciplines = disciplines.map(discipline => {
      const name = discipline.name || discipline.nome || discipline;
      const normalized = typeof discipline === 'string' 
        ? { name, performance: 50 }
        : { ...discipline, name };
      return normalized;
    });
    
    const prioritizedDisciplines = normalizedDisciplines.map(discipline => ({
      ...discipline,
      priority: calculatePriority(discipline, settings.priorityMethod)
    })).sort((a, b) => b.priority - a.priority);

    const cycle = [];
    const days = settings.studyDays;
    const sessionsPerDay = Math.ceil(settings.weeklyHours / days.length / 2); // Assume 2h por sessão
    
    let dayIndex = 0;
    let disciplineIndex = 0;

    while (cycle.length < days.length * sessionsPerDay) {
      const day = days[dayIndex % days.length];
      const discipline = prioritizedDisciplines[disciplineIndex % prioritizedDisciplines.length];
      
      cycle.push({
        day,
        discipline: discipline.name,
        duration: 2, // 2 horas por sessão
        order: cycle.filter(item => item.day === day).length + 1
      });

      dayIndex++;
      disciplineIndex++;
    }

    return cycle;
  };

  const calculatePriority = (discipline, method) => {
    // Simula cálculo de prioridade baseado em importância e conhecimento
    if (method === 'importance') {
      return Math.random() * 10; // Simula importância
    } else {
      const performance = discipline.performance || 50; // Valor padrão se não existir
      return (10 - performance / 10) + Math.random() * 5; // Prioriza matérias com menor desempenho
    }
  };

  return (
    <PlanningContext.Provider value={{
      ...state,
      setCurrentPlan,
      updateSettings,
      setStudyCycle,
      setWeeklySchedule,
      addStudySession,
      generateStudyCycle
    }}>
      {children}
    </PlanningContext.Provider>
  );
};

export const usePlanning = () => useContext(PlanningContext);