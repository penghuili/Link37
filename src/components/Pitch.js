import { Text } from 'grommet';
import React from 'react';
import RouteLink from '../shared/react/RouteLink';

function Pitch() {
  return (
    <Text>
      Your browser's start page, <RouteLink label="encrytped" to="/encryption" />.
    </Text>
  );
}

export default Pitch;
