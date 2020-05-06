import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const hasNotch = DeviceInfo.hasNotch();

const isAndroid = Platform.OS === 'android';

const StatusBarHeight = isAndroid ? 0 : hasNotch ? 44 : 20;

export class Container extends React.Component {
  static bottomSpacing = isAndroid ? 0 : hasNotch ? 34 : 0;

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.statusBar]} />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBarHeight,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
