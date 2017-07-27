import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import { Text, TouchableItem, TouchableNativeFeedback, View } from './';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

const Button = ({ type, buttonLeft, buttonRight, onPress, style, title, block }) => {
  const activeTypeStyle = typeStyles[type || 'default'];
  const blockStyle = block ? styles.block : undefined;

  return (
    <TouchableItem
      onPress={onPress}
      pressColor="white"
      style={[activeTypeStyle.view, blockStyle, styles.touchableWrapper, style]}
      hitSlop={HIT_SLOP}
      useForeground={Platform.select({
        ios: () => false,
        android: TouchableNativeFeedback.canUseNativeForeground,
      })()}
    >
      <View style={[styles.view]}>
        {buttonLeft || null}
        {title !== ''
          ? <Text style={[activeTypeStyle.title, styles.title]}>
              {title}
            </Text>
          : null}
        {buttonRight || null}
      </View>
    </TouchableItem>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary']),
  buttonLeft: PropTypes.node,
  buttonRight: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  title: PropTypes.string,
};

export default Button;

const styles = StyleSheet.create({
  touchableWrapper: {
    margin: 6,
    alignSelf: 'center',
    borderRadius: 2,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 36,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 8,
    transform: [{ translateY: -1 }],
  },
  block: {
    flexGrow: 1,
  },
});

const typeStyles = {
  default: StyleSheet.create({
    view: {
      backgroundColor: '#ccc',
    },
    title: {
      color: '#666',
    },
  }),
  primary: StyleSheet.create({
    view: {
      backgroundColor: Platform.select({ ios: '#006FFF', android: '#2196F3' }),
    },
    title: {
      color: Platform.select({ ios: 'white', android: 'white' }),
    },
  }),
};
