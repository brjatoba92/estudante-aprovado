// components/planning/wizard/PlanSelectionStep.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlan } from '../../../contexts/PlanContext';
import { HiCheck, HiBookOpen, HiPlus } from 'react-icons/hi';

const PlanSelectionStep = ({ selectedPlan, onPlanSelect }) => {
  const { userPlans } = usePlan();
  const navigate = useNavigate();

  const handleCreatePlan = () => {
    navigate('/planos');
  };

  return (
    <div className="wizard-step">
      <div className="step-header">
        <h3>Selecionar Plano</h3>
        <p>Escolha o plano que será usado como base para o planejamento</p>
      </div>

      <div className="plans-selection">
        {userPlans.length === 0 ? (
          <div className="empty-plans">
            <HiBookOpen size={48} />
            <h4>Nenhum plano disponível</h4>
            <p>Você precisa criar um plano antes de fazer o planejamento</p>
            <button 
              className="btn-primary"
              onClick={handleCreatePlan}
              style={{ marginTop: '1rem' }}
            >
              <HiPlus size={18} />
              Criar Plano
            </button>
          </div>
        ) : (
          <div className="plans-grid">
            {userPlans.map(plan => (
              <div 
                key={plan.id}
                className={`plan-option ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                onClick={() => onPlanSelect(plan)}
              >
                <div className="plan-info">
                  <h4>{plan.nome}</h4>
                  <span className="plan-concurso">{plan.concurso}</span>
                  <div className="plan-stats">
                    <span>{plan.disciplinas.length} disciplinas</span>
                  </div>
                </div>
                <div className="plan-check">
                  {selectedPlan?.id === plan.id && <HiCheck size={20} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanSelectionStep;