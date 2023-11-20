import React from 'react';
import ExpiredBanner from '../../components/ExpiredBanner';
import { Box } from '../../pico-components/Box';
import { Href } from '../../pico-components/Href';
import { Menu } from '../../pico-components/Menu';
import { RouteLink } from '../../pico-components/RouteLink';
import { Heading } from '../../pico-components/Typography';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import AppBar from '../../shared/react/AppBar';
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

        {!!fetchError && <p>{fetchError}</p>}

        <HorizontalCenter margin="0 0 1rem">
          <RouteLink to={`/p/${pageId}/links/add`} label="Create link" margin="0 1rem 0 0" />
          <RouteLink to={`/p/${pageId}/groups/add`} label="Create group" />
        </HorizontalCenter>

        <Divider />

        {!!page && (
          <>
            <HorizontalCenter margin="1rem 0">
              <Heading margin="0">{page.title}</Heading>
              <Menu>
                <Href
                  label="Update"
                  onClick={e => {
                    e.preventDefault();
                    onNav(`/p/${pageId}/update`);
                  }}
                  margin="0.5rem 0"
                />

                <Href
                  label="Re-order groups"
                  onClick={e => {
                    e.preventDefault();
                    onNav(`/p/${pageId}/groups/order`);
                  }}
                  margin="0.5rem 0"
                />

                <Href
                  label="Delete"
                  onClick={e => {
                    e.preventDefault();
                    onDeletePage({ itemId: pageId, goBack: true });
                  }}
                  margin="0.5rem 0"
                />
              </Menu>
            </HorizontalCenter>

            {page.popular?.length > 1 && (
              <Box border="success" borderRadius pad="1rem 1rem 0" margin="0 0 1.5rem">
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
