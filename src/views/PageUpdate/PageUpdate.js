import { Button } from 'grommet';
import React, { useState } from 'react';
import AreaField from '../../shared/react-pure/AreaField';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

function PageUpdate({ pageId, isLoading, isUpdating, page, onFetch, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(page?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(page?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  return (
    <>
      <AppBar title="Update page" isLoading={isLoading || isUpdating} hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <AreaField label="Note" placeholder="Note" value={note} onChange={setNote} />

        <Spacer />
        <Button
          label="Update"
          onClick={() => {
            onUpdate({
              itemId: pageId,
              page,
              title,
              note,
              goBack: true,
            });
          }}
          disabled={!title || isUpdating}
        />
      </ContentWrapper>
    </>
  );
}

export default PageUpdate;
