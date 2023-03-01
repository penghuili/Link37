import { detect } from 'detect-browser';

export function isMobile() {
  const browser = detect();

  return browser?.os === 'iOS' || browser?.os === 'Android OS';
}
