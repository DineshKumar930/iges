import React from 'react';
import './AthleteCard.css';

export default function AthleteCard({ athlete }) {
  return (
    <article className="athlete-card">
      <div className="athlete-card__image-wrap">
        <img src={athlete.image} alt={athlete.name} className="athlete-card__image" loading="lazy" />
        <div className="athlete-card__overlay">
          <button className="athlete-card__profile-btn">View Profile</button>
        </div>
        <span className="athlete-card__game-badge">{athlete.game}</span>
      </div>
      <div className="athlete-card__body">
        <h3 className="athlete-card__name">{athlete.name}</h3>
        <p className="athlete-card__position">{athlete.position}</p>
        <div className="athlete-card__achievement">
          <span className="athlete-card__trophy" aria-hidden="true">🏆</span>
          <span>{athlete.achievement}</span>
        </div>
      </div>
    </article>
  );
}