import { Heading } from 'grommet';
import React from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import DragDrop from '../../components/DragDrop';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { calculateItemPosition } from '../../lib/position';

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
            <DragDrop
              items={group.links}
              onDragEnd={(sourceId, targetId) => {
                const newPosition = calculateItemPosition(group.links, sourceId, targetId);
                onUpdate({ pageId, linkId: sourceId, position: newPosition });
              }}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default LinksOrder;
