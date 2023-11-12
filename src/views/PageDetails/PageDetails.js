import { Box, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';
import ExpiredBanner from '../../components/ExpiredBanner';
import { isMobile } from '../../lib/browser';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import AppBar from '../../shared/react/AppBar';
import RouteLink from '../../shared/react/RouteLink';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import Group from './components/Group';

function PageDetails({
  pageId,
  page,
  fetchError,
  isLoading,
  isPublicing,
  isPrivating,
  isDeleting,
  isDeletingGroup,
  isDeletingLink,
  isIncreasingLinkTimes,
  onFetch,
  onDeleteLink,
  onDeleteGroup,
  onDeletePage,
  onIncreaseLinkTimes,
  onNav,
  onToast,
}) {
  useEffectOnce(() => {
    onFetch({ itemId: pageId });
  });

  return (
    <>
      <AppBar
        title="Page details"
        isLoading={
          isLoading ||
          isPublicing ||
          isPrivating ||
          isDeleting ||
          isDeletingGroup ||
          isDeletingLink ||
          isIncreasingLinkTimes
        }
        hasBack
      />
      <ContentWrapper>
        <ExpiredBanner />

        {!!fetchError && <Text size="large">{fetchError}</Text>}

        <HorizontalCenter margin="0 0 1rem">
          <RouteLink
            to={`/p/${pageId}/links/add`}
            label="Create link"
            color="status-ok"
            margin="0 1rem 0 0"
          />
          <RouteLink to={`/p/${pageId}/groups/add`} label="Create group" color="status-ok" />
        </HorizontalCenter>

        <Divider />

        {!!page && (
          <>
            <HorizontalCenter margin="1rem 0">
              <Heading margin="0">{page.title}</Heading>
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
                  {
                    label: 'Delete',
                    onClick: () => onDeletePage({ itemId: pageId, goBack: true }),
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
            </HorizontalCenter>

            {page.popular?.length > 1 && (
              <Box
                border={{ color: 'status-ok' }}
                round="xsmall"
                pad="1rem 1rem 0"
                margin="0 0 1.5rem"
              >
                <Group
                  pageId={pageId}
                  page={page}
                  group={{ title: `Top ${page.popular.length} links 🔥`, links: page.popular }}
                  showClickedTimes
                  onDelete={onDeleteGroup}
                  onDeleteLink={onDeleteLink}
                  onIncreaseLinkTimes={onIncreaseLinkTimes}
                  onToast={onToast}
                  onNav={onNav}
                />
              </Box>
            )}

            {page.groups.map(group => (
              <Group
                key={group.sortKey}
                pageId={pageId}
                page={page}
                group={group}
                showMenu
                onDelete={onDeleteGroup}
                onDeleteLink={onDeleteLink}
                onIncreaseLinkTimes={onIncreaseLinkTimes}
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
