import React from 'react';
import { RouteLink } from '../../pico-components/RouteLink';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import AppBar from '../../shared/react/AppBar';

function Pricing({ isLoggedIn }) {
  return (
    <>
      <AppBar title="Pricing" hasBack />
      <ContentWrapper>
        <p>You can try Link37 for free for 14 days.</p>
        <p>After that, it's only $19 / year.</p>

        {isLoggedIn && (
          <p>
            You can buy tickets <RouteLink label="here" to="/tickets" />.
          </p>
        )}
      </ContentWrapper>
    </>
  );
}

export default Pricing;
