import { observable } from 'mobx';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import NavigationService from '@src/navigation/NavigationService';
import Screens from '@src/navigation/Screens';
import LoadingHud from '@src/navigation/LoadingHud';
import firestore from '@react-native-firebase/firestore';
import { User } from './User';
import AppStore from './AppStore';

export class LoginStore {
  @observable
  email = '';

  @observable
  password = '';

  setEmail = (email: string) => (this.email = email);
  setPassword = (password: string) => (this.password = password);

  login = async () => {
    LoadingHud.show();
    try {
      await auth().signInWithEmailAndPassword(this.email, this.password);
      // const document = await firestore()
      //   .collection('users')
      //   .doc(credential.user.uid)
      //   .get();
      // const documentData = document.data() as any;
      // console.log('documentData', documentData);
      // const user = new User(
      //   documentData.id,
      //   documentData.firstName,
      //   documentData.lastName,
      //   documentData.email,
      // );
      // AppStore.setUser(user);
      // NavigationService.navigate(Screens.CONVERSATION_SCREEN);
    } catch (e) {
      Alert.alert('Login error', e.message);
    }
    LoadingHud.hide();
  };
}
