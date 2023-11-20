import React from 'react';

export function Heading({ level, children, margin }) {
  switch (level) {
    case 1:
    case '1':
      return <h1 style={{ margin }}>{children}</h1>;
    case 2:
    case '2':
      return <h2 style={{ margin }}>{children}</h2>;
    case 3:
    case '3':
      return <h3 style={{ margin }}>{children}</h3>;
    case 4:
    case '4':
      return <h4 style={{ margin }}>{children}</h4>;
    case 5:
    case '5':
      return <h5 style={{ margin }}>{children}</h5>;
    case 6:
    case '6':
      return <h6 style={{ margin }}>{children}</h6>;
    default:
      return <h1 style={{ margin }}>{children}</h1>;
  }
}
