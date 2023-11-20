import React from 'react';
import TryForFree from '../../components/TryForFree';
import { Button } from '../../pico-components/Button';
import { Heading } from '../../pico-components/Typography';
import { apps } from '../../shared/js/apps';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';

function Expired({ isTrying, onTry }) {
  return (
    <>
      <AppBar title="Try Link37!" isLoading={isTrying} />
      <ContentWrapper>
        <Heading margin="0">Try Link37!</Heading>
        <TryForFree />
        <Spacer size="2rem" />

        <Button onClick={() => onTry(apps.link37.name)} disabled={isTrying}>
          Start trying
        </Button>
      </ContentWrapper>
    </>
  );
}

export default Expired;
