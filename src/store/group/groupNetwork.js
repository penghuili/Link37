import { apps } from '../../shared/js/apps';
import { decryptMessageSymmetric, encryptMessageSymmetric } from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';

export async function createGroup(decryptedPassword, pageId, { title }) {
  try {
    const { title: encryptedTitle } = await encryptGroupContent({ title }, decryptedPassword);

    const group = await HTTP.post(apps.link37.name, `/v1/pages/${pageId}/groups`, {
      title: encryptedTitle,
    });

    const decrypted = await decryptGroupContent(decryptedPassword, group);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateGroup(decryptedPassword, pageId, groupId, { title, position }) {
  try {
    const { title: encryptedTitle } = await encryptGroupContent({ title }, decryptedPassword);

    const group = await HTTP.put(apps.link37.name, `/v1/pages/${pageId}/groups/${groupId}`, {
      title: encryptedTitle,
      position,
    });

    const decrypted = await decryptGroupContent(decryptedPassword, group);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteGroup(pageId, groupId, includeLinks) {
  try {
    const result = await HTTP.delete(
      apps.link37.name,
      `/v1/pages/${pageId}/groups/${groupId}${includeLinks ? '?links=1' : ''}`
    );

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptGroupContent(group, decryptedPassword) {
  const { title } = group;

  const encryptedTitle = title ? await encryptMessageSymmetric(decryptedPassword, title) : title;

  return {
    ...group,
    title: encryptedTitle,
  };
}

export async function decryptGroupContent(decryptedPassword, link) {
  if (!link.encrypted) {
    return link;
  }

  const { title } = link;

  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);

  return {
    ...link,
    title: decryptedTitle,
  };
}
