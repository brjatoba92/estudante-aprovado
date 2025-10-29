// components/home/ReviewSchedule.js
import React from 'react';

const ReviewSchedule = () => {
  const reviews = [
    { period: '1 dia', subjects: ['Matemática', 'Português'] },
    { period: '7 dias', subjects: ['Direito Constitucional'] },
    { period: '15 dias', subjects: ['Informática'] },
    { period: '30 dias', subjects: ['Raciocínio Lógico'] }
  ];

  return (
    <div className="metric-card">
      <h3>Matérias para Revisão</h3>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-period">{review.period}</div>
            <div className="review-subjects">
              {review.subjects.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSchedule;