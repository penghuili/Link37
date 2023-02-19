import { Avatar, Heading } from 'grommet';
import React from 'react';

import logo from '../../assets/logo.png';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import HorizontalCenter from '../../components/HorizontalCenter';
import Pitch from '../../components/Pitch';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';

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
        <RouteLink label="Motivation" to="/motivation" />
        <Spacer />
        <RouteLink label="How it works?" to="/how" />
        <Spacer />
        <RouteLink label="Limitations" to="/limitations" />
        <Spacer />
        <RouteLink label="How encryption works?" to="/encryption" />
        <Spacer />
        <RouteLink label="How to find selector?" to="/selector" />
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
