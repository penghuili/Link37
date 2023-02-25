import { Button } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { LAYOUT } from '../../lib/constants';
import AreaField from '../../shared/react/AreaField';
import ContentWrapper from '../../shared/react/ContentWrapper';

function PageAdd({ isLoading, onCreate }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      <AppBar title="Add page" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <AreaField label="Note" placeholder="Note" value={note} onChange={setNote} />

        <Spacer />
        <Button
          label="Create page"
          onClick={() => {
            const body = {
              title,
              note,
              showIndex: false,
              layout: LAYOUT.INLINE,
            };
            onCreate(body);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default PageAdd;
