/**
 * Originally from https://raw.githubusercontent.com/react-community/react-navigation/master/src/views/TouchableItem.js
 */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

export default class TouchableItem extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    delayPressIn: PropTypes.number,
    borderless: PropTypes.bool,
    pressColor: PropTypes.string,
    activeOpacity: PropTypes.number,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)',
  };

  render() {
    if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
      const { style, ...rest } = this.props; // eslint-disable-line no-unused-vars

      return (
        <TouchableNativeFeedback
          {...rest}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor || '',
            this.props.borderless || false
          )}
        >
          <View style={this.props.style}>
            {Children.only(this.props.children)}
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
