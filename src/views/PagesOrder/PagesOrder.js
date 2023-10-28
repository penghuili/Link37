import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Reorder from '../../shared/react-pure/Reorder';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function PagesOrder({ isLoading, isUpdating, pages, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Order pages" isLoading={isLoading || isUpdating} hasBack />
      <ContentWrapper>
        <Reorder
          items={pages}
          onReorder={({ itemId, newPosition, onSucceeded }) => {
            onUpdate({
              itemId,
              page: pages.find(p => p.sortKey === itemId),
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
