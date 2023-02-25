import apps from '../../shared/js/apps';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessageSymmetric,
  generateKeypair,
} from '../../shared/js/encryption';
import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import HTTP from '../../shared/react/HTTP';

export async function checkRefreshToken() {
  const expiresAt = LocalStorage.get(sharedLocalStorageKeys.accessTokenExpiresAt);
  const refreshTokenInStore = LocalStorage.get(sharedLocalStorageKeys.refreshToken);
  const accessTokenInStore = LocalStorage.get(sharedLocalStorageKeys.accessToken);
  if (!refreshTokenInStore || !accessTokenInStore || !expiresAt) {
    return { data: null, error: new Error('no tokens') };
  }

  try {
    const { id, accessToken, refreshToken, expiresIn } = await HTTP.publicPost(
      apps.auth,
      `/v1/sign-in/refresh`,
      {
        refreshToken: refreshTokenInStore,
      }
    );
    return { data: { id, accessToken, refreshToken, expiresIn }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signUp(username, password) {
  try {
    const { publicKey, privateKey } = await generateKeypair(username);
    const encryptedPrivateKey = await encryptMessageSymmetric(password, privateKey);

    const { id: userId } = await HTTP.publicPost(apps.auth, `/v1/sign-up`, {
      username,
      publicKey,
      encryptedPrivateKey,
    });

    return { data: { userId }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signIn(username, password) {
  try {
    const { publicKey, encryptedPrivateKey, encryptedChallenge } = await HTTP.publicGet(
      apps.auth,
      `/v1/me-public/${username}`
    );
    const privateKey = await decryptMessageSymmetric(password, encryptedPrivateKey);
    const challenge = await decryptMessage(privateKey, encryptedChallenge);
    const tokens = await HTTP.publicPost(apps.auth, `/v1/sign-in`, {
      username,
      signinChallenge: challenge,
    });

    LocalStorage.saveTokens({ ...tokens, publicKey, privateKey });

    return { data: { userId: tokens.id }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function logoutFromAllDevices() {
  try {
    await HTTP.post(apps.auth, `/v1/log-out-all`);

    LocalStorage.resetTokens();

    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
