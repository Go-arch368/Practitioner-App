import React from 'react';

interface Props {
  error: string;
  handleClose: () => void;
}

const ErrorModal: React.FC<Props> = ({ error, handleClose }) => {
  // Only close modal if the overlay itself (not child) is clicked
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="error-modal-overlay" onClick={handleOverlayClick}>
      <div className="error-modal-content text-center">
        <p className="mt-3">{error}</p>
        <button className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
