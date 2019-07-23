import { Component, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { UnregisterCallback } from 'history';

import { State } from './';

type Props = RouteComponentProps & {
  children: (state: State) => ReactNode;
};

class MobileNavigation extends Component<Props, State> {
  readonly state = {
    isMobile: true,
    isNavigationVisible: false,
    hideNavigation: () => this.setState({ isNavigationVisible: false }),
    showNavigation: () => this.setState({ isNavigationVisible: true }),
  };

  unlisten?: UnregisterCallback;

  componentDidMount() {
    const { history } = this.props;
    const { hideNavigation } = this.state;

    this.unlisten = history.listen(hideNavigation);
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  render() {
    return this.props.children(this.state);
  }
}

export default withRouter(MobileNavigation);
