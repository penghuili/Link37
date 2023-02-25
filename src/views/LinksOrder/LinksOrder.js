import { Heading } from 'grommet';
import React from 'react';

import DragDrop from '../../components/DragDrop';
import { calculateItemPosition } from '../../shared/js/position';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
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
