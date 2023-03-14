import React from 'react';

import DragDrop from '../../components/DragDrop';
import { calculateItemPosition } from '../../shared/js/position';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function PagesOrder({ isLoading, pages, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Order pages" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <DragDrop
          items={pages}
          onDragEnd={(sourceId, targetId) => {
            const newPosition = calculateItemPosition(pages, sourceId, targetId);
            onUpdate({ pageId: sourceId, position: newPosition });
          }}
        />
      </ContentWrapper>
    </>
  );
}

export default PagesOrder;
