interface CacheEntry {
  data: unknown;
  expiresAt: number;
}

const DEFAULT_TTL_MINUTES = 7;

class InMemoryCache {
  private cache: Map<string, CacheEntry> = new Map();
  private defaultTTL: number;

  constructor(defaultTTLMinutes: number = 7) {
    this.defaultTTL = defaultTTLMinutes * 60 * 1000;
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);

      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, value: T, ttlMinutes?: number): void {
    const ttl = ttlMinutes ? ttlMinutes * 60 * 1000 : this.defaultTTL;
    const expiresAt = Date.now() + ttl;

    this.cache.set(key, {
      data: value,
      expiresAt,
    });
  }
}

export const cache = new InMemoryCache(DEFAULT_TTL_MINUTES);
