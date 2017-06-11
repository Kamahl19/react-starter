import React, { Component } from 'react';
import enquire from 'enquire.js';

export default (maxWidth = '767px', menuModes = ['horizontal', 'inline']) => MenuComponent =>
  class ResponsiveMenu extends Component {
    state = {
      menuMode: 'horizontal',
    };

    componentDidMount() {
      enquire.register(`only screen and (max-width: ${maxWidth})`, {
        match: () => this.setState({ menuMode: menuModes[1] }),
        unmatch: () => this.setState({ menuMode: menuModes[0] }),
      });
    }

    componentWillUnmount() {
      enquire.unregister(`only screen and (max-width: ${maxWidth})`);
    }

    render() {
      return <MenuComponent {...this.props} menuMode={this.state.menuMode} />;
    }
  };
