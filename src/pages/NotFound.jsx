import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__glow" />
      <div className="not-found__content">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__text">
          The page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>
        <Link to="/" className="not-found__btn">
          Back to Home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}