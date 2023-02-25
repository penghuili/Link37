import { Anchor, Text } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';

function Terms() {
  return (
    <>
      <AppBar title="Terms" hasBack />
      <ContentWrapper>
        <Text>1. You can try Link37 14 days for free;</Text>

        <Text margin="1rem 0 0">2. You can buy tickets to continue using Link37;</Text>

        <Text margin="1rem 0 0">3. After your account is expired, you can't view your links;</Text>

        <Text margin="1rem 0 0">4. After a payment is made, it won't be possible to refund;</Text>

        <Text margin="1rem 0 0">
          Contact me for anything:{' '}
          <Anchor label="peng@duck.com" href="mailto:peng@duck.com" target="_blank" />
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Terms;
