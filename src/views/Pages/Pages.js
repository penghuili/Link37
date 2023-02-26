import { Box, Text } from 'grommet';
import React from 'react';

import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../shared/react/RouteLink';

function Pages({ pages, isLoading, onFetch }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Pages" isLoading={isLoading} />
      <ContentWrapper>
        <RouteLink to="/p/add" label="Create page" margin="0 0 1rem" />

        <Divider />

        <Box margin="1rem 0 2rem" direction="row" wrap>
          {pages.map(page => (
            <Box key={page.sid} margin="0 1rem 1rem 0">
              <RouteLink to={`/p/${page.sid}`} label={page.title} />
            </Box>
          ))}
        </Box>

        {!pages?.length && !isLoading && (
          <>
            <Text margin="1rem 0 0">No pages yet.</Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Pages;
