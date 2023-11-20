import { Home, Previous, User } from 'grommet-icons';
import React from 'react';
import { logo } from '../../shared/react/initShared';
import { Img } from '../Img';
import { Spinner } from '../Spinner';

export function AppBar({ title, isLoading, hasBack, isLoggedIn, onBack, onCustomBack, onNav }) {
  const showUserIcon = isLoggedIn && !hasBack;

  function handleBack() {
    if (onCustomBack) {
      onCustomBack();
    } else {
      onBack();
    }
  }

  return (
    <>
      <nav>
        <ul>
          {hasBack ? (
            <li>
              <Previous onClick={handleBack} />
            </li>
          ) : (
            <li>
              <Img src={logo} width="32px" height="32px" />
            </li>
          )}
          <li>
            <strong>{title}</strong>
          </li>
          {!!isLoading && (
            <li>
              <Spinner margin="0 0 0 1rem" />
            </li>
          )}
        </ul>
        <ul>
          {showUserIcon && (
            <li>
              <User onClick={() => onNav('/account')} />
            </li>
          )}
          {!showUserIcon && hasBack && (
            <li>
              <Home onClick={() => onNav('/')} />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
