import { mockViewport } from 'jsdom-testing-mocks';

export const setDesktopResolution = () =>
  mockViewport({
    width: '1280px',
    height: '800px',
  });

export const setMobileResolution = () =>
  mockViewport({
    width: '414px',
    height: '896px',
  });
