import apps from '../../shared/js/apps';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessageSymmetric,
} from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';

export async function fetchAccount() {
  try {
    const { id, username, createdAt, updatedAt, backendPublicKey } = await HTTP.get(
      apps.auth,
      `/v1/me`
    );

    return {
      data: {
        userId: id,
        username,
        createdAt,
        updatedAt,
        botPublicKey: JSON.parse(`"${backendPublicKey}"`),
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteAccount() {
  try {
    await HTTP.delete(apps.auth, `/v1/me`);

    return { data: { success: true }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function changePassword(username, currentPassword, newPassword) {
  try {
    const { encryptedPrivateKey, encryptedChallenge } = await HTTP.publicGet(
      apps.auth,
      `/v1/me-public/${username}`
    );
    const privateKey = await decryptMessageSymmetric(currentPassword, encryptedPrivateKey);
    const challenge = await decryptMessage(privateKey, encryptedChallenge);
    const updatedEncryptedPrivateKey = await encryptMessageSymmetric(newPassword, privateKey);
    const updatedUser = await HTTP.post(apps.auth, `/v1/me/password`, {
      encryptedPrivateKey: updatedEncryptedPrivateKey,
      signinChallenge: challenge,
    });

    return { data: updatedUser, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}
