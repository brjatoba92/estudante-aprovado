// components/plans/PlanSelection.js
import React, { useState } from 'react';
import { predefinedPlans, objetivos, regioes } from '../../data/predefinedPlans';
import { usePlan } from '../../contexts/PlanContext';
import PlanCustomization from './PlanCustomization';
import { HiX, HiSearch, HiMap } from 'react-icons/hi';

const PlanSelection = ({ onClose }) => {
  const { setSelectedConcurso } = usePlan();
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState({
    objetivo: '',
    area: '',
    regiao: '',
    search: ''
  });

  const filteredConcursos = predefinedPlans.concursos.filter(concurso => {
    return (
      (!filters.area || concurso.area === filters.area) &&
      (!filters.regiao || concurso.região === filters.regiao) &&
      (!filters.search || 
        concurso.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        concurso.cargos.some(cargo => cargo.toLowerCase().includes(filters.search.toLowerCase()))
      )
    );
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleConcursoSelect = (concurso) => {
    setSelectedConcurso(concurso);
    setStep(2);
  };

  if (step === 2) {
    return <PlanCustomization onBack={() => setStep(1)} onClose={onClose} />;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h2>Criar Novo Plano</h2>
          <button onClick={onClose} className="close-btn">
            <HiX size={24} />
          </button>
        </div>

        <div className="plan-selection">
          {/* Filtros */}
          <div className="filters-section">
            <div className="filter-group">
              <label>Objetivo</label>
              <select 
                value={filters.objetivo}
                onChange={(e) => handleFilterChange('objetivo', e.target.value)}
              >
                <option value="">Todos os objetivos</option>
                {objetivos.map(objetivo => (
                  <option key={objetivo} value={objetivo}>{objetivo}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Área de Interesse</label>
              <select 
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
              >
                <option value="">Todas as áreas</option>
                {predefinedPlans.areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Região</label>
              <select 
                value={filters.regiao}
                onChange={(e) => handleFilterChange('regiao', e.target.value)}
              >
                <option value="">Todas as regiões</option>
                {regioes.map(regiao => (
                  <option key={regiao} value={regiao}>{regiao}</option>
                ))}
              </select>
            </div>

            <div className="filter-group search-group">
              <label>Buscar</label>
              <div className="search-input">
                <HiSearch size={18} />
                <input 
                  type="text"
                  placeholder="Digite o nome do concurso ou cargo..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Lista de Concursos */}
          <div className="concursos-grid">
            {filteredConcursos.map(concurso => (
              <div 
                key={concurso.id}
                className="concurso-card"
                onClick={() => handleConcursoSelect(concurso)}
              >
                <div className="concurso-header">
                  <h3>{concurso.name}</h3>
                  <span className="concurso-regiao">
                    <HiMap size={14} />
                    {concurso.região}
                  </span>
                </div>
                
                <div className="concurso-details">
                  <span className="concurso-area">{concurso.area}</span>
                  <div className="concurso-cargos">
                    {concurso.cargos && concurso.cargos.slice(0, 2).map((cargo, index) => (
                      <span key={index} className="cargo-tag">{cargo}</span>
                    ))}
                    {concurso.cargos && concurso.cargos.length > 2 && (
                      <span className="cargo-more">+{concurso.cargos.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="concurso-disciplinas">
                  <strong>{concurso.provas ? concurso.provas.length : 0} disciplinas</strong>
                  <div className="disciplinas-list">
                    {concurso.provas && concurso.provas.slice(0, 3).map((disciplina, index) => (
                      <span key={index} className="disciplina-tag">{disciplina}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Opção para criar plano manualmente */}
          <div className="manual-option">
            <button 
              className="btn-outline"
              onClick={() => setStep(2)}
            >
              Criar plano manualmente (do zero)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;