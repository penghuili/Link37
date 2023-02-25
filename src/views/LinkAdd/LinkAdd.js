import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import GroupSelector from '../../components/GroupSelector';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import AreaField from '../../shared/react/AreaField';
import ContentWrapper from '../../shared/react/ContentWrapper';
import { getQueryParams } from '../../shared/react/routeHelpers';

function LinkAdd({ params: { pageId }, isLoading, onFetch, onCreate }) {
  const { groupId: groupIdInQuery } = getQueryParams();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [groupId, setGroupId] = useState(groupIdInQuery || '');

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Add link" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <AreaField label="Link" placeholder="Link" value={url} onChange={setUrl} />

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
