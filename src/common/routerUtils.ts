import { resolvePath } from 'react-router-dom';

// https://github.com/remix-run/react-router/blob/0f9435a8134b2b5dddfd716a18d17aefe4461fe1/packages/react-router-dom/index.tsx#L311
export const isActive = (pathname: string, to: string, end = false) => {
  const locationPathname = pathname.toLowerCase();
  const toPathname = resolvePath(to).pathname.toLowerCase();

  return (
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === '/')
  );
};

export const getSelectedKeys = (toPaths: string[], pathname: string) =>
  toPaths.filter((to) => isActive(pathname, to));
