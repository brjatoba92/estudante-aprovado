import React from 'react';
import { usePlanning } from '../../../contexts/PlanningContext';
import { HiCalendar, HiClock, HiBookOpen } from 'react-icons/hi';

const ReviewStep = ({ selectedPlan, settings, onGenerate }) => {
    const { generateStudyCycle } = usePlanning();
    const previewCycle = selectedPlan && selectedPlan.disciplinas
        ? generateStudyCycle(selectedPlan.disciplinas, settings)
        : [];
    const daysOfWeek = [
        'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
    ];

    const sessionsByDay = {};
    previewCycle.forEach(session => {
        if (!sessionsByDay[session.day]) {
            sessionsByDay[session.day] = [];
        }
        sessionsByDay[session.day].push(session);
    });

    return (
        <div className="wizard-step">
            <div className="step-header">
                <h3>Revisar Planejamento</h3>
                <p>Confirme as configurações do seu ciclo de estudos</p>
            </div>
            <div className="review-content">
                {/* Resumo do Plano */}
                <div className="review-section">
                    <h4>Plano Selecionado</h4>
                    <div className='plan-summary'>
                        <HiBookOpen size={24} />
                        <div>
                            <strong>{selectedPlan?.nome}</strong>
                            <span>{selectedPlan?.concurso} • {selectedPlan?.disciplinas.length} disciplinas </span>
                        </div>
                    </div>
                </div>
                {/* Configurações */}
                <div className="review-section">
                    <h4>Configurações</h4>
                    <div className='settings-summary'>
                        <div className='setting-item'>
                            <HiClock size={18} />
                            <span>{settings.weeklyHours} horas/semana</span>
                        </div>
                        <div className='setting-item'>
                            <HiCalendar size={18} />
                            <span>{settings.studyDays.length} dias de estudo por semana</span>
                        </div>
                        <div className='setting-item'>
                            <span>Priorização: {settings.priorityMethod === "importance" ? "Por importância" : "Por conhecimento"}</span>
                        </div>
                    </div>
                </div>
                {/* Preview do Ciclo de Estudos */}
                <div className="review-section">
                    <h4>Preview do Ciclo de Estudos</h4>
                    <div className='cycle-preview'>
                        {Object.entries(sessionsByDay).slice(0, 3).map(([day, sessions]) => (
                            <div key={day} className='day-preview'>
                                <strong>{daysOfWeek[parseInt(day)]}</strong>
                                <div className='sessions-list'>
                                    {sessions.map((session, index) => (
                                        <div key={index} className='session-preview'>
                                            {session.discipline} ({session.duration} h)
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(sessionsByDay).length > 3 && (
                            <div className='more-days'>
                                + {Object.keys(sessionsByDay).length - 3} dias restantes
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewStep;