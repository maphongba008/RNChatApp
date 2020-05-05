import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Screens from '../../../navigation/Screens';

export default class extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LOGIN</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'red' }}
          onPress={() => {
            this.props.navigation.navigate(Screens.SIGN_UP_SCREEN);
          }}>
          <Text>GO TO SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
