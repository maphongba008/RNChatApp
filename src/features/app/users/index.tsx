import React from 'react';
import { Text } from '@src/components';
import AppStore from '@src/stores/AppStore';
import { View } from 'react-native';

export default class extends React.Component {
  render() {
    console.log('user ', AppStore.user);
    return (
      <View>
        <Text style={{ marginTop: 100 }}>USERS SCREEN</Text>
      </View>
    );
  }
}
