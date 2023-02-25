import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import InputField from '../../shared/react/InputField';
import Spacer from '../../shared/react/Spacer';

function GroupAdd({ params: { pageId }, isLoading, onFetch, onCreate }) {
  const [title, setTitle] = useState('');

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Add group" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <Button
          label="Create group"
          onClick={() => {
            const body = {
              pageId,
              title,
            };
            onCreate(body);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default GroupAdd;
