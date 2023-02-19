import { Heading } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import DragDrop from '../../components/DragDrop';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { calculateItemPosition } from '../../lib/position';

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
              items={page.groups}
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
