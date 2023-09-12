import { Heading } from 'grommet';
import React from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Reorder from '../../shared/react-pure/Reorder';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function LinksOrder({ params: { pageId }, isLoading, group, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Order links" isLoading={isLoading} hasBack />
      <ContentWrapper>
        {!!group && (
          <>
            <Heading level="3" margin="0 0 1rem">
              {group.title}
            </Heading>
            <Reorder
              items={group.links}
              onReorder={({ itemId, newPosition, onSucceeded }) => {
                onUpdate({
                  pageId,
                  linkId: itemId,
                  position: newPosition,
                  onSucceeded,
                });
              }}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default LinksOrder;
