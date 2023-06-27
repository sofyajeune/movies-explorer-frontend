import React, { useEffect, useRef } from 'react';
import './MessagePopup.css';

function MessagePopup({ title, description, onClose }) {
  const popupRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <section className="message-popup-overlay">
      <div className="message-popup" ref={popupRef}>
        <div className="message-popup__content">
          <h3 className="message-popup__title">{title}</h3>
          <p className="message-popup__description">{description}</p>
          <button className="message-popup__close-button" onClick={handleClose}></button>
        </div>
      </div>
    </section>
  );
}

export default MessagePopup;
