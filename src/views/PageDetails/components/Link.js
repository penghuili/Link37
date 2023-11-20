import { Info } from 'grommet-icons';
import React, { useRef, useState } from 'react';
import { Box } from '../../../pico-components/Box';
import { ContextMenu } from '../../../pico-components/ContextMenu';
import { Href } from '../../../pico-components/Href';
import { Img } from '../../../pico-components/Img';
import Modal from '../../../pico-components/Modal';
import { RouteLink } from '../../../pico-components/RouteLink';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import copyToClipboard from '../../../shared/react/copyToClipboard';

function Link({ pageId, page, link, showClickedTimes, onToast, onDelete, onIncreaseTimes }) {
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HorizontalCenter margin="0 1.5rem 1rem 0">
        {!!link.iconLink && (
          <Img src={link.iconLink} width="18px" height="18px" margin="0 0.25rem 0 0" />
        )}
        <Href
          href={link.url}
          ref={ref}
          label={
            <>
              {link.title}
              {showClickedTimes && `(${link.times || 0})`}
            </>
          }
          onClick={() => {
            onIncreaseTimes({
              pageId,
              linkId: link.sortKey,
              page,
            });
          }}
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
      {ref.current && (
        <ContextMenu target={ref.current}>
          <Href
            label="Copy link"
            onClick={e => {
              e.preventDefault();
              copyToClipboard(link.url);
              onToast('Link copied to clipboard.');
            }}
            margin="0.5rem 0"
          />

          <Href
            label="Open in new tab"
            onClick={e => {
              e.preventDefault();
              window.open(link.url, '_blank');
            }}
            margin="0.5rem 0"
          />

          <RouteLink label="Edit" to={`/p/${pageId}/links/${link.sortKey}`} margin="0.5rem 0" />

          <Href
            label="Delete"
            color="status-critical"
            onClick={e => {
              e.preventDefault();
              onDelete({ id: pageId, itemId: link.sortKey });
            }}
            margin="0.5rem 0"
          />
        </ContextMenu>
      )}

      <Modal show={!!showModal} onClose={() => setShowModal(false)}>
        {link.note}
      </Modal>
    </>
  );
}

export default Link;
