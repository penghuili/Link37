import { Box, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';

import { isMobile } from '../../../lib/browser';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import RouteLink from '../../../shared/react/RouteLink';
import { noGroupLinksId } from '../../../store/links/linksNetwork';
import Link from './Link';

function Group({
  pageId,
  group,
  isOwner,
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
              ...(isOwner
                ? [
                    {
                      label: 'Add link',
                      onClick: () => onNav(`/p/${pageId}/links/add?groupId=${group.sortKey}`),
                      margin: '0.25rem 0',
                    },
                  ]
                : []),
              ...(isMobile()
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
              ...(group.sortKey !== noGroupLinksId && isOwner
                ? [
                    {
                      label: 'Update',
                      onClick: () => onNav(`/p/${pageId}/groups/${group.sortKey}/update`),
                      margin: '0.25rem 0',
                    },
                  ]
                : []),
              ...(group.links.length > 1 && isOwner && !isMobile()
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
                      label: 'Delete group only',
                      onClick: () => onDelete(pageId, group.sortKey, false),
                      margin: '0.25rem 0',
                      color: 'status-critical',
                    },
                  ]
                : []),
              ...(group.sortKey !== noGroupLinksId && isOwner
                ? [
                    {
                      label: 'Delete group and links',
                      onClick: () => onDelete(pageId, group.sortKey, true),
                      margin: '0.25rem 0',
                      color: 'status-critical',
                    },
                  ]
                : []),
            ]}
          />
        )}
      </HorizontalCenter>

      {group.links.length ? (
        <Box direction="row" wrap>
          {group.links.map(link => (
            <Link
              key={link.sortKey}
              pageId={pageId}
              link={link}
              isOwner={isOwner}
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
  );
}

export default Group;
