import React from 'react';
import { Box } from '../../pico-components/Box';
import { RouteLink } from '../../pico-components/RouteLink';

function ExpiredBanner({ isExpired }) {
  if (!isExpired) {
    return null;
  }

  return (
    <Box border="critical" margin="0 0 1rem" pad="1rem">
      <p>Your account is expired.</p>
      <p>
        You can buy a ticket <RouteLink label="here" to="/tickets" />.
      </p>
    </Box>
  );
}

export default ExpiredBanner;
