// components/home/StudyCharts.js
import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StudyCharts = () => {
  const [chartType, setChartType] = useState('hours');
  const [selectedWeek, setSelectedWeek] = useState(0);

  const weekData = {
    hours: [2, 3, 1, 4, 2, 5, 3],
    questions: [20, 30, 10, 40, 20, 50, 30]
  };

  const todayDistribution = {
    labels: ['Matemática', 'Português', 'Direito', 'Informática'],
    datasets: [
      {
        data: [2, 1.5, 3, 1],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
      },
    ],
  };

  const weekChartData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: chartType === 'hours' ? 'Horas de Estudo' : 'Questões Resolvidas',
        data: weekData[chartType],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="study-charts">
      <div className="chart-section">
        <h3>Distribuição de Estudos Hoje</h3>
        <div className="chart-container">
          <Doughnut 
            data={todayDistribution} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h3>Estudos na Semana</h3>
          <div className="chart-controls">
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="hours">Horas</option>
              <option value="questions">Questões</option>
            </select>
            <select 
              value={selectedWeek} 
              onChange={(e) => setSelectedWeek(e.target.value)}
            >
              <option value={0}>Esta Semana</option>
              <option value={1}>Semana Passada</option>
              <option value={2}>2 Semanas atrás</option>
            </select>
          </div>
        </div>
        <div className="chart-container">
          <Bar 
            data={weekChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyCharts;