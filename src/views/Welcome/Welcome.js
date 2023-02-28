import { Avatar, Heading } from 'grommet';
import React from 'react';

import logo from '../../assets/logo.png';
import Examples from '../../components/Examples';
import Pitch from '../../components/Pitch';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import HorizontalCenter from '../../shared/react/HorizontalCenter';
import RouteLink from '../../shared/react/RouteLink';
import Spacer from '../../shared/react/Spacer';

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
        <RouteLink label="How encryption works?" to="/encryption" />
        <Spacer />
        <RouteLink label="Pricing" to="/pricing" />
        <Spacer />
        <RouteLink label="Privacy" to="/privacy" />
        <Spacer />
        <RouteLink label="Terms" to="/terms" />
        <Spacer />
        <RouteLink label="Contact" to="/contact" />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
