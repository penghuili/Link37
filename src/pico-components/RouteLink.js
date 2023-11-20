import React from 'react';
import { Link } from 'wouter';
import { Href } from './Href';

export function RouteLink({ to, label, margin = '0' }) {
  return (
    <Link to={to}>
      <Href label={label} margin={margin} onClick={e => e.preventDefault()} />
    </Link>
  );
}
