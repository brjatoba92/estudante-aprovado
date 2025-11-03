import React from 'react';
import { usePlan } from '../../contexts/PlanContext';
import { HiCalendar, HiBookOpen, HiPencil, HiTrash } from 'react-icons/hi';

const UserPlans = () => {
    const { userPlans, setActivePlan, deletePlan } = usePlan();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleSetActive = (plan) => {
        setActivePlan(plan);
        // Aqui você pode adicionar lógica para atualizar a Home com o plano ativo    
    };

    return (
        <div className='user-plans'>
            <h2>Meus Planos ({userPlans.length})</h2>
            <div className='plans-grid'>
                {userPlans.map((plan) => (
                    <div key={plan.id} className='plan-card'>
                        <div className='plan-header'>
                            <h3>{plan.nome}</h3>
                            <div className='plan-actions'>
                                <button 
                                    className='btn-button' 
                                    onClick={() => handleSetActive(plan)} 
                                    title="Ativar Plano"
                                >
                                  <HiPencil size={16} />  
                                </button>
                                <button 
                                    className='btn-icon-danger'
                                    onClick={() => deletePlan(plan.id)} 
                                    title="Excluir Plano"
                                >
                                  <HiTrash size={16} />  
                                </button>
                            </div>
                        </div>
                        <div className='plan-info'>
                            <div className='info-item'>
                                <HiBookOpen size={16} />
                                <span>{plan.concurso}</span>
                            </div>
                            <div className='info-item'>
                                <HiCalendar size={16} />
                                <span>{formatDate(plan.dataCriacao)}</span>
                            </div>
                            <div className='info-item'>
                                <HiCalendar size={16} />
                                <span>{plan.disciplinas.length} disciplinas</span>
                            </div>
                        </div>
                        <div className='plan-disciplinas'>
                            <strong>Disciplinas:</strong>
                            <div className='disciplinas-tags'>
                                {plan.disciplinas.slice(0, 4).map(disciplina => (
                                    <span key={disciplina.id} className='disciplina-tag'>
                                        {disciplina.nome}
                                    </span>
                                ))}
                                {plan.disciplinas.length > 4 && (
                                    <span className='disciplina-tag'>
                                        +{plan.disciplinas.length - 4} mais
                                    </span>
                                )}
                            </div>
                        </div>
                        <button 
                            className='btn-primary full-width'
                            onClick={() => handleSetActive(plan)}
                        >
                            Ativar Plano
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserPlans;