import React from 'react';
import { Text, Container, Header } from '@src/components';
import AppStore from '@src/stores/AppStore';
import { View } from 'react-native';
import i18n from '@src/locale';
import List from './components/List';
import { observer } from 'mobx-react';
import { User } from '@src/stores/User';
import NavigationService from '@src/navigation/NavigationService';
import Screens from '@src/navigation/Screens';

@observer
export default class extends React.Component {
  componentDidMount = () => {
    AppStore.loadUsers();
  };

  _onPressUser = async (user: User) => {
    const conversation = await AppStore.createConversation(user);
    NavigationService.navigate(Screens.CHAT_SCREEN, { conversation });
  };

  render() {
    console.log('user ', AppStore.user);
    return (
      <Container>
        <Header title={i18n.t('users.title')} />
        <List users={AppStore.users} onPressUser={this._onPressUser} />
      </Container>
    );
  }
}
