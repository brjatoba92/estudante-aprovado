import React, { useState } from 'react';
import { usePlan } from '../../contexts/PlanContext';
import { useStudy } from '../../contexts/StudyContext';
import { HiArrowLeft, HiCheck, HiPencil, HiTrash, HiX } from 'react-icons/hi';

const PlanCustomization = ({ onBack, onClose }) => {
    const { selectedConcurso, addUserPlan } = usePlan();
    const { dispatch } = useStudy();

    // Converter provas em disciplinas se selectedConcurso tiver provas
    const initialDisciplinas = selectedConcurso 
        ? (selectedConcurso.provas ? [...selectedConcurso.provas] : [])
        : [];

    const [planName, setPlanName] = useState(
        selectedConcurso ? `Plano para ${selectedConcurso.name}` : 'Meu Plano de Estudos'
    );
    const [disciplinas, setDisciplinas] = useState(initialDisciplinas);
    const [editingDisciplina, setEditingDisciplina] = useState(null);
    const [novaDisciplina, setNovaDisciplina] = useState('');

    const handleAddDisciplina = () => {
        if (novaDisciplina.trim()) {
            setDisciplinas(prev => [...prev, novaDisciplina.trim()]);
            setNovaDisciplina('');
        }
    };

    const handleRemoveDisciplina = (index) => {
        setDisciplinas(prev => prev.filter((_, i) => i !== index));
    };

    const handleSavePlan = () => {
        const newPlan = {
            id: Date.now(),
            nome: planName,
            concurso: selectedConcurso ? selectedConcurso.name || 'Personalizado' : 'Personalizado',
            area: selectedConcurso ? selectedConcurso.area || 'Geral' : 'Geral',
            dataCriacao: new Date().toISOString(),
            disciplinas: disciplinas.map((nome, index) => ({
                id: index,
                nome,
                tempoEstudo: 0,
                acertos: 0,
                erros: 0,
                totalQuestoes: 0,
                desempenho: 0
            }))
        };

        addUserPlan(newPlan);

        // Atualizar as disciplinas no contexto de estudo
        disciplinas.forEach((disciplina) => {
            dispatch({
                type: 'UPDATE_DISCIPLINA',
                payload: {
                    name: disciplina,
                    totalTime: 0,
                    correct: 0,
                    incorrect: 0,
                    totalQuestions: 0,
                    performance: 0
                }
            });
        });
        onClose();
    };

    return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <div className="header-with-back">
            <button onClick={onBack} className="back-btn">
              <HiArrowLeft size={20} />
            </button>
            <h2>Personalizar Plano</h2>
          </div>
          <button onClick={onClose} className="close-btn">
            <HiX size={24} />
          </button>
        </div>

        <div className="plan-customization">
          {/* Nome do Plano */}
          <div className="form-group">
            <label>Nome do Plano</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Digite um nome para seu plano..."
            />
          </div>

          {/* Informações do Concurso (se selecionado) */}
          {selectedConcurso && (
            <div className="concurso-info">
              <h3>Concurso Selecionado</h3>
              <div className="info-card">
                <strong>{selectedConcurso.name}</strong>
                <span>{selectedConcurso.area} • {selectedConcurso.região}</span>
                <div className="cargos">
                  {selectedConcurso.cargos && selectedConcurso.cargos.map((cargo, index) => (
                    <span key={index} className="cargo-tag">{cargo}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lista de Disciplinas */}
          <div className="disciplinas-section">
            <div className="section-header">
              <h3>Disciplinas do Plano</h3>
              <p>Gerencie as disciplinas que você vai estudar</p>
            </div>

            {/* Adicionar Nova Disciplina */}
            <div className="add-disciplina">
              <input
                type="text"
                value={novaDisciplina}
                onChange={(e) => setNovaDisciplina(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDisciplina()}
                placeholder="Digite o nome da disciplina..."
              />
              <button 
                onClick={handleAddDisciplina}
                disabled={!novaDisciplina.trim()}
                className="btn-primary"
              >
                Adicionar
              </button>
            </div>

            {/* Lista de Disciplinas */}
            <div className="disciplinas-list">
              {disciplinas.map((disciplina, index) => (
                <div key={index} className="disciplina-item">
                  <span>{disciplina}</span>
                  <div className="disciplina-actions">
                    <button 
                      onClick={() => handleRemoveDisciplina(index)}
                      className="btn-icon danger"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {disciplinas.length === 0 && (
                <div className="empty-disciplinas">
                  Nenhuma disciplina adicionada. Adicione as disciplinas que você precisa estudar.
                </div>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="form-actions">
            <button onClick={onBack} className="btn-outline">
              Voltar
            </button>
            <button 
              onClick={handleSavePlan}
              disabled={!planName.trim() || disciplinas.length === 0}
              className="btn-primary"
            >
              <HiCheck size={18} />
              Salvar Plano
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCustomization;