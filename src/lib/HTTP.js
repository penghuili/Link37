import axios from 'axios';
import EventEmitter3 from 'eventemitter3';

import { appActionCreators } from '../store/app/appActions';
import { getHook } from './hooksOutside';
import { LocalStorage, LocalStorageKeys } from './LocalStorage';

export const servers = {
  auth: 'auth',
  link37: 'link37',
};

const serverToUrl = {
  [servers.auth]: process.env.REACT_APP_AUTH_URL,
  [servers.link37]: process.env.REACT_APP_API_URL,
};

function getFullUrl(server, path) {
  return `${serverToUrl[server]}${path}`;
}

let isRefreshing = false;
const eventemitter = new EventEmitter3();

const HTTP = {
  async publicGet(server, path) {
    try {
      const { data } = await axios.get(getFullUrl(server, path));
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async publicPost(server, path, body) {
    try {
      const { data } = await axios.post(getFullUrl(server, path), body);
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },

  async post(server, path, body) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.post(getFullUrl(server, path), body, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async get(server, path) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.get(getFullUrl(server, path), {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async put(server, path, body) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.put(getFullUrl(server, path), body, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },
  async delete(server, path) {
    try {
      await HTTP.refreshTokenIfNecessary();

      const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
      const { data } = await axios.delete(getFullUrl(server, path), {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      throw HTTP.handleError(error);
    }
  },

  handleError(error) {
    const {
      response: { status, data: errorCode },
    } = error;
    if (status === 401) {
      LocalStorage.resetTokens();
      const dispatch = getHook('dispatch');
      dispatch(appActionCreators.reset());
    }

    return { status, errorCode };
  },

  async refreshTokenIfNecessary() {
    if (isRefreshing) {
      await HTTP.waitForRefresh();
      return;
    }

    const expiresAt = LocalStorage.get(LocalStorageKeys.accessTokenExpiresAt);
    const refreshToken = LocalStorage.get(LocalStorageKeys.refreshToken);
    const accessToken = LocalStorage.get(LocalStorageKeys.accessToken);
    if (!refreshToken || !accessToken || !expiresAt) {
      throw { response: { status: 401 } };
    }

    if (expiresAt > Date.now()) {
      return;
    }

    isRefreshing = true;
    const data = await HTTP.publicPost(servers.auth, `/v1/sign-in/refresh`, {
      refreshToken,
    });
    LocalStorage.saveTokens(data);
    isRefreshing = false;
    eventemitter.emit('refreshed');
  },

  async waitForRefresh() {
    return new Promise(resolve => {
      eventemitter.once('refreshed', () => {
        resolve(true);
      });
    });
  },
};

export default HTTP;
