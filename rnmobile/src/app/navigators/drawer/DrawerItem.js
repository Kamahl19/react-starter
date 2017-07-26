import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import TouchableItem from './TouchableItem';

const ItemContent = ({ label }) =>
  <View style={styles.item}>
    {typeof label === 'string'
      ? <Text style={styles.label}>
          {label}
        </Text>
      : label}
  </View>;

const ClickableItem = ({ onPress, label }) =>
  <TouchableItem onPress={onPress} delayPressIn={0}>
    <ItemContent label={label} />
  </TouchableItem>;

const StaticItem = ({ label }) => <ItemContent label={label} />;

export default ({ onPress, label }) =>
  <View style={styles.container}>
    {onPress && <ClickableItem onPress={onPress} label={label} />}
    {!onPress && <StaticItem label={label} />}
  </View>;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
});
