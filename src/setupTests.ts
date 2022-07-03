import createFetchMock from 'vitest-fetch-mock';

import '@testing-library/jest-dom';

import 'common/i18next';

// Suppress oaf-react-router warning about missing title
document.title = 'React Starter';

// Mock fetch
createFetchMock(vi).enableMocks();

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
