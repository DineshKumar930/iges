
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './AthleteCard.css';

export default function AthleteCard({ athlete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <>
      <article className="athlete-card">
        <div className="athlete-card__image-wrap">
          <img
            src={athlete.image}
            alt={athlete.name}
            className="athlete-card__image"
            loading="lazy"
          />

          <div className="athlete-card__overlay">
            <button
              className="athlete-card__profile-btn"
              onClick={openModal}
              aria-haspopup="dialog"
              aria-label={`View ${athlete.name}'s profile`}
            >
              View Profile
            </button>
          </div>

          <span className="athlete-card__game-badge">
            {athlete.game}
          </span>
        </div>

        <div className="athlete-card__body">
          <h3 className="athlete-card__name">{athlete.name}</h3>
          <p className="athlete-card__position">{athlete.position}</p>

          <div className="athlete-card__achievement">
            <span className="athlete-card__trophy" aria-hidden="true">
              🏆
            </span>
            <span>{athlete.achievement}</span>
          </div>
        </div>
      </article>

      {isModalOpen &&
        createPortal(
          <div
            className="athlete-modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="athlete-modal-title"
          >
            <div className="athlete-modal" ref={modalRef}>

              <button
                className="athlete-modal__close"
                onClick={closeModal}
                aria-label="Close profile"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M2 2L16 16M16 2L2 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Athlete Full Image */}
              <div className="athlete-modal__hero">
                <div className="athlete-modal__image-wrap">
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    className="athlete-modal__image"
                  />
                </div>
              </div>

              {/* Athlete Information */}
              <div className="athlete-modal__content">

                <div className="athlete-modal__profile-info">
                  <h2 id="athlete-modal-title">
                    {athlete.name}
                  </h2>

                  <p className="athlete-modal__position">
                    {athlete.position}
                  </p>

                  <span className="athlete-modal__game">
                    {athlete.game}
                  </span>
                </div>

                {athlete.achievement && (
                  <div className="athlete-modal__achievement">
                    <span className="athlete-modal__trophy">
                      🏆
                    </span>
                    <span>{athlete.achievement}</span>
                  </div>
                )}

                {athlete.bio && (
                  <div className="athlete-modal__section">
                    <h4 className="athlete-modal__section-title">
                      About
                    </h4>

                    <p className="athlete-modal__bio">
                      {athlete.bio}
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
