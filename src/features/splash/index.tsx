import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NavigationService from '@src/navigation/NavigationService';
import Screens from '@src/navigation/Screens';
import { User } from '@src/stores/User';
import AppStore from '@src/stores/AppStore';

let lastAuthStateChange = Date.now();

export default class SplashScreen extends React.Component {
  componentDidMount = () => {
    auth().onAuthStateChanged(async user => {
      console.log('onAuthStateChanged', user);
      if (Date.now() - lastAuthStateChange < 100) {
        lastAuthStateChange = Date.now();
        return;
      }
      lastAuthStateChange = Date.now();
      console.log('user', user);
      if (user) {
        // already login
        const document = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const documentData = document.data() as any;
        console.log('documentData', documentData);
        const localUser = new User(
          documentData.id,
          documentData.firstName,
          documentData.lastName,
          documentData.email,
        );
        AppStore.setUser(localUser);
        NavigationService.navigate(Screens.APP_TAB);
      } else {
        // not login
        NavigationService.navigate(Screens.AUTHENTICATION_STACK);
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}
