
import React from 'react';
import './FloatingContactButtons.css';

const FloatingContactButtons = () => {
  // Apne actual contact number se replace karein
  const phoneNumber = '916386255959';

  const message =
    'Hello IGS Team, I would like to know more about your sports programs and events.';

  const whatsappURL =
    `https://wa.me/${6386255959}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Left Side - Calling Button */}
      <a
        href={`tel:+${phoneNumber}`}
        className="igs-float igs-float-call"
        aria-label="Call IGSE"
        title="Call IGSE"
      >
        <svg
          viewBox="0 0 24 24"
          width="27"
          height="27"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.56 3.57.56a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.19 2.45.56 3.57a1 1 0 01-.25 1.02z" />
        </svg>
        <span className="igs-float-tooltip">Call Us</span>
      </a>

      {/* Right Side - WhatsApp Button */}
      <a
        href={whatsappURL}
        className="igs-float igs-float-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with IGS on WhatsApp"
        title="WhatsApp IGS"
      >
        <svg
          viewBox="0 0 32 32"
          width="29"
          height="29"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 .8A15.1 15.1 0 003 23.6l-2.2 7.6 7.8-2A15.2 15.2 0 1016 .8zm0 27.6a12.4 12.4 0 01-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.5 12.5 0 1116 28.4zm6.9-9.3c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.4 3.5 1.6 3.7c.2.2 2.7 4.2 6.5 5.8.9.4 1.6.6 2.2.7.9.3 1.7.2 2.3.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5z" />
        </svg>
        <span className="igs-float-tooltip">Chat with IGES</span>
      </a>
    </>
  );
};

export default FloatingContactButtons;
