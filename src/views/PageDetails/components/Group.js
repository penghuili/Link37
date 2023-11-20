import React from 'react';
import { isMobile } from '../../../lib/browser';
import { Box } from '../../../pico-components/Box';
import { Href } from '../../../pico-components/Href';
import { Menu } from '../../../pico-components/Menu';
import { RouteLink } from '../../../pico-components/RouteLink';
import { Heading } from '../../../pico-components/Typography';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
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
      <HorizontalCenter margin="0 0 0.5rem">
        <Heading level="4" margin="0">
          {group.title}
        </Heading>

        {showMenu && (
          <Menu>
            <Href
              label="Add link"
              onClick={e => {
                e.preventDefault();
                onNav(`/p/${pageId}/links/add?groupId=${group.sortKey}`);
              }}
              margin="0.5rem 0"
            />

            {!isMobile() && !!group?.links?.length && (
              <Href
                label="Open all links"
                onClick={e => {
                  e.preventDefault();
                  for (let i = 0; i < group.links.length; i += 1) {
                    window.open(group.links[i].url, '_blank');
                  }
                }}
                margin="0.5rem 0"
              />
            )}

            {group.sortKey !== noGroupLinksId && (
              <Href
                label="Update"
                onClick={e => {
                  e.preventDefault();
                  onNav(`/p/${pageId}/groups/${group.sortKey}/update`);
                }}
                margin="0.5rem 0"
              />
            )}

            {group?.links?.length > 1 && (
              <Href
                label="Re-order"
                onClick={e => {
                  e.preventDefault();
                  onNav(`/p/${pageId}/groups/${group.sortKey}/order`);
                }}
                margin="0.5rem 0"
              />
            )}

            {group.sortKey !== noGroupLinksId && (
              <Href
                label="Delete group only"
                onClick={e => {
                  e.preventDefault();
                  onDelete({ id: pageId, itemId: group.sortKey, includeLinks: false });
                }}
                margin="0.5rem 0"
              />
            )}

            {group.sortKey !== noGroupLinksId && (
              <Href
                label="Delete group and links"
                onClick={e => {
                  e.preventDefault();
                  onDelete({ id: pageId, itemId: group.sortKey, includeLinks: true });
                }}
                margin="0.5rem 0"
              />
            )}
          </Menu>
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
        <p>
          No links yet.{' '}
          <RouteLink
            to={`/p/${pageId}/links/add?groupId=${group.sortKey}`}
            label="Create link"
            margin="0 1rem 0 0"
          />
        </p>
      )}
    </Box>
  );
}

export default Group;
