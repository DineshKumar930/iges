import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    title: 'IGNITE THE GAME.',
    subtitle: 'INSPIRE THE FUTURE.',
    description: 'Join the movement that celebrates athletic excellence, sportsmanship, and the unifying power of sport.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80',
    cta1: { label: 'Explore Games',   path: '/games' },
    cta2: { label: 'Upcoming Events', path: '/events' }
  },
  {
    id: 2,
    title: 'WHERE CHAMPIONS',
    subtitle: 'ARE MADE.',
    description: 'From grassroots to glory, IGS provides the platform for athletes to reach their full potential.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80',
    cta1: { label: 'Our Athletes', path: '/athletes' },
    cta2: { label: 'About IGS',    path: '/about' }
  },
  {
    id: 3,
    title: 'UNITY THROUGH',
    subtitle: 'COMPETITION.',
    description: 'Experience the thrill of national championships, international tournaments, and the spirit of fair play.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80',
    cta1: { label: 'View Events', path: '/events' },
    cta2: { label: 'Latest News', path: '/news' }
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prevSlide = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextSlide, 6000);
    return () => clearInterval(id);
  }, [nextSlide, isPaused]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft')  prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slider"
    >
      {slides.map((slide, i) => (
        <div key={slide.id} className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`} aria-hidden={i !== current}>
          <div className="hero__image" style={{ backgroundImage: `url(${slide.image})` }} />
          <div className="hero__overlay" />
        </div>
      ))}

      <div className="hero__content">
        <div className="hero__container">
          <div className="hero__text">
            <span className="hero__badge">International Game Sports Federation</span>
            <h1 className="hero__title" key={current}>
              <span className="hero__title-line">{slides[current].title}</span>
              <span className="hero__title-line hero__title-line--accent">{slides[current].subtitle}</span>
            </h1>
            <p className="hero__description" key={`d-${current}`}>{slides[current].description}</p>
            <div className="hero__actions">
              <Link to={slides[current].cta1.path} className="hero__btn hero__btn--primary">
                {slides[current].cta1.label}<span className="hero__btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link to={slides[current].cta2.path} className="hero__btn hero__btn--secondary">
                {slides[current].cta2.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button className="hero__nav hero__nav--prev" onClick={prevSlide} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className="hero__nav hero__nav--next" onClick={nextSlide} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <div className="hero__pagination" role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button key={s.id} className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`} onClick={() => setCurrent(i)} role="tab" aria-selected={i === current} aria-label={`Go to slide ${i + 1}`}>
            <span className="hero__dot-fill" />
          </button>
        ))}
      </div>

      <div className="hero__scroll"><span className="hero__scroll-text">Scroll</span><span className="hero__scroll-line" /></div>
    </section>
  );
}