// components/home/StudyDistribution.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../../utils/chartConfig';

const StudyDistribution = () => {
  const distributionData = {
    labels: ['Matemática', 'Português', 'Direito', 'Informática', 'Raciocínio'],
    datasets: [
      {
        data: [2, 1.5, 3, 1, 1.5],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}h`;
          }
        }
      }
    },
    cutout: '60%',
  };

  return (
    <div className="study-distribution">
      <h3>Distribuição de Estudos Hoje</h3>
      <div className="distribution-chart">
        <Doughnut data={distributionData} options={options} />
      </div>
    </div>
  );
};

export default StudyDistribution;