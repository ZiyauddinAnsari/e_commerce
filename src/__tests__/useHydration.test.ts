/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useHydration } from "@/hooks/useHydration";

describe("useHydration", () => {
  it("should return false initially", () => {
    const { result } = renderHook(() => useHydration());
    expect(result.current).toBe(false);
  });

  it("should return true after hydration", async () => {
    const { result } = renderHook(() => useHydration());

    // Initially false
    expect(result.current).toBe(false);

    // Wait for effect to run
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current).toBe(true);
  });
});
