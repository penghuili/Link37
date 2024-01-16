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
import { createItemsCache } from '../../shared/react/cacheItems';
import { decryptGroupContent } from '../group/groupNetwork';
import { decryptLinkContent, groupLinks } from '../link/linkNetwork';

export const pageCache = createItemsCache('link37-page');

export async function fetchPages() {
  try {
    const pages = await HTTP.get(apps.link37.name, `/v1/pages`);

    const decryptedPages = await asyncForAll(pages, async page => {
      const decrypted = await decryptPageContent(page);
      return decrypted;
    });

    await pageCache.cacheItems(decryptedPages);

    return { data: { items: decryptedPages }, error: null };
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

    await pageCache.cacheItem(pageId, groupedPage);

    return {
      data: groupedPage,
      error: null,
    };
  } catch (error) {
    let errorMessage;
    if (error.status === 401) {
      errorMessage = 'You need to login to view this page.';
    }

    if (error.status === 403) {
      errorMessage = 'You do not have access to this page.';
    }

    if (error.status === 404) {
      errorMessage = 'This page does not exist.';
    }
    return { data: null, error: errorMessage };
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

    await pageCache.deleteCachedItem(pageId);

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
