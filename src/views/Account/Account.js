import React from 'react';
import { Href } from '../../pico-components/Href';
import { RouteLink } from '../../pico-components/RouteLink';
import { Spinner } from '../../pico-components/Spinner';
import { apps } from '../../shared/js/apps';
import { formatDateTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import AppVersion from '../../shared/react/AppVersion';
import ChangeTheme from '../../shared/react/ChangeTheme';
import PaymentStatus from '../../shared/react/PaymentStatus';
import { privacyUrl, termsUrl } from '../../shared/react/initShared';

function Account({ account, isLoadingAccount }) {
  return (
    <>
      <AppBar title="Account" hasBack />
      <ContentWrapper>
        {isLoadingAccount && <Spinner />}
        {!!account?.userId && (
          <>
            <p>Username: {account.username}</p>
            <p>User ID: {account.userId}</p>
            <p>Created at: {formatDateTime(account.createdAt)}</p>
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
            <Href label="How encryption works?" href="https://encrypt37.com/encryption" />
            <Spacer />
            <Href label="Source code" href="https://github.com/penghuili/Link37" />
            <Spacer />
            <RouteLink label="Pricing" to="/pricing" />
            <Spacer />
            <RouteLink label="Buy tickets" to="/tickets" />
            <Spacer />
            <Href label="Privacy" href={privacyUrl} />
            <Spacer />
            <Href label="Terms" href={termsUrl} />
            <Spacer />
            <Href label="Contact" href="https://encrypt37.com/contact" />
            <Spacer />
            <Divider />
            <Spacer />
            <AppVersion />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Account;
