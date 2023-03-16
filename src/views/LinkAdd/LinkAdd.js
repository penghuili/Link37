import { Button, Image } from 'grommet';
import React, { useEffect, useState } from 'react';

import GroupSelector from '../../components/GroupSelector';
import AppBar from '../../shared/react/AppBar';
import AreaField from '../../shared/react/AreaField';
import ContentWrapper from '../../shared/react/ContentWrapper';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import InputField from '../../shared/react/InputField';
import { getQueryParams } from '../../shared/react/routeHelpers';
import Spacer from '../../shared/react/Spacer';

function LinkAdd({ params: { pageId }, isLoading, meta, onFetch, onFetchLinkMeta, onCreate }) {
  const { groupId: groupIdInQuery } = getQueryParams();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [groupId, setGroupId] = useState(groupIdInQuery || '');

  useEffectOnce(() => {
    onFetch(pageId);
  });

  useEffect(() => {
    if (url) {
      onFetchLinkMeta(url);
    }
  }, [url, onFetchLinkMeta]);

  useEffect(() => {
    if (meta) {
      if (!title && meta.title) {
        setTitle(meta.title);
      }

      if (!note && meta.description) {
        setNote(meta.description);
      }
    }
  }, [title, note, meta]);

  return (
    <>
      <AppBar title="Add link" isLoading={isLoading} hasBack />
      <ContentWrapper>
        {!!meta?.iconLink && (
          <Image src={meta.iconLink} width="24px" height="24px" margin="0 0 1rem" />
        )}

        <AreaField label="Link" placeholder="Link" value={url} onChange={setUrl} />
        <Spacer />
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />
        <Spacer />
        <AreaField label="Note" placeholder="Note" value={note} onChange={setNote} />
        <Spacer />
        <GroupSelector pageId={pageId} groupId={groupIdInQuery} onChange={setGroupId} />
        <Spacer />
        <Button
          label="Create link"
          onClick={() => {
            const body = {
              pageId,
              title,
              url,
              note,
              groupId,
              iconLink: meta?.iconLink,
            };
            onCreate(body);
          }}
          disabled={!title || !url || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default LinkAdd;
