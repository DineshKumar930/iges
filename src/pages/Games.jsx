import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import GameCard from '../components/GameCard.jsx';
import { gamesData, gameCategories } from '../data/games.js';
import './Games.css';

export default function Games() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All'
    ? gamesData
    : gamesData.filter((g) => g.category === activeCategory);

  return (
    <div className="games">
      <section className="page-header">
        <h1 className="page-header__title">Our Games</h1>
        <p className="page-header__subtitle">
          Explore the diverse range of sports governed and promoted by the IGS Federation.
        </p>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Sports Directory"
          title="Discover Your"
          highlight="Game"
          subtitle="From team sports to individual disciplines — find the game that ignites your passion."
        />

        <div className="games__filters" role="tablist" aria-label="Filter games">
          {gameCategories.map((cat) => (
            <button
              key={cat}
              className={`games__filter ${activeCategory === cat ? 'games__filter--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="games__grid">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="games__empty">No games found in this category.</p>
        )}
      </section>
    </div>
  );
}