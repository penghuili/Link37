import React, { useState } from 'react';
import { Button } from '../../pico-components/Button';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function GroupAdd({ pageId, page, isLoadingPage, isCreating, onFetch, onCreate }) {
  const [title, setTitle] = useState('');

  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  return (
    <>
      <AppBar title="Add group" hasBack isLoading={isLoadingPage || isCreating} />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <Button
          onClick={() => {
            onCreate({
              id: pageId,
              page,
              title,
              goBack: true,
            });
          }}
          disabled={!page || !title || isCreating}
        >
          Create group
        </Button>
      </ContentWrapper>
    </>
  );
}

export default GroupAdd;
