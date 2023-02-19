import { asyncForEach } from '../../lib/asyncForEach';
import { decryptMessage, encryptMessage } from '../../lib/encryption';
import HTTP, { servers } from '../../lib/HTTP';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';

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
      const decrypted = await decryptLinkContent(link);
      decryptedLinks.push(decrypted);
    });

    const decryptedGroups = [];
    await asyncForEach(page?.groups, async group => {
      const decrypted = await decryptGroupContent(group);
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
    const { title: encryptedTitle, note: encryptedNote } = await encryptPageContent(
      { title, note },
      true
    );

    const page = await HTTP.post(servers.link37, `/v1/pages`, {
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
  pageId,
  { encrypted, title, note, showIndex, layout, showNote, position }
) {
  try {
    const { title: encryptedTitle, note: encryptedNote } = await encryptPageContent(
      { title, note },
      encrypted
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

export async function createLink(pageId, { title, url, note, groupId }) {
  try {
    const {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
    } = await encryptLinkContent({ title, url, note }, true);

    const link = await HTTP.post(servers.link37, `/v1/pages/${pageId}/links`, {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      groupId,
    });

    const decrypted = await decryptLinkContent(link);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateLink(pageId, linkId, { title, url, note, groupId, position }) {
  try {
    const {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
    } = await encryptLinkContent({ title, url, note }, true);

    const link = await HTTP.put(servers.link37, `/v1/pages/${pageId}/links/${linkId}`, {
      title: encryptedTitle,
      url: encryptedUrl,
      note: encryptedNote,
      groupId,
      position,
    });

    const decrypted = await decryptLinkContent(link);

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

export async function createGroup(pageId, { title }) {
  try {
    const { title: encryptedTitle } = await encryptGroupContent({ title }, true);

    const group = await HTTP.post(servers.link37, `/v1/pages/${pageId}/groups`, {
      title: encryptedTitle,
    });

    const decrypted = await decryptGroupContent(group);

    return { data: decrypted, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateGroup(pageId, groupId, { title, position }) {
  try {
    const { title: encryptedTitle } = await encryptGroupContent({ title }, true);

    const group = await HTTP.put(servers.link37, `/v1/pages/${pageId}/groups/${groupId}`, {
      title: encryptedTitle,
      position,
    });

    const decrypted = await decryptGroupContent(group);

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

async function encryptPageContent(page, needToEncrypt) {
  if (!needToEncrypt) {
    return page;
  }

  const { title, note } = page;

  const publicKey = LocalStorage.get(LocalStorageKeys.publicKey);
  const encryptedTitle = title ? await encryptMessage(publicKey, title) : title;
  const encryptedNote = note ? await encryptMessage(publicKey, note) : note;

  return {
    ...page,
    title: encryptedTitle,
    note: encryptedNote,
  };
}

async function decryptPageContent(page) {
  if (!page.encrypted) {
    return page;
  }

  const { title, note } = page;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedTitle = await decryptMessage(privateKey, title);
  const decryptedNote = note ? await decryptMessage(privateKey, note) : null;

  return {
    ...page,
    title: decryptedTitle,
    note: decryptedNote,
  };
}

async function encryptLinkContent(link, needToEncrypt) {
  if (!needToEncrypt) {
    return link;
  }

  const { title, url, note } = link;

  const publicKey = LocalStorage.get(LocalStorageKeys.publicKey);
  const encryptedTitle = title ? await encryptMessage(publicKey, title) : title;
  const encryptedUrl = url ? await encryptMessage(publicKey, url) : url;
  const encryptedNote = note ? await encryptMessage(publicKey, note) : note;

  return {
    ...link,
    title: encryptedTitle,
    url: encryptedUrl,
    note: encryptedNote,
  };
}

async function decryptLinkContent(link) {
  if (!link.encrypted) {
    return link;
  }

  const { title, url, note } = link;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedTitle = await decryptMessage(privateKey, title);
  const decryptedUrl = await decryptMessage(privateKey, url);
  const decryptedNote = note ? await decryptMessage(privateKey, note) : null;

  return {
    ...link,
    title: decryptedTitle,
    url: decryptedUrl,
    note: decryptedNote,
  };
}

async function encryptGroupContent(group, needToEncrypt) {
  if (!needToEncrypt) {
    return group;
  }

  const { title } = group;

  const publicKey = LocalStorage.get(LocalStorageKeys.publicKey);
  const encryptedTitle = title ? await encryptMessage(publicKey, title) : title;

  return {
    ...group,
    title: encryptedTitle,
  };
}

async function decryptGroupContent(link) {
  if (!link.encrypted) {
    return link;
  }

  const { title } = link;

  const privateKey = LocalStorage.get(LocalStorageKeys.privateKey);
  const decryptedTitle = await decryptMessage(privateKey, title);

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
