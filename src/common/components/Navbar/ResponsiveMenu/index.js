import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Menu, Popover } from '../../';

export default class ResponsiveMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    visible: false,
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(this.handleHide);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleHide = () => this.setState({ visible: false });

  handleVisibleChange = visible => this.setState({ visible });

  render() {
    const { children, selectedKeys } = this.props;
    const { visible } = this.state;

    return (
      <Popover
        placement="bottom"
        trigger="click"
        overlayClassName="responsive-menu"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        title={<Icon type="close" onClick={this.handleHide} />}
        content={
          <Menu mode="inline" selectedKeys={selectedKeys}>
            {children}
          </Menu>
        }
      >
        <nav>
          <Icon type="bars" theme="outlined" />
        </nav>
      </Popover>
    );
  }
}
