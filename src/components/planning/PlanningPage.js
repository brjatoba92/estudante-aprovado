import React, {useState, useEffect} from "react";
import { usePlanning } from "../../contexts/PlanningContext";
import { usePlan } from "../../contexts/PlanContext";
import PlanningWizard from "./PlanningWizard";
import WeeklySchedule from "./WeeklySchedule";
import StudyCycle from "./StudyCycle";
import ProgressOverview from "./ProgressOverview";
import { HiCalendar, HiCog, HiRefresh, HiChartBar } from "react-icons/hi";

const PlanningPage = () => {
    const { currentPlan, studyCycle, weeklySchedule } = usePlanning();
    const { userPlans, activePlan } = usePlan();
    const [showWizard, setShowWizard] = useState(false);
    const [activeTab, setActiveTab] = useState('schedule');

    useEffect(() => {
        // Se há um plano ativo mas nenhum currentPlan, sugerir criação de planejamento
        if (activePlan && currentPlan) {
            setShowWizard(true);
        }
    }, [activePlan, currentPlan]);
    return (
        <div className="planning-page">
            <div className="page-header">
                <div className="header-content">
                    <HiCalendar size={32} />
                    <div>
                        <h1>Planejamento de Estudos</h1>
                        <p>{ currentPlan ? `Plano Ativo: ${currentPlan.name}` : "Crie seu ciclo de estudos personalizado"}</p>
                    </div>
                </div>
                <div className="header-actions">
                    { currentPlan && (
                        <button className="btn-outline" onClick={() => setShowWizard(true)}>
                            <HiCog size={20} />
                            Reconfigurar
                        </button>
                    )}
                    <button className="btn-primary" onClick={() => setShowWizard(true)}>
                        <HiCalendar size={20} />
                        { currentPlan ? "Novo Planejamento" : "Criar Planejamento"}
                    </button>
                </div>
            </div>
            {!currentPlan ? (
        <div className="empty-planning">
          <HiCalendar size={64} />
          <h2>Nenhum planejamento ativo</h2>
          <p>Comece criando um planejamento personalizado para seus estudos</p>
          <button 
            className="btn-primary large"
            onClick={() => setShowWizard(true)}
          >
            <HiCalendar size={20} />
            Criar Meu Planejamento
          </button>
        </div>
      ) : (
        <div className="planning-content">
          {/* Abas de Navegação */}
          <div className="planning-tabs">
            <button 
              className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <HiCalendar size={18} />
              Agenda Semanal
            </button>
            <button 
              className={`tab-button ${activeTab === 'cycle' ? 'active' : ''}`}
              onClick={() => setActiveTab('cycle')}
            >
              <HiRefresh size={18} />
              Ciclo de Estudos
            </button>
            <button 
              className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <HiChartBar size={18} />
              Progresso
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div className="tab-content">
            {activeTab === 'schedule' && <WeeklySchedule />}
            {activeTab === 'cycle' && <StudyCycle />}
            {activeTab === 'progress' && <ProgressOverview />}
          </div>
        </div>
      )}

      {showWizard && (
        <PlanningWizard onClose={() => setShowWizard(false)} />
      )}
    </div>
  );
};

export default PlanningPage;