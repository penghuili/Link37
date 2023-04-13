import { Anchor, Avatar, Heading } from 'grommet';
import React from 'react';

import logo from '../../assets/logo.png';
import Examples from '../../components/Examples';
import Pitch from '../../components/Pitch';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import RouteLink from '../../shared/react/RouteLink';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0 1rem">
          <Avatar src={logo} />{' '}
          <Heading level="2" margin="0 0 0 1rem">
            Link37
          </Heading>
        </HorizontalCenter>
        <Pitch />
        <Spacer />
        <Examples />
        <Spacer size="2rem" />

        <RouteLink to="/sign-up" label="Sign up" />
        <Spacer />
        <RouteLink to="/sign-in" label="Sign in" />
        <Spacer />
        <Divider />
        <Spacer />
        <Anchor
          label="How encryption works?"
          href="https://www.peng.kiwi/link37/encryption"
          target="_blank"
        />
        <Spacer />
        <RouteLink label="Pricing" to="/pricing" />
        <Spacer />
        <Anchor label="Privacy" href="https://www.peng.kiwi/link37/privacy" target="_blank" />
        <Spacer />
        <Anchor label="Terms" href="https://www.peng.kiwi/link37/terms" target="_blank" />
        <Spacer />
        <Anchor label="Contact" href="https://www.peng.kiwi/contact" target="_blank" />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
