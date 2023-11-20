import React from 'react';
import { useLocation } from 'wouter';
import { Href } from '../pico-components/Href';
import { RouteLink } from '../pico-components/RouteLink';

function Pitch({ showHome }) {
  const [location] = useLocation();

  return (
    <>
      <p>
        Your browser's start page.{' '}
        <Href label="Encrypted" href="https://encrypt37.com/encryption" />.
      </p>
      {showHome && location !== '/' && <RouteLink label="← Back to Home" to="/" />}
    </>
  );
}

export default Pitch;
