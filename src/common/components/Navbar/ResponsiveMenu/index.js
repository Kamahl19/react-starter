import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Popover from 'antd/lib/popover';

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
    const { history } = this.props;

    this.unlisten = history.listen(this.handleHide);
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
