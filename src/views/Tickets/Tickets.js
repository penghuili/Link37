import { Anchor, Spinner, Text } from 'grommet';
import React, { useEffect } from 'react';

import apps from '../../shared/js/apps';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import PaymentStatus from '../../shared/react/PaymentStatus';
import { getQueryParams } from '../../shared/react/routeHelpers';
import Spacer from '../../shared/react/Spacer';

function Tickets({ payError, isLoading, isPaying, onPay }) {
  const { code } = getQueryParams();

  useEffect(() => {
    if (code) {
      onPay(apps.link37.name, code);
    }
  }, [code, onPay]);

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

        <Text margin="1rem 0 0">
          You can buy ticket at my{' '}
          <Anchor label="ko-fi" href="https://ko-fi.com/penghuili/shop" target="_blank" /> shop.
        </Text>
        <Text>
          (I only created 5 tickets for now,{' '}
          <Anchor label="let me know" href="mailto:peng@duck.com" target="_blank" /> if sold out)
        </Text>

        <Text margin="1rem 0">You will be redirected back to this page after payment.</Text>

        {isPaying && <Spinner />}
        {!!payError && <Text color="status-error">{payError}</Text>}
      </ContentWrapper>
    </>
  );
}

export default Tickets;
