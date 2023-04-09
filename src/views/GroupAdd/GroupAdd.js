import { Button } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

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
