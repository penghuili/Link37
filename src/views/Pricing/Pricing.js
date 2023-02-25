import { Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import RouteLink from '../../shared/react/RouteLink';

function Pricing({ isLoggedIn }) {
  return (
    <>
      <AppBar title="Pricing" hasBack />
      <ContentWrapper>
        <Text>You can try Link37 for free for 14 days.</Text>
        <Text margin="0 0 1rem">After that, it's only $19 / year.</Text>

        {isLoggedIn && (
          <Text margin="0 0 1rem">
            You can buy tickets <RouteLink label="here" to="/tickets" />.
          </Text>
        )}
      </ContentWrapper>
    </>
  );
}

export default Pricing;
