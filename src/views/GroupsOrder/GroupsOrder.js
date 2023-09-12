import { Heading } from 'grommet';
import React, { useMemo } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Reorder from '../../shared/react-pure/Reorder';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { noGroupLinksId } from '../../store/links/linksNetwork';

function GroupsOrder({ params: { pageId }, isLoading, page, onFetch, onUpdate }) {
  const groups = useMemo(
    () => (page?.groups || []).filter(g => g.sortKey !== noGroupLinksId),
    [page]
  );

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Order groups" isLoading={isLoading} hasBack />
      <ContentWrapper>
        {!!page && (
          <>
            <Heading level="3" margin="0 0 1rem">
              {page.title}
            </Heading>
            <Reorder
              items={groups}
              onReorder={({ itemId, newPosition, onSucceeded }) => {
                onUpdate({
                  pageId,
                  groupId: itemId,
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

export default GroupsOrder;
