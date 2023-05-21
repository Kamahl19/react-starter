import { matchMedia, setMedia, MediaQueryListEvent, cleanup as mmmCleanup } from 'mock-match-media';
import '@testing-library/jest-dom';

import { DESKTOP_RESOLUTION_HEIGHT, DESKTOP_RESOLUTION_WIDTH } from './utils';
import { dropDB } from 'mocks/db';
import { server } from 'mocks/server';

import 'i18n';

// window.matchMedia
vi.stubGlobal('matchMedia', matchMedia);
vi.stubGlobal('MediaQueryListEvent', MediaQueryListEvent);
beforeEach(() => setMedia({ width: DESKTOP_RESOLUTION_WIDTH, height: DESKTOP_RESOLUTION_HEIGHT }));
afterEach(() => mmmCleanup());

// MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterEach(() => dropDB());
afterAll(() => server.close());

// https://github.com/yiminghe/async-validator#how-to-avoid-global-warning
vi.stubGlobal('ASYNC_VALIDATOR_NO_WARNING', 1);
