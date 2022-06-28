import createFetchMock from 'vitest-fetch-mock';

import '@testing-library/jest-dom';

// Suppress oaf-react-router warning about missing Title
document.title = 'React Starter';

// Mock fetch
createFetchMock(vi).enableMocks();

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// eslint-disable-next-line import/first
import './bootstrap';
