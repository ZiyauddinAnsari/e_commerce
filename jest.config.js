const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**/layout.tsx",
    "!src/app/**/loading.tsx",
    "!src/app/**/not-found.tsx",
    "!src/app/**/page.tsx", // Exclude page components for now
    "!src/components/**/*.tsx", // Exclude components for now
    "!src/lib/stripe*.ts", // Exclude Stripe config
    "!src/data/*.ts", // Exclude data files
  ],
  coverageThreshold: {
    global: {
      branches: 7,
      functions: 22,
      lines: 19,
      statements: 19,
    },
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
};

module.exports = createJestConfig(customJestConfig);
