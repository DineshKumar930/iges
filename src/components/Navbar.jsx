import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/',         label: 'Home' },
  { path: '/about',    label: 'About' },
  { path: '/games',    label: 'Games' },
  { path: '/events',   label: 'Events' },
  { path: '/athletes', label: 'Athletes' },
  { path: '/gallery',  label: 'Gallery' },
  { path: '/news',     label: 'News' },
  { path: '/contact',  label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" aria-label="IGES Home">
          <img
            src="/images/logo.jpeg"
            alt="Indian Group of Education and Sports (IGES) Logo"
            className="navbar__logo-img"
          />
          <span className="navbar__logo-text">
            <span className="navbar__logo-title">Indian Group of</span>
            <span className="navbar__logo-title navbar__logo-title--accent">
              Education &amp; Sports
            </span>
            <span className="navbar__logo-sub">शिक्षा और खेल का संगम</span>
          </span>
        </Link>

        <nav className="navbar__desktop" aria-label="Primary">
          <ul className="navbar__list">
            {navLinks.map((link) => (
              <li key={link.path} className="navbar__item">
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <Link to="/contact" className="navbar__cta navbar__cta--ghost">Login</Link>
          <Link to="/contact" className="navbar__cta navbar__cta--primary">Join IGES</Link>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </div>

      <div
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-label="Mobile"
      >
        <div className="navbar__mobile-brand">
          <img
            src="/images/logo.jpeg"
            alt="IGES Logo"
            className="navbar__mobile-logo"
          />
          <div>
            <div className="navbar__mobile-brand-title">IGES</div>
            <div className="navbar__mobile-brand-sub">शिक्षा और खेल का संगम</div>
          </div>
        </div>

        <ul className="navbar__mobile-list">
          {navLinks.map((link, i) => (
            <li
              key={link.path}
              className="navbar__mobile-item"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <NavLink
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__mobile-actions">
          <Link
            to="/contact"
            className="navbar__cta navbar__cta--ghost navbar__cta--full"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/contact"
            className="navbar__cta navbar__cta--primary navbar__cta--full"
            onClick={() => setMenuOpen(false)}
          >
            Join IGES
          </Link>
        </div>
      </nav>
    </header>
  );
}