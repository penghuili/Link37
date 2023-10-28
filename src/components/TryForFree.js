import { Text } from 'grommet';
import React from 'react';
import Pitch from './Pitch';

function TryForFree() {
  return (
    <>
      <Pitch />
      <Text margin="2rem 0 0">You can try Link37 for free for 14 days.</Text>
      <Text margin="0 0 1rem">After that, it's only $19 / year.</Text>
    </>
  );
}

export default TryForFree;
