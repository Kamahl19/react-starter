import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import Menu from 'antd/lib/menu';

import Container from '../../Container';
import Logo from '../../Logo';

export default class ResponsiveMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    showResponsiveMenu: PropTypes.func.isRequired,
    hideResponsiveMenu: PropTypes.func.isRequired,
    toggleResponsiveMenu: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { history, hideResponsiveMenu } = this.props;

    this.unlisten = history.listen(hideResponsiveMenu);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const {
      children,
      visible,
      selectedKeys,
      showResponsiveMenu,
      hideResponsiveMenu,
      toggleResponsiveMenu,
    } = this.props;

    return (
      <Popover
        visible={visible}
        trigger="click"
        placement="bottom"
        overlayClassName="responsive-menu"
        title={
          <Container>
            <Logo dark />
            <span>
              <Icon type="close-circle-o" onClick={hideResponsiveMenu} />
            </span>
          </Container>
        }
        content={
          <Menu mode="inline" selectedKeys={selectedKeys}>
            {children}
          </Menu>
        }
        onVisibleChange={toggleResponsiveMenu}
      >
        <nav>
          <div className="nav-toggle" onClick={showResponsiveMenu} />
        </nav>
      </Popover>
    );
  }
}
