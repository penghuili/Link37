import React, { forwardRef } from 'react';

export const Href = forwardRef(function A(
  { href, label, margin = '0', onClick, onContextMenu },
  ref
) {
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ margin }}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {label}
    </a>
  );
});
