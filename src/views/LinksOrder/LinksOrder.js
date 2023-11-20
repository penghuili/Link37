import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Reorder from '../../shared/react-pure/Reorder';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function LinksOrder({ pageId, page, group, isLoadingPage, isUpdating, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  return (
    <>
      <AppBar title="Order links" isLoading={isLoadingPage || isUpdating} hasBack />
      <ContentWrapper>
        {!!group && (
          <>
            <h1>
              {group.title}
            </h1>
            <Reorder
              items={group.links}
              onReorder={({ itemId, newPosition, onSucceeded }) => {
                onUpdate({
                  id: pageId,
                  page,
                  itemId,
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
