import { Anchor, Box, Drop, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useRef, useState } from 'react';

import ExpiredBanner from '../../components/ExpiredBanner';
import PageAccess from '../../components/PageAccess';
import copyToClipboard from '../../lib/copyToClipboard';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import HorizontalCenter from '../../shared/react/HorizontalCenter';
import RouteLink from '../../shared/react/RouteLink';
import { noGroupLinksId } from '../../store/links/linksNetwork';

function Link({ pageId, link, isOwner, onToast, onDelete }) {
  const ref = useRef();
  const [showContext, setShowContext] = useState(false);

  return (
    <>
      <Anchor
        label={link.title}
        href={link.url}
        target="_blank"
        onContextMenu={e => {
          if (isOwner) {
            e.preventDefault();
            setShowContext(true);
          }
        }}
        margin="0 1rem 1rem 0"
        ref={ref}
      />
      {showContext && ref.current && (
        <Drop
          target={ref.current}
          align={{ top: 'bottom', left: 'right' }}
          onClickOutside={() => setShowContext(false)}
          pad="1rem"
        >
          <Anchor
            label="Copy link"
            onClick={() => {
              copyToClipboard(link.url);
              setShowContext(false);
              onToast('Link copied to clipboard.');
            }}
            margin="0.5rem 0"
          />

          <Anchor
            label="Open in new tab"
            onClick={() => {
              window.open(link.url, '_blank');
              setShowContext(false);
            }}
            margin="0.5rem 0"
          />

          <RouteLink label="Edit" to={`/p/${pageId}/links/${link.sortKey}`} margin="0.5rem 0" />

          <Anchor
            label="Delete"
            color="status-critical"
            onClick={() => onDelete(link.id, link.sortKey)}
            margin="0.5rem 0"
          />
        </Drop>
      )}
    </>
  );
}

function PageDetails({
  params: { pageId },
  page,
  fetchError,
  isLoading,
  isOwner,
  onFetch,
  onPublic,
  onPrivate,
  onDeleteLink,
  onDeleteGroup,
  onDeletePage,
  onNav,
  onToast,
}) {
  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Page details" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <ExpiredBanner />

        {!!fetchError && <Text size="large">{fetchError}</Text>}

        {isOwner && (
          <>
            <HorizontalCenter margin="0 0 1rem">
              <RouteLink to={`/p/${pageId}/links/add`} label="Create link" margin="0 1rem 0 0" />
              <RouteLink to={`/p/${pageId}/groups/add`} label="Create group" />
            </HorizontalCenter>

            <Divider />
          </>
        )}

        {!!page && (
          <>
            <HorizontalCenter margin="1rem 0">
              <Heading margin="0">{page.title}</Heading>
              {isOwner && (
                <Menu
                  icon={<MoreVertical />}
                  items={[
                    {
                      label: 'Update',
                      onClick: () => onNav(`/p/${pageId}/update`),
                      margin: '0.25rem 0',
                    },
                    {
                      label: 'Re-order groups',
                      onClick: () => onNav(`/p/${pageId}/groups/order`),
                      margin: '0.25rem 0',
                    },
                    page.isPublic
                      ? {
                          label: 'Make it private',
                          onClick: () => onPrivate(pageId),
                          margin: '0.25rem 0',
                        }
                      : {
                          label: 'Make it public',
                          onClick: () => onPublic(pageId),
                          margin: '0.25rem 0',
                        },
                    {
                      label: 'Delete',
                      onClick: () => onDeletePage(pageId),
                      margin: '0.25rem 0',
                      color: 'status-critical',
                    },
                  ]}
                />
              )}
              <PageAccess page={page} />
            </HorizontalCenter>

            {page.groups.map(group => (
              <Box key={group.sortKey}>
                <HorizontalCenter>
                  <Heading level="4" margin="0">
                    {group.title}
                  </Heading>

                  <Menu
                    icon={<MoreVertical />}
                    items={[
                      ...(isOwner
                        ? [
                            {
                              label: 'Add link',
                              onClick: () =>
                                onNav(`/p/${pageId}/links/add?groupId=${group.sortKey}`),
                              margin: '0.25rem 0',
                            },
                          ]
                        : []),
                      {
                        label: 'Open all links',
                        onClick: () => {
                          for (let i = 0; i < group.links.length; i += 1) {
                            window.open(group.links[i].url, '_blank');
                          }
                        },
                        margin: '0.25rem 0',
                      },
                      ...(group.sortKey !== noGroupLinksId && isOwner
                        ? [
                            {
                              label: 'Update',
                              onClick: () => onNav(`/p/${pageId}/groups/${group.sortKey}/update`),
                              margin: '0.25rem 0',
                            },
                          ]
                        : []),
                      ...(group.links.length > 1 && isOwner
                        ? [
                            {
                              label: 'Re-order',
                              onClick: () => onNav(`/p/${pageId}/groups/${group.sortKey}/order`),
                              margin: '0.25rem 0',
                            },
                          ]
                        : []),
                      ...(group.sortKey !== noGroupLinksId && isOwner
                        ? [
                            {
                              label: 'Delete',
                              onClick: () => onDeleteGroup(pageId, group.sortKey),
                              margin: '0.25rem 0',
                              color: 'status-critical',
                            },
                          ]
                        : []),
                    ]}
                  />
                </HorizontalCenter>

                {group.links.length ? (
                  <Box direction="row" wrap>
                    {group.links.map(link => (
                      <Link
                        key={link.sortKey}
                        pageId={pageId}
                        link={link}
                        isOwner={isOwner}
                        onToast={onToast}
                        onDelete={onDeleteLink}
                      />
                    ))}
                  </Box>
                ) : (
                  <Text margin="0 0 1rem">
                    No links yet.{' '}
                    {isOwner && (
                      <RouteLink
                        to={`/p/${pageId}/links/add?groupId=${group.sortKey}`}
                        label="Create link"
                        margin="0 1rem 0 0"
                      />
                    )}
                  </Text>
                )}
              </Box>
            ))}
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default PageDetails;
