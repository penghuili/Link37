import React from 'react';

export function Modal({ show, onClose, children }) {
  return (
    <dialog open={show}>
      <article>
        <a
          aria-label="Close"
          className="close"
          onClick={e => {
            e.preventDefault();
            onClose();
          }}
        ></a>
        {children}
      </article>
    </dialog>
  );
}
