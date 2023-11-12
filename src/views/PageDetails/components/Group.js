import { Box, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';
import { isMobile } from '../../../lib/browser';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import RouteLink from '../../../shared/react/RouteLink';
import { noGroupLinksId } from '../../../store/link/linkNetwork';
import Link from './Link';

function Group({
  pageId,
  page,
  group,
  showMenu,
  showClickedTimes,
  onDelete,
  onDeleteLink,
  onIncreaseLinkTimes,
  onToast,
  onNav,
}) {
  return (
    <Box>
      <HorizontalCenter>
        <Heading level="4" margin="0">
          {group.title}
        </Heading>

        {showMenu && (
          <Menu
            icon={<MoreVertical />}
            items={[
              {
                label: 'Add link',
                onClick: () => onNav(`/p/${pageId}/links/add?groupId=${group.sortKey}`),
                margin: '0.25rem 0',
              },
              ...(isMobile() || !group?.links?.length
                ? []
                : [
                    {
                      label: 'Open all links',
                      onClick: () => {
                        for (let i = 0; i < group.links.length; i += 1) {
                          window.open(group.links[i].url, '_blank');
                        }
                      },
                      margin: '0.25rem 0',
                    },
                  ]),
              ...(group.sortKey !== noGroupLinksId
                ? [
                    {
                      label: 'Update',
                      onClick: () => onNav(`/p/${pageId}/groups/${group.sortKey}/update`),
                      margin: '0.25rem 0',
                    },
                  ]
                : []),
              ...(group?.links?.length > 1 && !isMobile()
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
                      label: 'Delete group only',
                      onClick: () =>
                        onDelete({ id: pageId, itemId: group.sortKey, includeLinks: false }),
                      margin: '0.25rem 0',
                      color: 'status-critical',
                    },
                  ]
                : []),
              ...(group.sortKey !== noGroupLinksId
                ? [
                    {
                      label: 'Delete group and links',
                      onClick: () =>
                        onDelete({ id: pageId, itemId: group.sortKey, includeLinks: true }),
                      margin: '0.25rem 0',
                      color: 'status-critical',
                    },
                  ]
                : []),
            ]}
          />
        )}
      </HorizontalCenter>

      {group?.links?.length ? (
        <Box direction="row" wrap>
          {group.links.map(link => (
            <Link
              key={link.sortKey}
              pageId={pageId}
              page={page}
              link={link}
              showClickedTimes={showClickedTimes}
              onToast={onToast}
              onDelete={onDeleteLink}
              onIncreaseTimes={onIncreaseLinkTimes}
            />
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
  );
}

export default Group;
