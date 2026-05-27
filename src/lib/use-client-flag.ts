"use client";

import { useSyncExternalStore } from "react";

/**
 * Reads a client-only boolean (or any value) without violating React's
 * `react-hooks/set-state-in-effect` rule. Returns `serverFallback` during
 * SSR/initial render, then evaluates `detect()` on the client after hydration.
 *
 * Use this anywhere you previously did:
 *   const [x, setX] = useState(false);
 *   useEffect(() => setX(detect()), []);
 */
export function useClientFlag(detect: () => boolean, serverFallback = false): boolean {
  return useSyncExternalStore<boolean>(
    () => () => {}, // no subscription — value is read once on mount
    detect,
    () => serverFallback,
  );
}

export function useClientValue<T>(detect: () => T, serverFallback: T): T {
  return useSyncExternalStore<T>(
    () => () => {},
    detect,
    () => serverFallback,
  );
}
