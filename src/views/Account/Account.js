import { Spinner, Text } from 'grommet';
import React from 'react';

import { formatDateTime } from '../../shared/js/date';
import AppBar from '../../shared/react/AppBar';
import ChangeTheme from '../../shared/react/ChangeTheme';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import RouteLink from '../../shared/react/RouteLink';
import Spacer from '../../shared/react/Spacer';

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
            <Divider />
            <Spacer />
            <ChangeTheme />
            <Divider />
            <Spacer />
            <RouteLink label="Security" to="/security" />
            <Spacer />
            <Divider />
            <Spacer />
            <RouteLink label="How encryption works?" to="/encryption" />
            <Spacer />
            <RouteLink label="Pricing" to="/pricing" />
            <Spacer />
            <RouteLink label="Privacy" to="/privacy" />
            <Spacer />
            <RouteLink label="Terms" to="/terms" />
            <Spacer />
            <RouteLink label="Contact" to="/contact" />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Account;
