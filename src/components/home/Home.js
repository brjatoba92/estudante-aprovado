// components/home/Home.js
import React, { useState } from 'react';
import { useStudy } from '../../contexts/StudyContext';
import StudyTimer from './StudyTimer';
import DisciplineOverview from './DisciplineOverview';
import TodayTasks from './TodayTasks';
import WeeklyGoals from './WeeklyGoals';
import Reminders from './Reminders';
import TodayProgress from './TodayProgress';
import StudyDistribution from './StudyDistribution';
import RecentActivities from './RecentActivities';
import AddStudyModal from './AddStudyModal';
import { Plus } from 'lucide-react';

import '../../styles/home.css';

const Home = () => {
  const { state } = useStudy();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Header com título e ações */}
      <div className="home-header">
        <div className="header-content">
          <h1>Home</h1>
          <p>Visão geral do seu avanço por matéria: tempo e desempenho nas questões</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-add-record"
          >
            <Plus size={20} />
            Novo Registro
          </button>
          <StudyTimer />
        </div>
      </div>

      <div className="home-grid">
        {/* Coluna Principal - Esquerda */}
        <div className="main-column">
          {/* Visão Geral das Matérias */}
          <section className="section-card">
            <DisciplineOverview disciplines={state.disciplines} />
          </section>

          {/* Tarefas do Dia e Revisões */}
          <section className="section-card">
            <TodayTasks />
          </section>

          {/* Lembretes */}
          <section className="section-card reminders-section">
            <Reminders />
          </section>
        </div>

        {/* Sidebar - Direita */}
        <div className="sidebar-column">
          {/* Metas Semanais */}
          <section className="section-card">
            <WeeklyGoals goals={state.weeklyGoals} />
          </section>

          {/* Progresso do Dia */}
          <section className="section-card">
            <TodayProgress />
          </section>

          {/* Distribuição de Estudos */}
          <section className="section-card">
            <StudyDistribution />
          </section>

          {/* Atividades Recentes */}
          <section className="section-card">
            <RecentActivities activities={state.studySessions} />
          </section>
        </div>
      </div>

      <AddStudyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Home;