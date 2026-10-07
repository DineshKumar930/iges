import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import GameCard from '../components/GameCard.jsx';
import EventCard from '../components/EventCard.jsx';
import NewsCard from '../components/NewsCard.jsx';
import { gamesData } from '../data/games.js';
import { eventsData } from '../data/events.js';
import { newsData } from '../data/news.js';
import './Home.css';

const stats = [
  { value: 50,  suffix: '+', label: 'Games' },
  { value: 500, suffix: '+', label: 'Athletes' },
  { value: 100, suffix: '+', label: 'Events' },
  { value: 25,  suffix: '+', label: 'Affiliated Clubs' }
];

function Counter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="stat-card__value">
      {count}{suffix}
    </span>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal--visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const featuredGames = gamesData.slice(0, 4);
  const upcomingEvents = eventsData.filter((e) => e.status === 'upcoming').slice(0, 3);
  const latestNews = newsData.slice(0, 3);

  return (
    <div className="home">
      <HeroSlider />

      {/* Stats Section */}
      <section className="home__stats section">
        <Reveal>
          <SectionTitle
            eyebrow="By The Numbers"
            title="Our Federation in"
            highlight="Numbers"
            subtitle="A growing community of athletes, clubs, and enthusiasts united by the love of sport."
          />
        </Reveal>
        <div className="home__stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="stat-card">
                <Counter target={s.value} suffix={s.suffix} />
                <span className="stat-card__label">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="home__about section">
        <div className="home__about-grid">
          <Reveal>
            <div className="home__about-content">
              <SectionTitle
                eyebrow="About IGS"
                title="Building Champions,"
                highlight="Shaping Futures"
                align="left"
                subtitle="The International Game Sports Federation is the premier governing body for competitive sports, dedicated to nurturing talent, promoting fair play, and elevating the standard of sports across the nation."
              />
              <ul className="home__about-list">
                <li><span className="home__about-check">✓</span> National & International Tournaments</li>
                <li><span className="home__about-check">✓</span> Athlete Development Programs</li>
                <li><span className="home__about-check">✓</span> Grassroots Sports Initiatives</li>
                <li><span className="home__about-check">✓</span> Anti-Doping & Fair Play Advocacy</li>
              </ul>
              <Link to="/about" className="home__about-btn">
                Learn More About Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="home__about-image">
              <img
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"
                alt="Athletes in action"
                loading="lazy"
              />
              <div className="home__about-image-badge">
                <span className="home__about-badge-number">25+</span>
                <span className="home__about-badge-label">Years of Excellence</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Games */}
      <section className="section">
        <Reveal>
          <SectionTitle
            eyebrow="Our Sports"
            title="Games We"
            highlight="Champion"
            subtitle="From traditional team sports to modern mind games, we govern and promote a diverse range of athletic disciplines."
          />
        </Reveal>
        <div className="home__grid home__grid--4">
          {featuredGames.map((game, i) => (
            <Reveal key={game.id} delay={i * 80}>
              <GameCard game={game} />
            </Reveal>
          ))}
        </div>
        <div className="home__center">
          <Link to="/games" className="home__view-all">View All Games <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* Events */}
      <section className="section">
        <Reveal>
          <SectionTitle
            eyebrow="What's Coming"
            title="Upcoming"
            highlight="Events"
            subtitle="Mark your calendars for the biggest sporting events of the season."
          />
        </Reveal>
        <div className="home__grid home__grid--3">
          {upcomingEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 100}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
        <div className="home__center">
          <Link to="/events" className="home__view-all">View All Events <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <Reveal>
          <SectionTitle
            eyebrow="Newsroom"
            title="Latest"
            highlight="Updates"
            subtitle="Stay informed with the latest news, announcements, and stories from the world of IGS."
          />
        </Reveal>
        <div className="home__grid home__grid--3">
          {latestNews.map((item, i) => (
            <Reveal key={item.id} delay={i * 100}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
        <div className="home__center">
          <Link to="/news" className="home__view-all">Read All News <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* CTA */}
      <section className="home__cta section">
        <Reveal>
          <div className="home__cta-box">
            <div className="home__cta-glow" />
            <h2 className="home__cta-title">Ready to Join the <span>Movement?</span></h2>
            <p className="home__cta-text">
              Whether you're an athlete, club, or fan — there's a place for you in the IGS family.
            </p>
            <div className="home__cta-actions">
              <Link to="/contact" className="home__cta-btn home__cta-btn--primary">Register Now</Link>
              <Link to="/about"   className="home__cta-btn home__cta-btn--ghost">Learn More</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}