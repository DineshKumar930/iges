import React from 'react';
import './EventCard.css';

const statusLabels = { upcoming: 'Upcoming', ongoing: 'Ongoing', completed: 'Completed' };

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card__image-wrap">
        <img src={event.image} alt={event.name} className="event-card__image" loading="lazy" />
        <div className="event-card__image-overlay" />
        <span className={`event-card__status event-card__status--${event.status}`}>
          {statusLabels[event.status]}
        </span>
      </div>
      <div className="event-card__body">
        <div className="event-card__game">{event.game}</div>
        <h3 className="event-card__title">{event.name}</h3>
        <p className="event-card__description">{event.description}</p>
        <div className="event-card__info">
          <div className="event-card__info-row">
            <span className="event-card__info-icon" aria-hidden="true">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-card__info-row">
            <span className="event-card__info-icon" aria-hidden="true">📍</span>
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="event-card__actions">
          <button className="event-card__btn event-card__btn--primary" disabled={!event.registrationOpen}>
            {event.registrationOpen ? 'Register' : 'Closed'}
          </button>
          <button className="event-card__btn event-card__btn--ghost">View Details</button>
        </div>
      </div>
    </article>
  );
}