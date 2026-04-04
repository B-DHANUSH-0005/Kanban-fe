import { useState, useEffect } from 'react';
import Modal from './Modal';

/**
 * SelectionModal — Generic modal for selecting a status or a board.
 */
export default function SelectionModal({
  isOpen,
  onClose,
  title,
  options = [],
  onSelect,
  loading = false,
  emptyMessage = "No options available."
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      }
    >
      <div className="selection-list">
        {options.length === 0 ? (
          <p className="confirm-text">{emptyMessage}</p>
        ) : (
          options.map(opt => (
            <button
              key={opt.id}
              className="selection-item"
              onClick={() => onSelect(opt.id, opt.name)}
              disabled={loading}
            >
              <span className="selection-item-text">{opt.name}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
}
