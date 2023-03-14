import { Box, Button, Heading, Text } from 'grommet';
import React from 'react';
import Examples from '../../components/Examples';

import ExpiredBanner from '../../components/ExpiredBanner';
import apps from '../../shared/js/apps';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../shared/react/RouteLink';
import Spacer from '../../shared/react/Spacer';

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
      <AppBar title="Pages" isLoading={isLoading} />
      <ContentWrapper>
        <ExpiredBanner />

        {isAccountValid && (
          <>
            <RouteLink to="/p/add" label="Create page" color="status-ok" margin="0 0 1rem" />
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
                <Text margin="0 0 1rem">No pages yet.</Text>
                <Examples />
              </>
            )}
          </>
        )}

        {!isAccountValid && !isLoadingSettings && !tried && (
          <>
            <Examples />
            <Heading level="4" margin="1rem 0 0.5rem">
              Start 14 days of <Text color="status-ok">free</Text> trial to create your own pages.
            </Heading>
            <Button
              label="Start"
              onClick={() => onTry(apps.link37.name)}
              disabled={isLoadingSettings || isTrying}
            />
            <Text margin="1rem 0 0">
              Check pricing <RouteLink label="here" to="/pricing" />
            </Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Pages;
