import { Anchor, Drop, Text } from 'grommet';
import React, { useRef, useState } from 'react';

import copyToClipboard from '../../../lib/copyToClipboard';
import RouteLink from '../../../shared/react/RouteLink';

function Link({ pageId, link, isOwner, showClickedTimes, onToast, onDelete, onIncreaseTimes }) {
  const ref = useRef();
  const [showContext, setShowContext] = useState(false);

  return (
    <>
      <Anchor
        label={
          showClickedTimes ? (
            <Text>
              {link.title}
              <Text size="xsmall">({link.times || 0})</Text>
            </Text>
          ) : (
            link.title
          )
        }
        href={link.url}
        target="_blank"
        onClick={() => {
          if (isOwner) {
            onIncreaseTimes({
              pageId,
              linkId: link.sortKey,
            });
          }
        }}
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

export default Link;
