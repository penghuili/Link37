import { Anchor, Text } from 'grommet';
import React from 'react';

function Examples() {
  return (
    <Text>
      Check an{' '}
      <Anchor
        label="example page"
        href="/p/szrPwXfCnIp"
        target="_blank"
      />
      (It is my browser's start page.)
    </Text>
  );
}

export default Examples;
