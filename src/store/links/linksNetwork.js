import { asyncForEach } from '../../lib/asyncForEach';
import {
  decryptMessage,
  decryptMessageSymmetric,
  encryptMessage,
  encryptMessageSymmetric,
} from '../../lib/encryption';
import HTTP, { servers } from '../../lib/HTTP';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';
import { generatePassword } from '../../lib/password';

export async function fetchPages() {
  try {
    const pages = await HTTP.get(servers.link37, `/v1/pages`);

    const decryptedPages = [];
    await asyncForEach(pages, async page => {
      const decrypted = await decryptPageContent(page);
      decryptedPages.push(decrypted);
    });

    return { data: decryptedPages, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchPage(pageId) {
  try {
    const page = await HTTP.get(servers.link37, `/v1/pages/${pageId}`);

    const decryptedPage = await decryptPageContent(page);

    const decryptedLinks = [];
    await asyncForEach(page?.links, async link => {
      const decrypted = await decryptLinkContent(decryptedPage.decryptedPassword, link);
      decryptedLinks.push(decrypted);
    });

    const decryptedGroups = [];
    await asyncForEach(page?.groups, async group => {
      const decrypted = await decryptGroupContent(decryptedPage.decryptedPassword, group);
      decryptedGroups.push(decrypted);
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
    const encryptedPassword = await encryptMessage(
      LocalStorage.get(LocalStorageKeys.publicKey),
      password
    );

    const page = await HTTP.post(servers.link37, `/v1/pages`, {
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

    const page = await HTTP.put(servers.link37, `/v1/pages/${pageId}`, {
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

export async function deletePage(pageId) {
  try {
    const result = await HTTP.delete(servers.link37, `/v1/pages/${pageId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createLink(decryptedPassword, pageId, { title, url, note, groupId }) {
  try {
    const {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
    } = await encryptLinkContent({ title, url, note }, decryptedPassword);

    const link = await HTTP.post(servers.link37, `/v1/pages/${pageId}/links`, {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      groupId,
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
  { title, url, note, groupId, position }
) {
  try {
    const {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
    } = await encryptLinkContent({ title, url, note }, decryptedPassword);

    const link = await HTTP.put(servers.link37, `/v1/pages/${pageId}/links/${linkId}`, {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      groupId,
      position,
    });

    const decrypted = await decryptLinkContent(decryptedPassword, link);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteLink(pageId, linkId) {
  try {
    const result = await HTTP.delete(servers.link37, `/v1/pages/${pageId}/links/${linkId}`);

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createGroup(decryptedPassword, pageId, { title }) {
  try {
    const { title: encryptedTitle } = await encryptGroupContent({ title }, decryptedPassword);

    const group = await HTTP.post(servers.link37, `/v1/pages/${pageId}/groups`, {
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

    const group = await HTTP.put(servers.link37, `/v1/pages/${pageId}/groups/${groupId}`, {
      title: encryptedTitle,
      position,
    });

    const decrypted = await decryptGroupContent(decryptedPassword, group);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteGroup(pageId, groupId) {
  try {
    const result = await HTTP.delete(servers.link37, `/v1/pages/${pageId}/groups/${groupId}`);

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
  const { title, note, password } = page;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedPassword = await decryptMessage(privateKey, password);
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
  const { title, url, note } = link;

  const encryptedTitle = title ? await encryptMessageSymmetric(decryptedPassword, title) : title;
  const encryptedUrl = url ? await encryptMessageSymmetric(decryptedPassword, url) : url;
  const encryptedNote = note ? await encryptMessageSymmetric(decryptedPassword, note) : note;

  return {
    ...link,
    title: encryptedTitle,
    url: encryptedUrl,
    note: encryptedNote,
  };
}

async function decryptLinkContent(decryptedPassword, link) {
  const { title, url, note } = link;

  const decryptedTitle = await decryptMessageSymmetric(decryptedPassword, title);
  const decryptedUrl = await decryptMessageSymmetric(decryptedPassword, url);
  const decryptedNote = note ? await decryptMessageSymmetric(decryptedPassword, note) : null;

  return {
    ...link,
    title: decryptedTitle,
    url: decryptedUrl,
    note: decryptedNote,
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

async function decryptGroupContent(decryptedPassword, link) {
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

  page.links.forEach(link => {
    if (groupsObj[link.groupId]) {
      groupsObj[link.groupId].links.push(link);
    } else {
      noGroupLinks.push(link);
    }
  });

  const groups = page.groups.map(g => groupsObj[g.sortKey]);
  groups.push({ title: 'Links without group', sortKey: noGroupLinksId, links: noGroupLinks });

  return { ...page, groups };
}

export const noGroupLinksId = 'noGroupLinks';
