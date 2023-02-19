import { Anchor, Box, Drop, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useRef, useState } from 'react';

import AppBar from '../../components/AppBar';
import ContentWrapper from '../../components/ContentWrapper';
import Divider from '../../components/Divider';
import HorizontalCenter from '../../components/HorizontalCenter';
import RouteLink from '../../components/RouteLink';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { noGroupLinksId } from '../../store/links/linksNetwork';

function Link({ link, onDelete }) {
  const ref = useRef();
  const [showContext, setShowContext] = useState(false);

  return (
    <>
      <Anchor
        label={link.title}
        href={link.url}
        target="_blank"
        onContextMenu={e => {
          e.preventDefault();
          setShowContext(true);
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
          <RouteLink label="Edit" to={`/p/${link.id}/links/${link.sortKey}`} margin="0.5rem 0" />

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
  isLoading,
  onFetch,
  onDeleteLink,
  onDeleteGroup,
  onDeletePage,
  onNav,
}) {
  useEffectOnce(() => {
    onFetch(pageId);
  });

  return (
    <>
      <AppBar title="Page details" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <HorizontalCenter margin="0 0 1rem">
          <RouteLink to={`/p/${pageId}/links/add`} label="Create link" margin="0 1rem 0 0" />
          <RouteLink to={`/p/${pageId}/groups/add`} label="Create group" />
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
                  {
                    label: 'Re-order groups',
                    onClick: () => onNav(`/p/${pageId}/groups/order`),
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
                      {
                        label: 'Add link',
                        onClick: () => onNav(`/p/${pageId}/links/add?groupId=${group.sortKey}`),
                        margin: '0.25rem 0',
                      },
                      ...(group.sortKey !== noGroupLinksId
                        ? [
                            {
                              label: 'Update',
                              onClick: () => onNav(`/p/${pageId}/groups/${group.sortKey}/update`),
                              margin: '0.25rem 0',
                            },
                          ]
                        : []),
                      ...(group.links.length > 1
                        ? [
                            {
                              label: 'Re-order',
                              onClick: () => onNav(`/p/${pageId}/groups/${group.sortKey}/order`),
                              margin: '0.25rem 0',
                            },
                          ]
                        : []),
                      ...(group.sortKey !== noGroupLinksId
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
                      <Link key={link.sortKey} link={link} onDelete={onDeleteLink} />
                    ))}
                  </Box>
                ) : (
                  <Text margin="0 0 1rem">
                    No links yet.{' '}
                    <RouteLink
                      to={`/p/${pageId}/links/add?groupId=${group.sortKey}`}
                      label="Create link"
                      margin="0 1rem 0 0"
                    />
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
