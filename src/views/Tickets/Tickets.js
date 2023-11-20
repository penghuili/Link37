import { Copy } from 'grommet-icons';
import React from 'react';
import { Href } from '../../pico-components/Href';
import { Heading } from '../../pico-components/Typography';
import { apps } from '../../shared/js/apps';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import PaymentStatus from '../../shared/react/PaymentStatus';
import copyToClipboard from '../../shared/react/copyToClipboard';

function Tickets({ account, isLoading, onToast }) {
  return (
    <>
      <AppBar title="Buy tickets" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <p>You can try Link37 for free for 14 days.</p>
        <p>After that, it's only $19 / year.</p>

        <Divider />

        <Spacer />
        <PaymentStatus app={apps.link37.name} showBuyButton={false} />
        <Divider />

        {!!account && (
          <>
            <Heading margin="1rem 0 0" level="3">
              Buy ticket
            </Heading>

            <p>You can buy ticket at my stripe page.</p>

            <p>1. Please add your username to the "Your Link37 username" field when checkout.</p>
            <p>
              Your username: {account.username}{' '}
              <Copy
                onClick={() => {
                  copyToClipboard(account.username);
                  onToast('Copied!');
                }}
              />
            </p>

            <p>
              2. <Href label="Buy 1 year ticket for $19" href={process.env.REACT_APP_STRIPE_URL} />
            </p>

            <p>3. After payment, come back to this page and refresh.</p>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Tickets;
