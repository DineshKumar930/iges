import React, { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import AthleteCard from '../components/AthleteCard.jsx';
import { athletesData } from '../data/athletes.js';
import './Athletes.css';

export default function Athletes() {
  const [search, setSearch] = useState('');
  const [gameFilter, setGameFilter] = useState('All');

  const games = useMemo(() => ['All', ...new Set(athletesData.map((a) => a.game))], []);

  const filtered = useMemo(() => {
    return athletesData.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchesGame = gameFilter === 'All' || a.game === gameFilter;
      return matchesSearch && matchesGame;
    });
  }, [search, gameFilter]);

  return (
    <div className="athletes">
      <section className="page-header">
        <h1 className="page-header__title">Our Athletes</h1>
        <p className="page-header__subtitle">
          Meet the champions who represent the spirit and excellence of IGS.
        </p>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Hall of Champions"
          title="Meet the"
          highlight="Athletes"
          subtitle="Search and filter to discover the incredible talent within our federation."
        />

        <div className="athletes__controls">
          <div className="athletes__search">
            <span className="athletes__search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search athlete by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search athletes"
            />
          </div>
          <div className="athletes__filters" role="tablist" aria-label="Filter by game">
            {games.map((g) => (
              <button
                key={g}
                className={`athletes__filter ${gameFilter === g ? 'athletes__filter--active' : ''}`}
                onClick={() => setGameFilter(g)}
                role="tab"
                aria-selected={gameFilter === g}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="athletes__grid">
          {filtered.map((a) => <AthleteCard key={a.id} athlete={a} />)}
        </div>

        {filtered.length === 0 && (
          <p className="athletes__empty">No athletes match your search.</p>
        )}
      </section>
    </div>
  );
}