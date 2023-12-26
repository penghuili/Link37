import { Anchor, Text } from 'grommet';
import React from 'react';
import { useLocation } from 'wouter';
import RouteLink from '../shared/react/RouteLink';
import { encryptionUrl } from '../shared/react/initShared';

function Pitch({ showHome }) {
  const [location] = useLocation();

  return (
    <>
      <Text margin="0 0 1rem">
        Your browser's start page. <Anchor label="Encrypted" href={encryptionUrl} target="_blank" />
        .
      </Text>
      {showHome && location !== '/' && <RouteLink label="← Back to Home" to="/" />}
    </>
  );
}

export default Pitch;
