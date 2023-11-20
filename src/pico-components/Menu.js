import { MoreVertical } from 'grommet-icons';
import React, { useRef } from 'react';
import { Box } from './Box';
import { ContextMenu } from './ContextMenu';

export function Menu({ children }) {
  const iconRef = useRef();

  return (
    <>
      <Box ref={iconRef} width="24px" height="24px" justify="center" align="center">
        <MoreVertical />
      </Box>
      {!!iconRef.current && (
        <ContextMenu target={iconRef.current} trigger="click">
          {children}
        </ContextMenu>
      )}
    </>
  );
}
