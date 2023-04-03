import { Text } from 'grommet';
import React from 'react';
import RouteLink from '../shared/react/RouteLink';
import { useLocation } from 'wouter';

function Pitch({ showHome }) {
  const [location] = useLocation();

  return (
    <>
      <Text>
        Your browser's start page, <RouteLink label="encrytped" to="/encryption" />.
      </Text>
      {showHome && location !== '/' && <RouteLink label="Home" to="/" />}
    </>
  );
}

export default Pitch;
