import React from 'react';

export function Img({ src, width, height, margin }) {
  if (!src) {
    return null;
  }

  return <img src={src} width={width} height={height} style={{ margin }} />;
}
