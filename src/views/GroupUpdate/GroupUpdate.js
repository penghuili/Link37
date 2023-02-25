import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';
import ContentWrapper from '../../shared/react/ContentWrapper';

function GroupUpdate({ params: { pageId, groupId }, isLoading, group, onFetch, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(group?.title, value => setTitle(value || ''));

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Update group" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <Button
          label="Update"
          onClick={() => {
            const body = {
              pageId,
              groupId,
              title,
              goBack: true,
            };
            onUpdate(body);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default GroupUpdate;
