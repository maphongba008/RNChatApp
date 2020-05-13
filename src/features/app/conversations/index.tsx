import React from 'react';
import { Text } from '@src/components';
import AppStore from '@src/stores/AppStore';

export default class extends React.Component {
  render() {
    console.log('user ', AppStore.user);
    return <Text style={{ marginTop: 100 }}>CONVERSATION SCREEN</Text>;
  }
}
