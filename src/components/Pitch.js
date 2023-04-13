import { Text } from 'grommet';
import React from 'react';
import RouteLink from '../shared/react/RouteLink';
import { useLocation } from 'wouter';

function Pitch({ showHome }) {
  const [location] = useLocation();

  return (
    <>
      <Text margin="0 0 1rem">
        Your browser's start page, <RouteLink label="encrypted" to="/encryption" />.
      </Text>
      {showHome && location !== '/' && <RouteLink label="← Back to Home" to="/" />}
    </>
  );
}

export default Pitch;
