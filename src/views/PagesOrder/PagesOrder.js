import React from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Reorder from '../../shared/react-pure/Reorder';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function PagesOrder({ isLoading, pages, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Order pages" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <Reorder
          items={pages}
          onReorder={({ itemId, newPosition, onSucceeded }) => {
            onUpdate({
              pageId: itemId,
              position: newPosition,
              onSucceeded,
            });
          }}
        />
      </ContentWrapper>
    </>
  );
}

export default PagesOrder;
