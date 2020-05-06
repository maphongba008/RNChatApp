import React from 'react';
// @ts-ignore
import RNParseText from 'react-native-parsed-text';
import { StyleSheet, TextStyle } from 'react-native';
import colors from '@src/constants/colors';

type ParsedTextProps = {
  onPress?: () => void;
  style?: TextStyle;
};

export class ParsedText extends React.Component<ParsedTextProps> {
  _renderText = (text: string): string => {
    return text.substring(1, text.length - 1);
  };

  render() {
    return (
      <RNParseText
        style={[styles.text, this.props.style]}
        parse={[
          {
            pattern: /\[.*?\]/,
            style: styles.highlightText,
            onPress: this.props.onPress,
            renderText: this._renderText,
          },
        ]}
        childrenProps={{ allowFontScaling: false }}>
        {this.props.children}
      </RNParseText>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.textColor,
    fontSize: 14,
  },
  highlightText: {
    color: colors.accent,
    textDecorationLine: 'underline',
  },
});
