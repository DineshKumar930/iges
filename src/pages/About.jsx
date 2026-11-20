import React, { useEffect, useRef, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import './About.css';

const stats = [
  { value: 50,  suffix: '+', label: 'Games' },
  { value: 500, suffix: '+', label: 'Athletes' },
  { value: 100, suffix: '+', label: 'Events' },
  { value: 25,  suffix: '+', label: 'Affiliated Clubs' }
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const dur = 2000;
        const step = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(step);
          else setCount(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref} className="about__stat-value">{count}{suffix}</span>;
}

export default function About() {
  return (
    <div className="about">
      <section className="page-header">
        <h1 className="page-header__title">About IGES</h1>
        <p className="page-header__subtitle">
          Discover our mission, vision, and the values that drive the International Game Sports Federation forward
            </p>
      </section>

      <section className="section about__intro">
        <div className="about__intro-grid">
          <div>
            <SectionTitle
              eyebrow="Who We Are"
              title="The Federation Behind the"
              highlight="Game"
              align="left"
              subtitle="Indian Group of Education & Sports(IGES) is the governing body for competitive sports, established to promote, develop, and regulate athletic disciplines across all levels — from grassroots to elite competition."
            />
            <p className="about__paragraph">
              Our aim is to create meaningful opportunities for students, athletes, coaches, schools, colleges, academies, and educational institutions through sports programmes, competitions, training camps, educational initiatives, and skill-development activities.
            </p>
          </div>
          <div className="about__image">
            <img
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80"
              alt="Federation athletes"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section about__mv">
        <div className="about__mv-grid">
          <div className="about__mv-card">
            <div className="about__mv-icon" aria-hidden="true">🎯</div>
            <h3 className="about__mv-title">Our Mission</h3>
            <p className="about__mv-text">
              We promote sports, fitness, and youth development through tournaments, training, and education while nurturing talent, teamwork, leadership, and sportsmanship.
            </p>
          </div>
          <div className="about__mv-card">
            <div className="about__mv-icon" aria-hidden="true">👁️</div>
            <h3 className="about__mv-title">Our Vision</h3>
            <p className="about__mv-text">
              To build a healthier, stronger, and more educated society where every young person gets the opportunity to discover their potential through education and sports.
            </p>
          </div>
          <div className="about__mv-card">
            <div className="about__mv-icon" aria-hidden="true">🏅</div>
            <h3 className="about__mv-title">Our Values</h3>
            <p className="about__mv-text">
              Integrity, inclusivity, excellence, and respect. These values guide every decision we make and
              every competition we organize.
            </p>
          </div>
        </div>
      </section>

      <section className="section about__objectives">
        <SectionTitle
          eyebrow="What Drives Us"
          title="Our Core"
          highlight="Objectives"
        />
        <div className="about__obj-grid">
          {
[
  {
    icon: '🎯',
    title: 'Discipline',
    text: 'Build dedication, self-control, and commitment through sports and structured training.'
  },
  {
    icon: '🛡️',
    title: 'Integrity',
    text: 'Promote honesty, transparency, and ethical values in every sporting activity.'
  },
  {
    icon: '🤝',
    title: 'Teamwork',
    text: 'Encourage unity, cooperation, and mutual respect among athletes and communities.'
  },
  {
    icon: '🏆',
    title: 'Excellence',
    text: 'Inspire athletes to achieve their highest potential through training and competition.'
  },
  {
    icon: '⚖️',
    title: 'Fair Play',
    text: 'Ensure fairness, equality, respect, and sportsmanship in all competitions.'
  },
  {
    icon: '🌍',
    title: 'Inclusion',
    text: 'Create equal opportunities for everyone to participate and succeed in sports.'
  }
].map((obj, i) => (
            <div key={i} className="about__obj-card">
              <span className="about__obj-icon" aria-hidden="true">{obj.icon}</span>
              <h4 className="about__obj-title">{obj.title}</h4>
              <p className="about__obj-text">{obj.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section about__stats-section">
        <SectionTitle
          eyebrow="By The Numbers"
          title="Our Impact in"
          highlight="Statistics"
        />
        <div className="about__stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="about__stat-card">
              <Counter target={s.value} suffix={s.suffix} />
              <span className="about__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
