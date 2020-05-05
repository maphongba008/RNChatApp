import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Screens from '../../../navigation/Screens';
import auth from '@react-native-firebase/auth';
import i18n from '../../../locale';

export default class extends React.Component {
  componentDidMount = () => {
    console.log('1');
    auth()
      .signInWithEmailAndPassword('admin@gmail.com', '123456')
      .then(user => {
        console.log('success', user);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{i18n.t('login.title')}</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'red' }}
          onPress={() => {
            this.props.navigation.navigate(Screens.SIGN_UP_SCREEN);
          }}>
          <Text>GO TO SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'red' }}
          onPress={() => {
            i18n.changeLanguage('en');
          }}>
          <Text>Change language</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
