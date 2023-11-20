import React from 'react';
import styled from 'styled-components';

const Large = styled.div`
  &[aria-busy="true"]:not(input, select, textarea, html)::before {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
  }
`;
export function Spinner({ large }) {
  return large ? <Large aria-busy="true" /> : <div aria-busy="true" />;
}
