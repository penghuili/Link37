import React, { useEffect } from 'react';

export function PicoWrapper({ themeMode, children }) {
  useEffect(() => {
    if (themeMode) {
      document.documentElement.setAttribute('data-theme', themeMode);
    }
  }, [themeMode])

  return (
    <main className="container">
      {children}
    </main>
  );
}
