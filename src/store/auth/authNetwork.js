import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessageSymmetric,
  generateKeypair,
} from '../../lib/encryption';
import HTTP, { servers } from '../../lib/HTTP';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';

export async function checkRefreshToken() {
  const expiresAt = LocalStorage.get(LocalStorageKeys.accessTokenExpiresAt);
  const refreshTokenInStore = LocalStorage.get(LocalStorageKeys.refreshToken);
  const accessTokenInStore = LocalStorage.get(LocalStorageKeys.accessToken);
  if (!refreshTokenInStore || !accessTokenInStore || !expiresAt) {
    return { data: null, error: new Error('no tokens') };
  }

  try {
    const { id, accessToken, refreshToken, expiresIn } = await HTTP.publicPost(
      servers.auth,
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

    const { id: userId } = await HTTP.publicPost(servers.auth, `/v1/sign-up`, {
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
      servers.auth,
      `/v1/me-public/${username}`
    );
    const privateKey = await decryptMessageSymmetric(password, encryptedPrivateKey);
    const challenge = await decryptMessage(privateKey, encryptedChallenge);
    const tokens = await HTTP.publicPost(servers.auth, `/v1/sign-in`, {
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
    await HTTP.post(servers.auth, `/v1/log-out-all`);

    LocalStorage.resetTokens();

    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
