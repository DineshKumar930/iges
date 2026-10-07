import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import EventCard from '../components/EventCard.jsx';
import { eventsData, eventStatuses } from '../data/events.js';
import './Events.css';

const statusLabels = { All: 'All', upcoming: 'Upcoming', ongoing: 'Ongoing', completed: 'Completed' };

export default function Events() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All'
    ? eventsData
    : eventsData.filter((e) => e.status === filter);

  return (
    <div className="events">
      <section className="page-header">
        <h1 className="page-header__title">Events</h1>
        <p className="page-header__subtitle">
          Browse upcoming, ongoing, and completed tournaments and championships organized by IGS.
        </p>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Calendar"
          title="Federation"
          highlight="Events"
          subtitle="From national championships to international meets — find your next competition."
        />

        <div className="events__filters" role="tablist" aria-label="Filter events">
          {eventStatuses.map((s) => (
            <button
              key={s}
              className={`events__filter ${filter === s ? 'events__filter--active' : ''}`}
              onClick={() => setFilter(s)}
              role="tab"
              aria-selected={filter === s}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>

        <div className="events__grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filtered.length === 0 && <p className="events__empty">No events found.</p>}
      </section>
    </div>
  );
}