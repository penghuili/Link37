import { Anchor, Heading, Text } from 'grommet';
import { Copy } from 'grommet-icons';
import React from 'react';

import apps from '../../shared/js/apps';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import copyToClipboard from '../../shared/react/copyToClipboard';
import PaymentStatus from '../../shared/react/PaymentStatus';

function Tickets({ account, isLoading, onToast }) {
  return (
    <>
      <AppBar title="Buy tickets" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <Text>You can try Link37 for free for 14 days.</Text>
        <Text margin="0 0 1rem">After that, it's only $19 / year.</Text>

        <Divider />

        <Spacer />
        <PaymentStatus app={apps.link37.name} showBuyButton={false} />
        <Divider />

        {!!account && (
          <>
            <Heading margin="1rem 0 0" level="3">
              Buy ticket
            </Heading>

            <Text margin="1rem 0 0">You can buy ticket at my stripe page.</Text>

            <Text margin="1rem 0 0">
              1. Please add your username to the "Your Link37 username" field when checkout.
            </Text>
            <Text margin="1rem 0 0">
              Your username: {account.username}{' '}
              <Copy
                onClick={() => {
                  copyToClipboard(account.username);
                  onToast('Copied!');
                }}
              />
            </Text>

            <Text margin="1rem 0 0">
              2.{' '}
              <Anchor
                label="Buy 1 year ticket for $19"
                href={process.env.REACT_APP_STRIPE_URL}
                target="_blank"
              />
            </Text>

            <Text margin="1rem 0 0">3. After payment, come back to this page and refresh.</Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Tickets;
