import { Button, Image } from 'grommet';
import React, { useEffect, useMemo, useState } from 'react';

import GroupSelector from '../../components/GroupSelector';
import AppBar from '../../shared/react/AppBar';
import AreaField from '../../shared/react/AreaField';
import ContentWrapper from '../../shared/react/ContentWrapper';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import InputField from '../../shared/react/InputField';
import Spacer from '../../shared/react/Spacer';

function LinkUpdate({
  params: { pageId, linkId },
  link,
  isLoading,
  meta,
  onFetch,
  onFetchLinkMeta,
  onClearMeta,
  onUpdate,
}) {
  const [url, setUrl] = useState('');
  useListener(link?.url, value => setUrl(value || ''));

  const [title, setTitle] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  useListener(link?.title, value => {
    setTitle(value || '');
  });

  const [note, setNote] = useState('');
  const [isNoteTouched, setIsNoteTouched] = useState(false);
  useListener(link?.note, value => {
    setNote(value || '');
  });

  const [groupId, setGroupId] = useState('');
  useListener(link?.groupId, value => setGroupId(value || ''));

  useEffectOnce(() => {
    onFetch(pageId);

    return onClearMeta;
  });

  useEffect(() => {
    if (link?.url) {
      onFetchLinkMeta(link.url);
    }
  }, [link?.url, onFetchLinkMeta]);

  const iconElement = useMemo(() => {
    if (meta?.iconLink) {
      return <Image src={meta.iconLink} width="24px" height="24px" margin="0 0 1rem" />;
    }

    if (link?.iconLink) {
      return <Image src={link.iconLink} width="24px" height="24px" margin="0 0 1rem" />;
    }

    return null;
  }, [meta?.iconLink, link?.iconLink]);

  return (
    <>
      <AppBar title="Update link" isLoading={isLoading} hasBack />
      <ContentWrapper>
        {iconElement}

        <AreaField
          label="Link"
          placeholder="Link"
          value={url}
          onChange={setUrl}
          disabled={isLoading}
        />

        <Spacer />
        <InputField
          label="Title"
          placeholder="Title"
          value={title}
          onChange={value => {
            setTitle(value);
            if (!isTitleTouched) {
              setIsTitleTouched(true);
            }
          }}
          disabled={isLoading}
        />

        <Spacer />
        <AreaField
          label="Note"
          placeholder="Note"
          value={note}
          onChange={value => {
            setNote(value);
            if (!isNoteTouched) {
              setIsNoteTouched(true);
            }
          }}
          disabled={isLoading}
        />

        <Spacer />
        <GroupSelector
          pageId={pageId}
          groupId={groupId}
          onChange={setGroupId}
          disabled={isLoading}
        />

        <Spacer />
        <Button
          label="Update"
          onClick={() => {
            const body = {
              pageId,
              linkId,
              title,
              url,
              note,
              groupId,
              iconLink: meta?.iconLink,
            };
            onUpdate(body);
          }}
          disabled={!title || !url || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default LinkUpdate;
