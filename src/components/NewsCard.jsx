import React from 'react';
import './NewsCard.css';

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function NewsCard({ item }) {
  return (
    <article className="news-card">
      <div className="news-card__image-wrap">
        <img src={item.image} alt={item.title} className="news-card__image" loading="lazy" />
        <span className="news-card__category">{item.category}</span>
      </div>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span>{formatDate(item.date)}</span>
          <span className="news-card__dot">•</span>
          <span>{item.author}</span>
        </div>
        <h3 className="news-card__title">{item.title}</h3>
        <p className="news-card__description">{item.description}</p>
        <button className="news-card__btn">
          Read More <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}