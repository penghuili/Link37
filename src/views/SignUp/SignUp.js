import { Anchor, Button, PageHeader, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import AppBar from '../../components/AppBar';
import CannotResetPassword from '../../components/CannotResetPassword';
import ContentWrapper from '../../components/ContentWrapper';
import OneAccountFor from '../../components/OneAccountFor';
import PasswordInput from '../../components/PasswordInput';
import RouteLink from '../../components/RouteLink';
import Spacer from '../../components/Spacer';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import apps from '../../lib/apps';

function SignUp({ errorMessage, isLoading, onClearError, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffectOnce(() => {
    return onClearError;
  });

  return (
    <>
      <AppBar title="Link37 sign up" hasBack />
      <ContentWrapper>
        <OneAccountFor app={apps.link37.name} />

        <PageHeader title="Sign up" />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Spacer />
        <PasswordInput placeholder="Password" value={password} onChange={setPassword} />

        {!!errorMessage && <Text color="status-error">{errorMessage}</Text>}

        <Text margin="0.5rem 0 0" size="small">
          * By clicking Sign up, you have read and agreed to the{' '}
          <Anchor label="Privacy" href="/privacy" target="_blank" /> and{' '}
          <Anchor label="Terms" href="/terms" target="_blank" />.
        </Text>

        <Button
          label={isLoading ? 'Loading...' : 'Sign up'}
          onClick={() => onSignUp(username, password)}
          disabled={!username || !password || isLoading}
          primary
          margin="1rem 0"
        />

        <RouteLink to="/sign-in" label="Already have account? Sign in" />
        <Spacer />
        <CannotResetPassword app={apps.link37.name} />
      </ContentWrapper>
    </>
  );
}

export default SignUp;
