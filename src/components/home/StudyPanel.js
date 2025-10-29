// components/home/StudyPanel.js
import React from 'react';

const StudyPanel = ({ disciplines }) => {
  return (
    <div className="study-panel">
      <h2>Disciplinas</h2>
      <table className="disciplines-table">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Tempo Total</th>
            <th>Acertos</th>
            <th>Erros</th>
            <th>Questões</th>
            <th>Desempenho</th>
          </tr>
        </thead>
        <tbody>
          {disciplines.map((discipline, index) => (
            <tr key={index}>
              <td>{discipline.name}</td>
              <td>{discipline.totalTime}h</td>
              <td className="correct">{discipline.correct}</td>
              <td className="incorrect">{discipline.incorrect}</td>
              <td>{discipline.totalQuestions}</td>
              <td>
                <div className="performance-bar">
                  <div 
                    className="performance-fill"
                    style={{ 
                      width: `${discipline.performance}%`,
                      backgroundColor: discipline.performance >= 70 ? '#4CAF50' : 
                                     discipline.performance >= 50 ? '#FFC107' : '#F44336'
                    }}
                  ></div>
                  <span>{discipline.performance}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudyPanel;