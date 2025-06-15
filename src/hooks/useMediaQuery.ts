import { useEffect, useState } from "react";

/**
 * SSR-friendly media query hook.
 * Returns undefined on the server, and updates on the client.
 */
export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}