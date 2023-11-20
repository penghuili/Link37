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
import { getQueryParams } from '../../shared/react/routeHelpers';

function LinkAdd({
  pageId,
  page,
  getLinkMeta,
  isLoadingPage,
  isCreating,
  onFetch,
  onFetchLinkMeta,
  onCreate,
}) {
  const { groupId: groupIdInQuery } = getQueryParams();
  const [url, setUrl] = useState('');

  const [title, setTitle] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);

  const [note, setNote] = useState('');
  const [isNoteTouched, setIsNoteTouched] = useState(false);

  const [groupId, setGroupId] = useState(groupIdInQuery || '');

  const linkMeta = useMemo(() => {
    return getLinkMeta(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  useEffect(() => {
    if (url) {
      onFetchLinkMeta({ link: url });
    }
  }, [url, onFetchLinkMeta]);

  useEffect(() => {
    if (linkMeta) {
      if (!isTitleTouched && linkMeta.title) {
        setTitle(linkMeta.title);
        setIsTitleTouched(true);
      }

      if (!isNoteTouched && linkMeta.description) {
        setNote(linkMeta.description);
        setIsNoteTouched(true);
      }
    }
  }, [isTitleTouched, isNoteTouched, linkMeta]);

  return (
    <>
      <AppBar title="Add link" isLoading={isLoadingPage || isCreating} hasBack />
      <ContentWrapper>
        {!!linkMeta?.iconLink && (
          <Img src={linkMeta.iconLink} width="24px" height="24px" margin="0 0 1rem" />
        )}

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
        <GroupSelector groupId={groupIdInQuery} onChange={setGroupId} />
        <Spacer />
        <Button
          onClick={() => {
            onCreate({
              id: pageId,
              page,
              title,
              url,
              note,
              groupId,
              iconLink: linkMeta?.iconLink,
              goBack: true,
            });
          }}
          disabled={!title || !url || isCreating}
        >
          Create link
        </Button>
      </ContentWrapper>
    </>
  );
}

export default LinkAdd;
