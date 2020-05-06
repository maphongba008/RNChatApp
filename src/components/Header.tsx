import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from './TouchableOpacity';
import { Text } from './Text';
import colors from '../constants/colors';

type HeaderProps = {
  leftIcon?: number;
  onPressLeft?: () => void;
  rightIcon?: number;
  onPressRight?: () => void;
  title?: string;
  backgroundColor?: string;
};

export class Header extends React.Component<HeaderProps> {
  render() {
    const {
      leftIcon,
      rightIcon,
      onPressLeft,
      onPressRight,
      title,
      backgroundColor,
    } = this.props;
    return (
      <View style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity
          disabled={!onPressLeft}
          onPress={onPressLeft}
          style={styles.leftButton}>
          {!!leftIcon && <Image source={leftIcon} style={styles.leftIcon} />}
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          disabled={!onPressRight}
          onPress={onPressRight}
          style={styles.rightButton}>
          {!!rightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navigationBarColor,
    height: 50,
  },
  leftButton: {
    width: 60,
    paddingLeft: 16,
  },
  leftIcon: {},
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    color: colors.primary,
    fontWeight: 'bold',
  },
  rightButton: {
    width: 60,
    paddingRight: 16,
  },
  rightIcon: {},
});
