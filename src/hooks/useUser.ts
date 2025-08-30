import { useEffect, useState } from 'react';
import { getUserById, User } from '../services/api';

const cache = new Map<number, User | null>();

export function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(cache.get(userId) ?? null);
  const [loading, setLoading] = useState<boolean>(!cache.has(userId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (cache.has(userId)) {
        setUser(cache.get(userId) ?? null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const u = await getUserById(userId);
        if (!mounted) return;
        cache.set(userId, u);
        setUser(u);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? 'Failed to load user');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [userId]);

  return { user, loading, error };
}
