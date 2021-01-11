import '@testing-library/jest-dom';

import './bootstrap';

// Suppress oaf-react-router warning about missing Title
document.title = 'React App';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }),
});
