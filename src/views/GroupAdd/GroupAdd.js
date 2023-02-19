import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';

function GroupAdd({ params: { pageId }, isLoading, onCreate }) {
  const [title, setTitle] = useState('');

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
