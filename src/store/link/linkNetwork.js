import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import { apps } from '../../shared/js/apps';
import { decryptMessageSymmetric, encryptMessageSymmetric } from '../../shared/js/encryption';
import HTTP from '../../shared/react/HTTP';

export async function createLink(
  decryptedPassword,
  pageId,
  { title, url, note, groupId, iconLink }
) {
  try {
    const {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      iconLink: encryptedIconLink,
    } = await encryptLinkContent({ title, url, note, iconLink }, decryptedPassword);

    const link = await HTTP.post(apps.Link37.name, `/v1/pages/${pageId}/links`, {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      groupId,
      iconLink: encryptedIconLink,
    });

    const decrypted = await decryptLinkContent(decryptedPassword, link);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateLink(
  decryptedPassword,
  pageId,
  linkId,
  { title, url, note, groupId, position, iconLink }
) {
  try {
    const {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      iconLink: encryptedIconLink,
    } = await encryptLinkContent({ title, url, note, iconLink }, decryptedPassword);

    const link = await HTTP.put(apps.Link37.name, `/v1/pages/${pageId}/links/${linkId}`, {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      groupId,
      position,
      iconLink: encryptedIconLink,
    });

    const decrypted = await decryptLinkContent(decryptedPassword, link);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteLink(pageId, linkId) {
  try {
    const result = await HTTP.delete(apps.Link37.name, `/v1/pages/${pageId}/links/${linkId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchLinkMeta(link) {
  try {
    const meta = await HTTP.post(apps.Link37.name, `/v1/link-meta`, {
      link,
    });

    return { data: meta, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function increaseLinkTimes(decryptedPassword, pageId, linkId) {
  try {
    const hasToken =
      LocalStorage.get(sharedLocalStorageKeys.refreshToken) &&
      LocalStorage.get(sharedLocalStorageKeys.accessToken);

    const putMethod = hasToken ? HTTP.put : HTTP.publicPut;
    const link = await putMethod(apps.Link37.name, `/v1/pages/${pageId}/links/${linkId}/times`);

    const decrypted = await decryptLinkContent(decryptedPassword, link);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function encryptLinkContent(link, decryptedPassword) {
  const { title, url, note, iconLink } = link;

  const encryptedTitle = title ? await encryptMessageSymmetric(decryptedPassword, title) : title;
  const encryptedUrl = url ? await encryptMessageSymmetric(decryptedPassword, url) : url;
  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;
  const encryptedIconLink = iconLink
    ? await encryptMessageSymmetric(decryptedPassword, iconLink)
    : iconLink;

  return {
    ...link,
    title: encryptedTitle,
    url: encryptedUrl,
    note: encryptedNote,
    iconLink: encryptedIconLink,
  };
}

export async function decryptLinkContent(decryptedPassword, link) {
  const { title, url, note, iconLink } = link;

  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);
  const decryptedUrl = await decryptMessageSymmetric(decryptedPassword, url);
  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;
  const decryptedIconLink = iconLink
    ? await decryptMessageSymmetric(decryptedPassword, iconLink)
    : null;

  return {
    ...link,
    title: decryptedTitle,
    url: decryptedUrl,
    note: decryptedNote,
    iconLink: decryptedIconLink,
  };
}

export function groupLinks(page) {
  const groupsObj = {};
  const filteredGroups = (page.groups || []).filter(g => g.sortKey !== noGroupLinksId);
  filteredGroups.forEach(g => {
    groupsObj[g.sortKey] = { ...g, links: [] };
  });
  const noGroupLinks = [];
  const popularLinks = [];

  (page.links || []).forEach(link => {
    if (groupsObj[link.groupId]) {
      groupsObj[link.groupId].links.push(link);
    } else {
      noGroupLinks.push(link);
    }

    if (link.times > 0) {
      popularLinks.push(link);
    }
  });

  const groups = filteredGroups.map(g => groupsObj[g.sortKey]);
  groups.push({ title: 'Links without group', sortKey: noGroupLinksId, links: noGroupLinks });

  const popular = popularLinks.sort((a, b) => b.times - a.times).slice(0, 10);

  return { ...page, groups, popular };
}

export const noGroupLinksId = 'noGroupLinks';
