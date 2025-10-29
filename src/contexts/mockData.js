// contexts/mockData.js
export const mockData = {
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
  totalStudyTime: 110, // em horas
  editalProgress: 45,
  studyConsistency: 85
};