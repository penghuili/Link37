import { Box, Text } from 'grommet';
import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import RouteLink from '../../shared/react/RouteLink';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function Pages({ pages, isLoading, isLoadingSettings, onFetch }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Pages" isLoading={isLoading || isLoadingSettings} />
      <ContentWrapper>
        <HorizontalCenter margin="0 0 1rem">
          <RouteLink to="/p/add" label="Create page" color="status-ok" margin="0 1rem 0 0" />
          {pages?.length > 1 && (
            <RouteLink to="/p/order" label="Re-order pages" color="status-ok" />
          )}
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
            <Text margin="0 0 1rem">No pages yet.</Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Pages;
