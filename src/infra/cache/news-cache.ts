type CacheItem<T> = {
  data: T;
  expiresAt: number;
};

class NewsCache {
  private cache: Record<string, CacheItem<any>> = {};

  set(key: string, value: any, ttl: number = 30_000) {
    this.cache[key] = { data: value, expiresAt: Date.now() + ttl };
  }

  get(key: string) {
    const item = this.cache[key];
    if (!item) return null;
    if (item.expiresAt < Date.now()) {
      delete this.cache[key];
      return null;
    }
    return item.data;
  }

  invalidate(key: string) {
    delete this.cache[key];
  }
}

export const newsCache = new NewsCache();
