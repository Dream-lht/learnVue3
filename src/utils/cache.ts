type CacheType = 'session' | 'local';

interface ICache {
  setSession<T>(key: string, value: T): void;
  setLocal<T>(key: string, value: T): void;
  getSession<T>(key: string): T | string | null;
  getLocal<T>(key: string): T | string | null;
  removeItem(key: string, type: CacheType): boolean;
  clear(type: CacheType): boolean;
  has(key: string, type: CacheType): boolean;
}

class Cache implements ICache {
  _localKeys: Set<string>;
  _sessionKeys: Set<string>;
  constructor() {
    this._localKeys = new Set<string>();
    this._sessionKeys = new Set<string>();
  }
  setSession<T = any>(key: string, value: T): void {
    const val = JSON.stringify(value);
    window.sessionStorage.setItem(key, val);
    this._sessionKeys.add(key);
  }
  setLocal<T = any>(key: string, value: T): void {
    const val = JSON.stringify(value);
    window.localStorage.setItem(key, val);
    this._localKeys.add(key);
  }
  getSession<T = any>(key: string): T | string | null {
    const value = window.sessionStorage.getItem(key);
    if (!value) {
      return value;
    }
    return JSON.parse(value as string);
  }
  getLocal<T = any>(key: string): T | string | null {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return value;
    }
    return JSON.parse(value as string);
  }
  removeItem(key: string, type: CacheType): boolean {
    if (type === 'session') {
      window.sessionStorage.removeItem(key);
      this._sessionKeys.delete(key);
      return true;
    } else {
      window.localStorage.removeItem(key);
      this._localKeys.delete(key);
      return true;
    }
  }
  clear(type: CacheType): boolean {
    if (type === 'session') {
      window.sessionStorage.clear();
      this._sessionKeys.clear();
      return true;
    } else {
      window.localStorage.clear();
      this._localKeys.clear();
      return true;
    }
  }
  has(key: string, type: CacheType): boolean {
    if (type === 'local') {
      if (window.localStorage.getItem(key)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (window.sessionStorage.getItem(key)) {
        return true;
      } else {
        return false;
      }
    }
  }
}

export default new Cache();
