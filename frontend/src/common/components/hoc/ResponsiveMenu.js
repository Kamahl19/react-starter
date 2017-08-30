import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

export default (maxWidth = '767px', menuModes = ['horizontal', 'inline']) => MenuComponent =>
  class ResponsiveMenu extends Component {
    render() {
      return (
        <MediaQuery maxWidth={maxWidth}>
          {matches =>
            matches ? (
              <MenuComponent {...this.props} menuMode={menuModes[1]} />
            ) : (
              <MenuComponent {...this.props} menuMode={menuModes[0]} />
            )}
        </MediaQuery>
      );
    }
  };
