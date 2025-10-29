// components/home/HomeSimple.js - Versão simplificada para teste
import React from 'react';
import { useStudy } from '../../contexts/StudyContextSimple';

const HomeSimple = () => {
  const { state } = useStudy();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Home - Plataforma de Estudos</h1>
        <p>Visão geral do seu avanço por matéria: tempo e desempenho nas questões</p>
      </div>

      <div className="home-grid">
        <div className="main-column">
          <section className="section-card">
            <h2>Visão Geral das Matérias</h2>
            <div className="disciplines-grid">
              {state.disciplines.map((discipline, index) => (
                <div key={index} className="discipline-card">
                  <h3>{discipline.name}</h3>
                  <p>Tempo: {discipline.totalTime}h</p>
                  <p>Performance: {discipline.performance}%</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sidebar-column">
          <section className="section-card">
            <h3>Metas Semanais</h3>
            <p>Horas de estudo: {state.weeklyGoals.studyHours}h</p>
            <p>Questões: {state.weeklyGoals.questions}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeSimple;
