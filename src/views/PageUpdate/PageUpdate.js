import { Button } from 'grommet';
import React, { useState } from 'react';

import AreaField from '../../shared/react-pure/AreaField';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

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
