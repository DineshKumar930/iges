import React, { useState, useEffect } from "react";
import "./ImageModal.css";

const ImageModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay">
      <div className="image-modal">

        <button
          className="image-modal-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
        >
          &times;
        </button>

        <img
          src="/images/olmp1.jpeg"
          alt="IGES Announcement"
          className="image-modal-img"
        />

      </div>
    </div>
  );
};

export default ImageModal;