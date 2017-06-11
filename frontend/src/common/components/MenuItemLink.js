/**
 * Originally https://github.com/react-component/menu/blob/master/src/MenuItem.jsx
 * Needs to be manually updated when new version of rc-menu is released
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, hashHistory } from 'react-router';

function noop() {}

class MenuItemLink extends Component {
  static displayName = 'MenuItem';

  static propTypes = {
    rootPrefixCls: PropTypes.string,
    eventKey: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.any,
    selectedKeys: PropTypes.array,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    onDeselect: PropTypes.func,
    parentMenu: PropTypes.object,
    onItemHover: PropTypes.func,
    onDestroy: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onlyActiveOnIndex: PropTypes.bool.isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onSelect: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    onlyActiveOnIndex: false,
  };

  state = {
    isActive: this.getIsActive(),
  };

  componentDidMount() {
    this.unlisten = hashHistory.listen(this.locationChanged);
  }

  componentWillUnmount() {
    this.unlisten();
    const props = this.props;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
    if (props.parentMenu.menuItemInstance === this) {
      this.clearMenuItemMouseLeaveTimer();
    }
  }

  locationChanged = () => {
    this.props.onDeselect({
      key: this.props.eventKey,
      keyPath: [this.props.eventKey],
      item: this,
    });

    this.setState({
      isActive: this.getIsActive(),
    });
  };

  getIsActive() {
    const { to, onlyActiveOnIndex } = this.props;

    return this.context.router.isActive(to, onlyActiveOnIndex);
  }

  onMouseLeave = e => {
    const props = this.props;
    const { eventKey, parentMenu } = props;
    parentMenu.menuItemInstance = this;
    parentMenu.menuItemMouseLeaveFn = () => {
      if (props.active) {
        props.onItemHover({
          key: eventKey,
          item: this,
          hover: false,
          domEvent: e,
          trigger: 'mouseleave',
        });
      }
    };
    parentMenu.menuItemMouseLeaveTimer = setTimeout(parentMenu.menuItemMouseLeaveFn, 30);
    props.onMouseLeave({
      key: eventKey,
      domEvent: e,
    });
  };

  onMouseEnter = e => {
    const props = this.props;
    const { eventKey, parentMenu } = props;
    this.clearMenuItemMouseLeaveTimer(parentMenu.menuItemInstance !== this);
    if (parentMenu.subMenuInstance) {
      parentMenu.subMenuInstance.clearSubMenuTimers();
    }
    props.onItemHover({
      key: eventKey,
      item: this,
      hover: true,
      domEvent: e,
      trigger: 'mouseenter',
    });
    props.onMouseEnter({
      key: eventKey,
      domEvent: e,
    });
  };

  onClick = e => {
    const props = this.props;
    const selected = this.isSelected();
    const eventKey = props.eventKey;
    const info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e,
    };
    props.onClick(info);
    if (props.multiple) {
      if (selected) {
        props.onDeselect(info);
      } else {
        props.onSelect(info);
      }
    } else if (!selected) {
      props.onSelect(info);
    }
  };

  getPrefixCls() {
    return `${this.props.rootPrefixCls}-item`;
  }

  getActiveClassName() {
    return `${this.getPrefixCls()}-active`;
  }

  getSelectedClassName() {
    return `${this.getPrefixCls()}-selected`;
  }

  getDisabledClassName() {
    return `${this.getPrefixCls()}-disabled`;
  }

  clearMenuItemMouseLeaveTimer() {
    const props = this.props;
    let callFn;
    const parentMenu = props.parentMenu;
    if (parentMenu.menuItemMouseLeaveTimer) {
      clearTimeout(parentMenu.menuItemMouseLeaveTimer);
      parentMenu.menuItemMouseLeaveTimer = null;
      if (callFn && parentMenu.menuItemMouseLeaveFn) {
        parentMenu.menuItemMouseLeaveFn();
      }
      parentMenu.menuItemMouseLeaveFn = null;
    }
  }

  isSelected() {
    return this.props.selectedKeys.indexOf(this.props.eventKey) !== -1;
  }

  render() {
    const props = this.props;
    const selected = this.isSelected();
    const classes = {};
    classes[this.getActiveClassName()] = !props.disabled && props.active;
    classes[this.getSelectedClassName()] = selected || this.state.isActive;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getPrefixCls()] = true;
    classes[props.className] = !!props.className;
    const attrs = {
      ...props.attribute,
      title: props.title,
      className: classnames(classes),
      role: 'menuitem',
      'aria-selected': selected,
      'aria-disabled': props.disabled,
    };
    let mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter,
      };
    }
    const style = {
      ...props.style,
    };
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return (
      <li style={style} {...attrs} {...mouseEvent}>
        <Link to={props.to}>
          {props.children}
        </Link>
      </li>
    );
  }
}

MenuItemLink.isMenuItem = 1;

export default MenuItemLink;
