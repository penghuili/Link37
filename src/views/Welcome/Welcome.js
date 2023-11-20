import React from 'react';
import Pitch from '../../components/Pitch';
import { Href } from '../../pico-components/Href';
import { Img } from '../../pico-components/Img';
import { RouteLink } from '../../pico-components/RouteLink';
import { Heading } from '../../pico-components/Typography';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import ChangeTheme from '../../shared/react/ChangeTheme';
import { privacyUrl, termsUrl } from '../../shared/react/initShared';

function Welcome() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0 1rem">
          <Img
            src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/link37-logo-231017.png`}
            width="56px"
            height="56px"
          />
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

        <Href label="How encryption works?" href="https://encrypt37.com/encryption" />
        <Spacer />
        <RouteLink label="Pricing" to="/pricing" />
        <Spacer />
        <Href label="Source code" href="https://github.com/penghuili/Link37" />
        <Spacer />
        <Href label="Privacy" href={privacyUrl} />
        <Spacer />
        <Href label="Terms" href={termsUrl} />
        <Spacer />
        <Href label="Contact" href="https://encrypt37.com/contact" />

        <Spacer />
        <Divider />
        <Spacer />

        <ChangeTheme />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
