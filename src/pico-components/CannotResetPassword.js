import React from 'react';
import { Href } from './Href';

function CannotResetPassword({ app }) {
  return (
    <>
      <p>
        {app} uses end-to-end encryption for authentication, so you <b>can't reset your password</b>
        .
      </p>
      <p>You can change password after sign in.</p>
      <p>
        Check <Href label="How encryption works" href="/encryption" /> in {app}.
      </p>
    </>
  );
}

export default CannotResetPassword;
