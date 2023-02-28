import { Box, Text } from 'grommet';
import React from 'react';

import RouteLink from '../../shared/react/RouteLink';

function ExpiredBanner({ isExpired }) {
  if (!isExpired) {
    return null;
  }

  return (
    <Box border={{ color: 'status-critical' }} margin="1rem 0" pad="1rem">
      <Text>Your account is expired.</Text>
      <Text margin="1rem 0">You can't view your pages and links anymore.</Text>
      <Text>
        You can buy a ticket <RouteLink label="here" to="/tickets" />.
      </Text>
    </Box>
  );
}

export default ExpiredBanner;
