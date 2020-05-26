import React from 'react';
import { Text, Container, Header } from '@src/components';
import AppStore from '@src/stores/AppStore';
import { View, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import NavigationService from '@src/navigation/NavigationService';
import Screens from '@src/navigation/Screens';
import ConversationList from './components/List';
import i18n from '@src/locale';
import Conversation from '@src/stores/Conversation';
import { User } from '@src/stores/User';

export default class extends React.Component {
  _logout = () => {
    auth().signOut();
    NavigationService.navigate(Screens.AUTHENTICATION_STACK);
  };

  render() {
    console.log('user ', AppStore.user);
    if (!AppStore.user) {
      return null;
    }
    const testData = [
      new Conversation(
        '1',
        '',
        [new User('2', 'A', 'B', 'abc@gmail.com'), AppStore.user],
        'Hello world',
        Date.now() - 2 * 60 * 1000,
        5,
      ),
      new Conversation(
        '2',
        '',
        [new User('2', 'B', 'C', 'abc@gmail.com'), AppStore.user],
        '',
        Date.now(),
        0,
      ),
      new Conversation(
        '3',
        '',
        [new User('2', 'A', 'B', 'abc@gmail.com'), AppStore.user],
        'Hello world',
        Date.now() - 2 * 60 * 1000,
        5,
      ),
    ];

    return (
      <Container>
        <Header title={i18n.t('chat.title')} />
        <ConversationList
          currentUserId={AppStore.user.id}
          conversations={testData}
        />
      </Container>
    );
  }
}
