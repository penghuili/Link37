import React, { useEffect, useMemo, useState } from 'react';
import GroupSelector from '../../components/GroupSelector';
import { Button } from '../../pico-components/Button';
import { Img } from '../../pico-components/Img';
import AreaField from '../../shared/react-pure/AreaField';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

function LinkUpdate({
  pageId,
  linkId,
  page,
  link,
  getLinkMeta,
  isLoadingPage,
  isUpdating,
  onFetch,
  onFetchLinkMeta,
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

  const linkMeta = useMemo(() => {
    return getLinkMeta(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  useEffect(() => {
    if (link?.url) {
      onFetchLinkMeta({ link: link.url });
    }
  }, [link?.url, onFetchLinkMeta]);

  const iconElement = useMemo(() => {
    if (linkMeta?.iconLink) {
      return <Img src={linkMeta.iconLink} width="24px" height="24px" margin="0 0 1rem" />;
    }

    if (link?.iconLink) {
      return <Img src={link.iconLink} width="24px" height="24px" margin="0 0 1rem" />;
    }

    return null;
  }, [linkMeta?.iconLink, link?.iconLink]);

  return (
    <>
      <AppBar title="Update link" isLoading={isLoadingPage || isUpdating} hasBack />
      <ContentWrapper>
        {iconElement}

        <AreaField label="Link" placeholder="Link" value={url} onChange={setUrl} />

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
        />

        <Spacer />
        <GroupSelector groupId={groupId} onChange={setGroupId} />

        <Spacer />
        <Button
          onClick={() => {
            const body = {
              id: pageId,
              page,
              itemId: linkId,
              title,
              url,
              note,
              groupId,
              iconLink: linkMeta?.iconLink,
              goBack: true,
            };
            onUpdate(body);
          }}
          disabled={!title || !url || isUpdating}
        >
          Update
        </Button>
      </ContentWrapper>
    </>
  );
}

export default LinkUpdate;
