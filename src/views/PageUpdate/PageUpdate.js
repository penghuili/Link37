import { Button, RadioButtonGroup, Text } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import AreaField from '../../components/AreaField';
import ContentWrapper from '../../components/ContentWrapper';
import InputField from '../../components/InputField';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useListener } from '../../hooks/useListener';
import { LAYOUT } from '../../lib/constants';

function PageUpdate({ params: { pageId }, isLoading, page, onFetch, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(page?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(page?.note, value => setNote(value || ''));
  const [showIndex, setShowIndex] = useState('No');
  useListener(page?.showIndex, value => setShowIndex(value ? 'Yes' : 'No'));
  const [layout, setLayout] = useState('Inline');
  useListener(page?.layout, value => setLayout(value === LAYOUT.LIST ? 'List' : 'Inline'));

  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Update page" isLoading={isLoading} hasBack />
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
          label="Update"
          onClick={() => {
            const boolValues = { Yes: true, No: false };
            const layoutValues = { Inline: LAYOUT.INLINE, List: LAYOUT.LIST };
            const layoutValue = layoutValues[layout];
            const body = {
              pageId,
              title,
              note,
              showIndex: boolValues[showIndex],
              layout: layoutValue,
            };
            onUpdate(body);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default PageUpdate;
