import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export class Text extends React.Component<TextProps> {
  render() {
    return <RNText {...this.props} style={[styles.text, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.textColor,
    fontSize: 14,
  },
});
