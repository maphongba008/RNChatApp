import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import i18n from '../../../locale';
export default class extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{i18n.t('signup.title')}</Text>
      </View>
    );
  }
}
