import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

export default function GameCard({ game }) {
  return (
    <article className="game-card">
      <div className="game-card__image-wrap">
        <img src={game.image} alt={game.name} className="game-card__image" loading="lazy" />
        <div className="game-card__image-overlay" />
        <span className="game-card__icon" aria-hidden="true">{game.icon}</span>
        <span className="game-card__category">{game.category}</span>
      </div>
      <div className="game-card__body">
        <h3 className="game-card__title">{game.name}</h3>
        <p className="game-card__description">{game.description}</p>
        <div className="game-card__meta">
          <span className="game-card__players">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {game.players}
          </span>
        </div>
        <Link to="/games" className="game-card__btn">
          Learn More
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}