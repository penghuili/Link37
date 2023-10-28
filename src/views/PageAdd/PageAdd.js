import { Button } from 'grommet';
import React, { useState } from 'react';
import { LAYOUT } from '../../lib/constants';
import AreaField from '../../shared/react-pure/AreaField';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';

function PageAdd({ isCreating, onCreate }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      <AppBar title="Add page" hasBack isLoading={isCreating} />
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
              showNote: false,
              goBack: true,
            };
            onCreate(body);
          }}
          disabled={!title || isCreating}
        />
      </ContentWrapper>
    </>
  );
}

export default PageAdd;
