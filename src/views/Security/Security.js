import { Anchor } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../shared/react/AppBar';
import Confirm from '../../shared/react/Confirm';
import ContentWrapper from '../../shared/react/ContentWrapper';
import RouteLink from '../../shared/react/RouteLink';
import Spacer from '../../shared/react/Spacer';

function Security({ onLogOut, onLogOutFromAllDevices, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <AppBar title="Security" hasBack />
      <ContentWrapper>
        <RouteLink label="Change password" to="/security/password" />
        <Spacer />
        <Anchor label="Log out" onClick={onLogOut} />
        <Spacer />
        <Anchor label="Log out from all devices" onClick={onLogOutFromAllDevices} />
        <Spacer />
        <Anchor
          label="Delete account"
          onClick={() => setShowConfirm(true)}
          color="status-critical"
        />

        <Confirm
          message="Your account and all watchers and their history will be deleted. Are you sure?"
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={onDelete}
        />
      </ContentWrapper>
    </>
  );
}

export default Security;
