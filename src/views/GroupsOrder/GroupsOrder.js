import { Heading } from 'grommet';
import React, { useMemo } from 'react';

import AppBar from '../../shared/react/AppBar';
import DragDrop from '../../components/DragDrop';
import { calculateItemPosition } from '../../shared/js/position';
import ContentWrapper from '../../shared/react/ContentWrapper';
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
            <DragDrop
              items={groups.filter(g => g.sortKey !== noGroupLinksId)}
              onDragEnd={(sourceId, targetId) => {
                const newPosition = calculateItemPosition(groups, sourceId, targetId);
                onUpdate({ pageId, groupId: sourceId, position: newPosition });
              }}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default GroupsOrder;
