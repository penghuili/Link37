import React, { useState } from 'react';
import { Button } from '../../pico-components/Button';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

function GroupUpdate({
  pageId,
  groupId,
  page,
  isLoadingPage,
  isUpdating,
  group,
  onFetch,
  onUpdate,
}) {
  const [title, setTitle] = useState('');
  useListener(group?.title, value => setTitle(value || ''));

  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  return (
    <>
      <AppBar title="Update group" isLoading={isLoadingPage || isUpdating} hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <Button
          onClick={() => {
            onUpdate({
              id: pageId,
              page,
              itemId: groupId,
              title,
              goBack: true,
            });
          }}
          disabled={!title || isUpdating}
        >
          Update
        </Button>
      </ContentWrapper>
    </>
  );
}

export default GroupUpdate;
