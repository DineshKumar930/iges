import React, { useMemo, useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import './Gallery.css';

const galleryItems = [
  { id: 1,  category: 'Events',      title: 'Opening Ceremony',       image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80' },
  { id: 2,  category: 'Tournaments', title: 'Cricket Finals',         image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80' },
  { id: 3,  category: 'Athletes',    title: 'Sprint Champion',        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80' },
  { id: 4,  category: 'Awards',      title: 'Annual Awards Night',    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80' },
  { id: 5,  category: 'Federation',  title: 'Committee Meeting',      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80' },
  { id: 6,  category: 'Events',      title: 'Football Championship',  image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80' },
  { id: 7,  category: 'Tournaments', title: 'Basketball League',      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80' },
  { id: 8,  category: 'Athletes',    title: 'Training Session',       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80' },
  { id: 9,  category: 'Awards',      title: 'Medal Ceremony',         image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80' },
  { id: 10, category: 'Federation',  title: 'Press Conference',       image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80' },
  { id: 11, category: 'Events',      title: 'Volleyball Match',       image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80' },
  { id: 12, category: 'Tournaments', title: 'Badminton Finals',       image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80' }
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