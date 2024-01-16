import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import { apps } from '../../shared/js/apps';
import { asyncForAll } from '../../shared/js/asyncForAll';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessageAsymmetric,
  encryptMessageSymmetric,
} from '../../shared/js/encryption';
import { generatePassword } from '../../shared/js/generatePassword';
import HTTP from '../../shared/react/HTTP';

export async function fetchPages() {
  try {
    const pages = await HTTP.get(apps.link37.name, `/v1/pages`);

    const decryptedPages = await asyncForAll(pages, async page => {
      const decrypted = await decryptPageContent(page);
      return decrypted;
    });

    return { data: decryptedPages, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchPage(pageId) {
  try {
    const hasToken =
      LocalStorage.get(sharedLocalStorageKeys.refreshToken) &&
      LocalStorage.get(sharedLocalStorageKeys.accessToken);
    const page = hasToken
      ? await HTTP.get(apps.link37.name, `/v1/pages/${pageId}`)
      : await HTTP.publicGet(apps.link37.name, `/v1/pages/${pageId}`);

    const decryptedPage = await decryptPageContent(page);

    const decryptedLinks = await asyncForAll(page?.links, async link => {
      const decrypted = await decryptLinkContent(decryptedPage.decryptedPassword, link);
      return decrypted;
    });

    const decryptedGroups = await asyncForAll(page?.groups, async group => {
      const decrypted = await decryptGroupContent(decryptedPage.decryptedPassword, group);
      return decrypted;
    });

    const groupedPage = groupLinks({
      ...decryptedPage,
      links: decryptedLinks,
      groups: decryptedGroups,
    });

    return {
      data: groupedPage,
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createPage({ title, note, showIndex, layout, showNote }) {
  try {
    const password = generatePassword(20, true);
    const { title: encryptedTitle, note: encryptedNote } = await encryptPageContent(
      { title, note },
      password
    );
    const encryptedPassword = await encryptMessageAsymmetric(
      LocalStorage.get(sharedLocalStorageKeys.publicKey),
      password
    );

    const page = await HTTP.post(apps.link37.name, `/v1/pages`, {
      password: encryptedPassword,
      title: encryptedTitle,
      note: encryptedNote,
      showIndex,
      layout,
      showNote,
    });

    const decrypted = await decryptPageContent(page);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updatePage(
  decryptedPassword,
  pageId,
  { title, note, showIndex, layout, showNote, position }
) {
  try {
    const { title: encryptedTitle, note: encryptedNote } = await encryptPageContent(
      { title, note },
      decryptedPassword
    );

    const page = await HTTP.put(apps.link37.name, `/v1/pages/${pageId}`, {
      title: encryptedTitle,
      note: encryptedNote,
      showIndex,
      layout,
      showNote,
      position,
    });

    const decrypted = await decryptPageContent(page);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function publicPage(pageId, { password }) {
  try {
    const page = await HTTP.put(apps.link37.name, `/v1/pages/${pageId}/public`, {
      password,
    });

    const decrypted = await decryptPageContent(page);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function privatePage(pageId) {
  try {
    const page = await HTTP.put(apps.link37.name, `/v1/pages/${pageId}/private`);

    const decrypted = await decryptPageContent(page);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deletePage(pageId) {
  try {
    const result = await HTTP.delete(apps.link37.name, `/v1/pages/${pageId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getLinkMeta(link) {
  try {
    const meta = await HTTP.post(apps.link37.name, `/v1/link-meta`, {
      link,
    });

    return { data: meta, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

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

    const link = await HTTP.post(apps.link37.name, `/v1/pages/${pageId}/links`, {
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

    const link = await HTTP.put(apps.link37.name, `/v1/pages/${pageId}/links/${linkId}`, {
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

export async function increaseLinkTimes(decryptedPassword, pageId, linkId) {
  try {
    const hasToken =
      LocalStorage.get(sharedLocalStorageKeys.refreshToken) &&
      LocalStorage.get(sharedLocalStorageKeys.accessToken);

    const putMethod = hasToken ? HTTP.put : HTTP.publicPut;
    const link = await putMethod(apps.link37.name, `/v1/pages/${pageId}/links/${linkId}/times`);

    const decrypted = await decryptLinkContent(decryptedPassword, link);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteLink(pageId, linkId) {
  try {
    const result = await HTTP.delete(apps.link37.name, `/v1/pages/${pageId}/links/${linkId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

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

async function encryptPageContent(page, decryptedPassword) {
  const { title, note } = page;

  const encryptedTitle = title ? await encryptMessageSymmetric(decryptedPassword, title) : title;
  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...page,
    title: encryptedTitle,
    note: encryptedNote,
  };
}

async function decryptPageContent(page) {
  const { title, note, isPublic, password } = page;

  const privateKey = LocalStorage.get(sharedLocalStorageKeys.privateKey);
  const decryptedPassword = isPublic ? password : await decryptMessage(privateKey, password);
  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);
  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...page,
    title: decryptedTitle,
    note: decryptedNote,
    decryptedPassword,
  };
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

export function groupLinks(page) {
  const groupsObj = {};
  page.groups.forEach(g => {
    groupsObj[g.sortKey] = { ...g, links: [] };
  });
  const noGroupLinks = [];
  const popularLinks = [];

  page.links.forEach(link => {
    if (groupsObj[link.groupId]) {
      groupsObj[link.groupId].links.push(link);
    } else {
      noGroupLinks.push(link);
    }

    if (link.times > 0) {
      popularLinks.push(link);
    }
  });

  const groups = page.groups.map(g => groupsObj[g.sortKey]);
  groups.push({ title: 'Links without group', sortKey: noGroupLinksId, links: noGroupLinks });

  const popular = popularLinks.sort((a, b) => b.times - a.times).slice(0, 10);

  return { ...page, groups, popular };
}

export const noGroupLinksId = 'noGroupLinks';
