/**
 * Pollyfils
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

/**
 * Fix google translate bug
 */
import 'packages/react-google-translate-fix';

/**
 * Initialise i18next
 */
import 'common/services/i18next';

/**
 * Initialise store
 */
import 'app/store';

// TODO remove when new @types/react-responsive is released
declare module 'react-responsive' {
  interface UseMediaQueryParams extends MediaQueryFeatures {
    query?: string;
  }

  function useMediaQuery(param: UseMediaQueryParams): boolean;
}
