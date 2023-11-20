import React from 'react';
import ExpiredBanner from '../../components/ExpiredBanner';
import AppBar from '../../pico-components/AppBar';
import { Box } from '../../pico-components/Box';
import { Button } from '../../pico-components/Button';
import { RouteLink } from '../../pico-components/RouteLink';
import { Heading } from '../../pico-components/Typography';
import { apps } from '../../shared/js/apps';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function Pages({
  pages,
  isLoading,
  isAccountValid,
  tried,
  isLoadingSettings,
  isTrying,
  onFetch,
  onTry,
}) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Pages" isLoading={isLoading || isLoadingSettings || isTrying} />
      <ExpiredBanner />

      {isAccountValid && (
        <>
          <HorizontalCenter margin="0 0 1rem">
            <RouteLink to="/p/add" label="Create page" margin="0 1rem 0 0" />
            {pages?.length > 1 && <RouteLink to="/p/order" label="Re-order pages" />}
          </HorizontalCenter>
          <Divider />
          <Spacer />

          {!!pages?.length && (
            <Box direction="row" wrap>
              {pages.map(page => (
                <Box key={page.sid} margin="0 1rem 1rem 0">
                  <RouteLink to={`/p/${page.sid}`} label={page.title} />
                </Box>
              ))}
            </Box>
          )}

          {!pages?.length && !isLoading && (
            <>
              <p>No pages yet.</p>
            </>
          )}
        </>
      )}

      {!isAccountValid && !isLoadingSettings && !tried && (
        <>
          <Heading level="4" margin="1rem 0 0.5rem">
            Start 14 days of <b>free</b> trial to create your own pages.
          </Heading>
          <Button onClick={() => onTry(apps.link37.name)} disabled={isLoadingSettings || isTrying}>
            Start
          </Button>
          <Spacer />
          <p>
            Check pricing <RouteLink label="here" to="/pricing" />
          </p>
        </>
      )}
    </>
  );
}

export default Pages;
