/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", async () => {
    let value = "initial";
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    expect(result.current).toBe("initial");

    // Update value
    value = "updated";
    rerender();

    // Value should still be initial immediately after update
    expect(result.current).toBe("initial");

    // Wait for debounce delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    expect(result.current).toBe("updated");
  });

  it("should cancel previous debounce on rapid changes", async () => {
    let value = "initial";
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    // First update
    value = "first";
    rerender();

    // Second update before debounce completes
    setTimeout(() => {
      value = "second";
      rerender();
    }, 200);

    // Wait longer than debounce delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
    });

    // Should have the latest value, not the first one
    expect(result.current).toBe("second");
  });
});
