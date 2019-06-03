import { useEffect, useState, ReactElement } from 'react';
import useReactRouter from 'use-react-router';

import { InjectedProps } from './';

type Props = {
  children: (props: InjectedProps) => ReactElement;
};

const MobileNavigation = ({ children }: Props) => {
  const { history } = useReactRouter();

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  function hideNavigation() {
    setIsNavigationVisible(false);
  }

  function showNavigation() {
    setIsNavigationVisible(true);
  }

  useEffect(() => history.listen(hideNavigation), [history]);

  return children({
    hideNavigation,
    isMobile: true,
    isNavigationVisible,
    showNavigation,
  });
};

export default MobileNavigation;
