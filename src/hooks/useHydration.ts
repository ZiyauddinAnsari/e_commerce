"use client";

import { useEffect, useState } from "react";

/**
 * Hook to handle hydration issues with client-side storage
 * Returns true only after the component has mounted on the client
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
