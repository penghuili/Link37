import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import GroupSelector from '../../components/GroupSelector';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';
import AreaField from '../../shared/react/AreaField';
import ContentWrapper from '../../shared/react/ContentWrapper';

function LinkUpdate({ params: { pageId, linkId }, link, isLoading, onFetch, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(link?.title, value => setTitle(value || ''));
  const [url, setUrl] = useState('');
  useListener(link?.url, value => setUrl(value || ''));
  const [note, setNote] = useState('');
  useListener(link?.note, value => setNote(value || ''));
  const [groupId, setGroupId] = useState('');
  useListener(link?.groupId, value => setGroupId(value || ''));

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Update link" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <InputField
          label="Title"
          placeholder="Title"
          value={title}
          onChange={setTitle}
          disabled={isLoading}
        />

        <Spacer />
        <AreaField
          label="Link"
          placeholder="Link"
          value={url}
          onChange={setUrl}
          disabled={isLoading}
        />

        <Spacer />
        <AreaField
          label="Note"
          placeholder="Note"
          value={note}
          onChange={setNote}
          disabled={isLoading}
        />

        <Spacer />
        <GroupSelector
          pageId={pageId}
          groupId={groupId}
          onChange={setGroupId}
          disabled={isLoading}
        />

        <Spacer />
        <Button
          label="Update"
          onClick={() => {
            const body = {
              pageId,
              linkId,
              title,
              url,
              note,
              groupId,
            };
            onUpdate(body);
          }}
          disabled={!title || !url || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default LinkUpdate;
