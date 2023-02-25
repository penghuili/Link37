import { Heading } from 'grommet';
import React from 'react';

import DragDrop from '../../components/DragDrop';
import { calculateItemPosition } from '../../shared/js/position';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { noGroupLinksId } from '../../store/links/linksNetwork';

function GroupsOrder({ params: { pageId }, isLoading, page, onFetch, onUpdate }) {
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
              items={page.groups.filter(g => g.sortKey !== noGroupLinksId)}
              onDragEnd={(sourceId, targetId) => {
                const newPosition = calculateItemPosition(page.groups, sourceId, targetId);
                onUpdate({ pageId, linkId: sourceId, position: newPosition });
              }}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default GroupsOrder;
