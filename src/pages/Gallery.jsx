import React, { useMemo, useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import './Gallery.css';

const galleryItems = [
  { id: 1,  category: 'Events',  title: 'Team IGES',       image: 'images/p2.jpeg' },
  { id: 2,  category: 'Events',  title: 'Team IGES',       image: 'images/p3.jpeg' },
  { id: 3,  category: 'Events',  title: 'Team IGES',       image: 'images/p4.jpeg' },
  { id: 4,  category: 'Events',  title: 'Team IGES',       image: 'images/p5.jpeg' },
  { id: 4,  category: 'Events',  title: 'Team IGES',       image: 'images/kab.jpeg' },
  { id: 4,  category: 'Events',  title: 'Team IGES',       image: 'images/ref.jpeg' },
  { id: 4,  category: 'Events',  title: 'Team IGES',       image: 'images/sl1.jpeg' },
  


];

const categories = ['All', 'Events', 'Tournaments', 'Awards', 'Athletes', 'Federation'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter]
  );

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((p) => (p + 1) % filtered.length);
  const prev = () => setLightboxIndex((p) => (p - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="gallery">
      <section className="page-header">
        <h1 className="page-header__title">Gallery</h1>
        <p className="page-header__subtitle">
          Relive the most memorable moments from IGS events, tournaments, and ceremonies.
        </p>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Moments"
          title="Photo"
          highlight="Gallery"
          subtitle="A visual journey through the highlights of our federation."
        />

        <div className="gallery__filters" role="tablist" aria-label="Filter gallery">
          {categories.map((c) => (
            <button
              key={c}
              className={`gallery__filter ${filter === c ? 'gallery__filter--active' : ''}`}
              onClick={() => setFilter(c)}
              role="tab"
              aria-selected={filter === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <button key={item.id} className="gallery__item" onClick={() => openLightbox(i)} aria-label={`Open ${item.title}`}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery__overlay">
                <span className="gallery__category">{item.category}</span>
                <span className="gallery__title">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div className="gallery__lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="gallery__lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="gallery__lb-nav gallery__lb-nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
          <div className="gallery__lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightboxIndex].image} alt={filtered[lightboxIndex].title} />
            <div className="gallery__lb-caption">
              <span className="gallery__lb-category">{filtered[lightboxIndex].category}</span>
              <h3>{filtered[lightboxIndex].title}</h3>
            </div>
          </div>
          <button className="gallery__lb-nav gallery__lb-nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
        </div>
      )}
    </div>
  );
}