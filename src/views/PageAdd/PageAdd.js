import { Button, RadioButtonGroup, Text } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import AreaField from '../../components/AreaField';
import ContentWrapper from '../../components/ContentWrapper';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { LAYOUT } from '../../lib/constants';

function PageAdd({ isLoading, onCreate }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [showIndex, setShowIndex] = useState('No');
  const [layout, setLayout] = useState('Inline');

  return (
    <>
      <AppBar title="Add page" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <AreaField label="Note" placeholder="Note" value={note} onChange={setNote} />

        <Spacer />
        <Text weight="bold">Show index</Text>
        <RadioButtonGroup
          id="showIndex"
          name="showIndex"
          options={['Yes', 'No']}
          value={showIndex}
          onChange={event => {
            setShowIndex(event.target.value);
          }}
        />

        <Spacer />
        <Text weight="bold">Links layout</Text>
        <RadioButtonGroup
          id="layout"
          name="layout"
          options={['Inline', 'List']}
          value={layout}
          onChange={event => {
            setLayout(event.target.value);
          }}
        />

        <Spacer />

        <Spacer />
        <Button
          label="Create page"
          onClick={() => {
            const boolValues = { Yes: true, No: false };
            const layoutValues = { Inline: LAYOUT.INLINE, List: LAYOUT.LIST };
            const layoutValue = layoutValues[layout];
            const body = {
              title,
              note,
              showIndex: boolValues[showIndex],
              layout: layoutValue,
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
