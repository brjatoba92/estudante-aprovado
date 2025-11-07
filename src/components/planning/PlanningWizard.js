// components/planning/PlanningWizard.js
import React, { useState } from 'react';
import { usePlanning } from '../../contexts/PlanningContext';
import { usePlan } from '../../contexts/PlanContext';
import PlanSelectionStep from './wizard/PlanSelectionStep';
import SettingsStep from './wizard/SettingsStep';
import ReviewStep from './wizard/ReviewStep';
import { HiX, HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi';

const PlanningWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [settings, setSettings] = useState({
    weeklyHours: 20,
    studyDays: [1, 2, 3, 4, 5], // Segunda a Sexta
    minSession: 1,
    maxSession: 3,
    priorityMethod: 'importance'
  });

  const { setCurrentPlan, setStudyCycle, setWeeklySchedule, generateStudyCycle } = usePlanning();
  const { userPlans } = usePlan();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCurrentStep(2);
  };

  const handleSettingsUpdate = (newSettings) => {
    setSettings(newSettings);
  };

  const handleGeneratePlanning = () => {
    if (!selectedPlan) return;

    const cycle = generateStudyCycle(selectedPlan.disciplinas, settings);
    
    setCurrentPlan(selectedPlan);
    setStudyCycle(cycle);
    
    // Gerar agenda semanal baseada no ciclo
    const weeklySchedule = {};
    cycle.forEach(session => {
      if (!weeklySchedule[session.day]) {
        weeklySchedule[session.day] = [];
      }
      weeklySchedule[session.day].push(session);
    });
    
    setWeeklySchedule(weeklySchedule);
    
    onClose();
  };

  const steps = [
    { number: 1, title: 'Selecionar Plano', component: PlanSelectionStep },
    { number: 2, title: 'Configurações', component: SettingsStep },
    { number: 3, title: 'Revisar', component: ReviewStep }
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <div className="wizard-header">
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="back-btn"
              >
                <HiArrowLeft size={20} />
              </button>
            )}
            <div className="wizard-title">
              <h2>Criar Planejamento</h2>
              <div className="step-indicator">
                {steps.map(step => (
                  <div 
                    key={step.number}
                    className={`step-dot ${currentStep >= step.number ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <HiX size={24} />
          </button>
        </div>

        <div className="wizard-content">
          <CurrentStepComponent
            selectedPlan={selectedPlan}
            settings={settings}
            onPlanSelect={handlePlanSelect}
            onSettingsUpdate={handleSettingsUpdate}
            onGenerate={handleGeneratePlanning}
          />
        </div>

        <div className="wizard-actions">
          {currentStep > 1 && (
            <button 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-outline"
            >
              <HiArrowLeft size={18} />
              Voltar
            </button>
          )}
          
          <div className="wizard-progress">
            Passo {currentStep} de {steps.length}
          </div>

          {currentStep < steps.length ? (
            <button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === 1 && !selectedPlan}
              className="btn-primary"
            >
              Continuar
              <HiArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleGeneratePlanning}
              className="btn-primary"
            >
              <HiCheck size={18} />
              Criar Planejamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningWizard;