import { Anchor, Spinner, Text } from 'grommet';
import React from 'react';
import { apps } from '../../shared/js/apps';
import { formatDateTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import AppVersion from '../../shared/react/AppVersion';
import ChangeTheme from '../../shared/react/ChangeTheme';
import OneAccountFor from '../../shared/react/OneAccountFor';
import PaymentStatus from '../../shared/react/PaymentStatus';
import RouteLink from '../../shared/react/RouteLink';
import { encryptionUrl, privacyUrl, termsUrl } from '../../shared/react/initShared';

function Account({ account, isLoadingAccount }) {
  return (
    <>
      <AppBar title="Account" hasBack />
      <ContentWrapper>
        {isLoadingAccount && <Spinner />}
        {!!account?.userId && (
          <>
            <Text margin="0 0 1rem">Username: {account.username}</Text>
            <Text margin="0 0 1rem">User ID: {account.userId}</Text>
            <Text margin="0 0 1rem">Created at: {formatDateTime(account.createdAt)}</Text>
            <PaymentStatus app={apps.link37.name} showBuyButton />
            <Divider />
            <Spacer />
            <ChangeTheme />
            <Divider />
            <Spacer />
            <RouteLink label="Security" to="/security" />
            <Spacer />
            <Divider />
            <Spacer />
            <Anchor label="How encryption works?" href={encryptionUrl} target="_blank" />
            <Spacer />
            <Anchor
              label="Source code"
              href="https://github.com/penghuili/Link37"
              target="_blank"
            />
            <Spacer />
            <RouteLink label="Pricing" to="/pricing" />
            <Spacer />
            <RouteLink label="Buy tickets" to="/tickets" />
            <Spacer />
            <Anchor label="Privacy" href={privacyUrl} target="_blank" />
            <Spacer />
            <Anchor label="Terms" href={termsUrl} target="_blank" />
            <Spacer />
            <Anchor label="Contact" href="https://peng37.com/contact" target="_blank" />
            <Spacer />
            <Divider />
            <Spacer />
            <OneAccountFor app={apps.link37.name} />
            <Spacer />
            <AppVersion />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Account;
