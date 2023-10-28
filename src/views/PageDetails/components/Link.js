import { Anchor, Box, Drop, Image, Text } from 'grommet';
import { Info } from 'grommet-icons';
import React, { useRef, useState } from 'react';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import Modal from '../../../shared/react-pure/Modal';
import RouteLink from '../../../shared/react/RouteLink';
import copyToClipboard from '../../../shared/react/copyToClipboard';

function Link({ pageId, page, link, showClickedTimes, onToast, onDelete, onIncreaseTimes }) {
  const ref = useRef();
  const [showContext, setShowContext] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HorizontalCenter margin="0 1.5rem 1rem 0">
        {!!link.iconLink && (
          <Image src={link.iconLink} width="18px" height="18px" margin="0 0.25rem 0 0" />
        )}
        <Anchor
          label={
            showClickedTimes ? (
              <Text>
                {link.title}
                <Text size="xsmall">({link.times || 0})</Text>{' '}
              </Text>
            ) : (
              <>{link.title} </>
            )
          }
          href={link.url}
          target="_blank"
          onClick={() => {
            onIncreaseTimes({
              pageId,
              linkId: link.sortKey,
              page,
            });
          }}
          onContextMenu={e => {
            e.preventDefault();
            setShowContext(true);
          }}
          ref={ref}
        />

        {!showClickedTimes && !!link.note && (
          <>
            <Box width="0.25rem" />
            <Info
              onClick={() => {
                setShowModal(true);
              }}
              size="12px"
            />
          </>
        )}
      </HorizontalCenter>
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
            onClick={() => onDelete({ id: pageId, itemId: link.sortKey })}
            margin="0.5rem 0"
          />
        </Drop>
      )}

      <Modal show={!!showModal} onClose={() => setShowModal(false)}>
        {link.note}
      </Modal>
    </>
  );
}

export default Link;
