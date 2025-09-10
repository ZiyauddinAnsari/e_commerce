/**
 * @jest-environment jsdom
 */

import { formatCurrency, formatDate, slugify } from "@/utils/format";

describe("formatCurrency", () => {
  it("should format currency correctly", () => {
    expect(formatCurrency(99.99)).toBe("$99.99");
    expect(formatCurrency(1000)).toBe("$1,000.00");
    expect(formatCurrency(0)).toBe("$0.00");
    expect(formatCurrency(0.5)).toBe("$0.50");
  });

  it("should handle different currencies", () => {
    expect(formatCurrency(99.99, "EUR")).toBe("€99.99");
    expect(formatCurrency(99.99, "GBP")).toBe("£99.99");
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2025-01-15T10:30:00Z");
    const formatted = formatDate(date.toISOString());
    expect(formatted).toMatch(/January 15, 2025/);
  });

  it("should handle invalid dates", () => {
    expect(formatDate("invalid-date")).toBe("Invalid Date");
  });
});

describe("slugify", () => {
  it("should create proper slugs", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("Product Name With Spaces")).toBe(
      "product-name-with-spaces"
    );
    expect(slugify("Product with Special !@# Characters")).toBe(
      "product-with-special-characters"
    );
    expect(slugify("Multiple   Spaces   Between")).toBe(
      "multiple-spaces-between"
    );
  });

  it("should handle empty strings", () => {
    expect(slugify("")).toBe("");
    expect(slugify("   ")).toBe("");
  });
});
