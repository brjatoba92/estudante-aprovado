// components/home/AddStudyModal.js
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useStudy } from '../../contexts/StudyContext';

const AddStudyModal = ({ isOpen, onClose }) => {
  const { state, dispatch } = useStudy();
  
  const [formData, setFormData] = useState({
    discipline: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    type: 'teoria',
    correct: 0,
    incorrect: 0,
    topic: '',
    material: 'pdf',
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const durationInSeconds = parseInt(formData.duration) * 3600; // Converter horas para segundos
    
    const newSession = {
      id: Date.now(),
      discipline: formData.discipline,
      date: formData.date,
      duration: durationInSeconds,
      type: formData.type,
      correct: parseInt(formData.correct),
      incorrect: parseInt(formData.incorrect),
      topic: formData.topic,
      material: formData.material,
      comment: formData.comment
    };

    // Adicionar sessão de estudo
    dispatch({ type: 'ADD_STUDY_SESSION', payload: newSession });

    // Atualizar disciplina se houver questões
    if (formData.correct > 0 || formData.incorrect > 0) {
      const disciplineIndex = state.disciplines.findIndex(
        d => d.name === formData.discipline
      );
      
      if (disciplineIndex !== -1) {
        const currentDiscipline = state.disciplines[disciplineIndex];
        const updatedDiscipline = {
          ...currentDiscipline,
          totalTime: currentDiscipline.totalTime + parseInt(formData.duration),
          correct: currentDiscipline.correct + parseInt(formData.correct),
          incorrect: currentDiscipline.incorrect + parseInt(formData.incorrect),
          totalQuestions: currentDiscipline.totalQuestions + parseInt(formData.correct) + parseInt(formData.incorrect),
          performance: Math.round(
            ((currentDiscipline.correct + parseInt(formData.correct)) / 
            (currentDiscipline.totalQuestions + parseInt(formData.correct) + parseInt(formData.incorrect))) * 100
          )
        };
        dispatch({ type: 'UPDATE_DISCIPLINE', payload: updatedDiscipline });
      }
    }

    // Limpar formulário e fechar modal
    setFormData({
      discipline: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      type: 'teoria',
      correct: 0,
      incorrect: 0,
      topic: '',
      material: 'pdf',
      comment: ''
    });
    
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Adicionar Registro de Estudo</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="study-form">
          <div className="form-row">
            <div className="form-group">
              <label>Disciplina *</label>
              <select 
                name="discipline" 
                value={formData.discipline} 
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                {state.disciplines.map((discipline, index) => (
                  <option key={index} value={discipline.name}>
                    {discipline.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Data</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Duração (horas) *</label>
              <input 
                type="number" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange}
                step="0.5"
                min="0.5"
                max="12"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Tipo de Estudo</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="teoria">Teoria</option>
                <option value="questões">Questões</option>
                <option value="revisão">Revisão</option>
                <option value="simulado">Simulado</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Acertos</label>
              <input 
                type="number" 
                name="correct" 
                value={formData.correct} 
                onChange={handleChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Erros</label>
              <input 
                type="number" 
                name="incorrect" 
                value={formData.incorrect} 
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Tópico Estudado</label>
            <input 
              type="text" 
              name="topic" 
              value={formData.topic} 
              onChange={handleChange}
              placeholder="Ex: Funções de 1º grau, Direitos Fundamentais..."
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Material</label>
              <select name="material" value={formData.material} onChange={handleChange}>
                <option value="pdf">PDF/Livro</option>
                <option value="video">Videoaula</option>
                <option value="aula_presencial">Aula Presencial</option>
                <option value="questoes">Banco de Questões</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Comentários</label>
            <textarea 
              name="comment" 
              value={formData.comment} 
              onChange={handleChange}
              placeholder="Anotações, dificuldades, insights..."
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              <Plus size={18} />
              Adicionar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudyModal;