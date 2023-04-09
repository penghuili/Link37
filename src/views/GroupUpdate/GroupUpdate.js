import { Button } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

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
