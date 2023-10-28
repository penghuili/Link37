import { Anchor, Avatar, Heading } from 'grommet';
import React from 'react';
import Examples from '../../components/Examples';
import Pitch from '../../components/Pitch';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import ChangeTheme from '../../shared/react/ChangeTheme';
import RouteLink from '../../shared/react/RouteLink';
import { privacyUrl, termsUrl } from '../../shared/react/initShared';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0 1rem">
          <Avatar src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/link37-logo-231017.png`} />{' '}
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
          href="https://encrypt37.com/encryption"
          target="_blank"
        />
        <Spacer />
        <RouteLink label="Pricing" to="/pricing" />
        <Spacer />
        <Anchor label="Privacy" href={privacyUrl} target="_blank" />
        <Spacer />
        <Anchor label="Terms" href={termsUrl} target="_blank" />
        <Spacer />
        <Anchor label="Contact" href="https://encrypt37.com/contact" target="_blank" />

        <Spacer />
        <Divider />
        <Spacer />

        <ChangeTheme />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
