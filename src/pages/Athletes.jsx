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
        <h1 className="page-header__title">Pride of IGES</h1>
        <p className="page-header__subtitle">
          Meet the dedicated members who drive the vision, passion, teamwork, and excellence of IGES.
        </p>
      </section>

      <section className="section">
        

        

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