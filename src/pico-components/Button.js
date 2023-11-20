import React from 'react';
import { classNames } from './utils';

export function Button({ secondary, outline, children, disabled, loading, onClick }) {
  return (
    <button
      className={classNames({ secondary, outline })}
      onClick={onClick}
      disabled={disabled}
      aria-busy={loading}
    >
      {children}
    </button>
  );
}
