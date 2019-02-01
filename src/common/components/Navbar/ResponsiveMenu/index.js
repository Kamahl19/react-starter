import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import Menu from 'antd/lib/menu';

export default class ResponsiveMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onVisibleChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { history, onHide } = this.props;

    this.unlisten = history.listen(onHide);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children, visible, selectedKeys, onShow, onHide, onVisibleChange } = this.props;

    return (
      <Popover
        visible={visible}
        trigger="click"
        placement="bottom"
        overlayClassName="responsive-menu"
        content={
          <>
            <Icon type="close" onClick={onHide} />
            <Menu mode="inline" selectedKeys={selectedKeys}>
              {children}
            </Menu>
          </>
        }
        onVisibleChange={onVisibleChange}
      >
        <nav>
          <div className="nav-toggle" onClick={onShow}>
            <Icon type="bars" theme="outlined" />
          </div>
        </nav>
      </Popover>
    );
  }
}
