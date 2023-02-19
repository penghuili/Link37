import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import AreaField from '../../components/AreaField';
import ContentWrapper from '../../components/ContentWrapper';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';

function PageUpdate({ params: { pageId }, isLoading, page, onFetch, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(page?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(page?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Update page" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <AreaField label="Note" placeholder="Note" value={note} onChange={setNote} />

        <Spacer />
        <Button
          label="Update"
          onClick={() => {
            const body = {
              pageId,
              title,
              note,
            };
            onUpdate(body);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default PageUpdate;
