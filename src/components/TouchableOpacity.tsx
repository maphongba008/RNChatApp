import React from 'react';
import {
  TouchableOpacity as Button,
  TouchableOpacityProps,
} from 'react-native';

export class TouchableOpacity extends React.Component<TouchableOpacityProps> {
  render() {
    return <Button {...this.props} activeOpacity={0.7} />;
  }
}
