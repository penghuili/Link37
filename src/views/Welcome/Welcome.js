import { Avatar, Heading } from 'grommet';
import React from 'react';

import logo from '../../assets/logo.png';
import Divider from '../../components/Divider';
import Pitch from '../../components/Pitch';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';
import ContentWrapper from '../../shared/react/ContentWrapper';
import HorizontalCenter from '../../shared/react/HorizontalCenter';

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
