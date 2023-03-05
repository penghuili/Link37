import { Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';

import ExpiredBanner from '../../components/ExpiredBanner';
import PageAccess from '../../components/PageAccess';
import { isMobile } from '../../lib/browser';
import AppBar from '../../shared/react/AppBar';
import ContentWrapper from '../../shared/react/ContentWrapper';
import Divider from '../../shared/react/Divider';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import HorizontalCenter from '../../shared/react/HorizontalCenter';
import RouteLink from '../../shared/react/RouteLink';
import Group from './components/Group';

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
  onUpdateLink,
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
                    ...(isMobile()
                      ? []
                      : [
                          {
                            label: 'Re-order groups',
                            onClick: () => onNav(`/p/${pageId}/groups/order`),
                            margin: '0.25rem 0',
                          },
                        ]),
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

            {!!page.popular?.length && (
              <Group
                pageId={pageId}
                group={{ title: 'Popular 🔥', links: page.popular }}
                isOwner={isOwner}
                onDelete={onDeleteGroup}
                onDeleteLink={onDeleteLink}
                onUpdateLink={onUpdateLink}
                onToast={onToast}
                onNav={onNav}
              />
            )}

            {page.groups.map(group => (
              <Group
                key={group.sortKey}
                pageId={pageId}
                group={group}
                showMenu
                isOwner={isOwner}
                onDelete={onDeleteGroup}
                onDeleteLink={onDeleteLink}
                onUpdateLink={onUpdateLink}
                onToast={onToast}
                onNav={onNav}
              />
            ))}
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default PageDetails;
