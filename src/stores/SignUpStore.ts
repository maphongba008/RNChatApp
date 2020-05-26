import { observable } from 'mobx';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import NavigationService from '@src/navigation/NavigationService';
import Screens from '@src/navigation/Screens';
import LoadingHud from '@src/navigation/LoadingHud';
import { User } from './User';
import AppStore from './AppStore';

export class SignUpStore {
  @observable
  firstName = '';

  @observable
  lastName = '';

  @observable
  email = '';

  @observable
  password = '';

  get firstNameError() {
    if (!this.firstName) {
      return 'Invalid first name';
    }
    return null;
  }

  get lastNameError() {
    if (!this.lastName) {
      return 'Invalid last name';
    }
    return null;
  }

  get passwordError() {
    if (!this.password) {
      return 'Invalid password';
    }
    if (this.password.length < 6) {
      return 'Invalid password length';
    }
    return null;
  }

  get emailError() {
    if (!this.email) {
      return 'Invalid email';
    }
    if (!this.email.match(/^.{2,}@.{2,}\..{2,}/g)) {
      return 'Invalid email format';
    }
    return null;
  }

  setEmail = (email: string) => (this.email = email);
  setPassword = (password: string) => (this.password = password);
  setFirstName = (firstName: string) => (this.firstName = firstName);
  setLastName = (lastName: string) => (this.lastName = lastName);

  signUp = async () => {
    // validation
    const error =
      this.firstNameError ||
      this.lastNameError ||
      this.emailError ||
      this.passwordError;
    if (error) {
      Alert.alert('Validation error', error);
      return;
    }
    try {
      LoadingHud.show();
      const credential = await auth().createUserWithEmailAndPassword(
        this.email,
        this.password,
      );
      const firebaseUser = credential.user;
      await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          id: firebaseUser.uid,
        });
      // // update user info to firestore
      // // success
      // const user = new User(
      //   firebaseUser.uid,
      //   this.firstName,
      //   this.lastName,
      //   this.email,
      // );
      // AppStore.setUser(user);
      // NavigationService.navigate(Screens.CONVERSATION_SCREEN);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
    LoadingHud.hide();
  };
}
