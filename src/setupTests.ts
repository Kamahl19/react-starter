import createFetchMock from 'vitest-fetch-mock';

import '@testing-library/jest-dom';

// Suppress oaf-react-router warning about missing title
document.title = 'React Starter';

// Mock fetch
createFetchMock(vi).enableMocks();

// Mock matchMedia
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
