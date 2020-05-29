import React from 'react';
import { Text, Container, Header } from '@src/components';
import AppStore from '@src/stores/AppStore';
import { View, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import NavigationService from '@src/navigation/NavigationService';
import Screens from '@src/navigation/Screens';
import ConversationList from './components/List';
import i18n from '@src/locale';
import { observer } from 'mobx-react';
import Conversation from '@src/stores/Conversation';

@observer
export default class extends React.Component {
  _logout = () => {
    auth().signOut();
    NavigationService.navigate(Screens.AUTHENTICATION_STACK);
  };

  componentDidMount = () => {
    AppStore.loadConversations();
  };

  _onPressConversation = (conversation: Conversation) => {
    NavigationService.navigate(Screens.CHAT_SCREEN, { conversation });
  };

  render() {
    console.log('user ', AppStore.user);
    if (!AppStore.user) {
      return null;
    }

    return (
      <Container>
        <Header title={i18n.t('chat.title')} />
        <ConversationList
          currentUserId={AppStore.user.id}
          conversations={AppStore.conversations}
          onPressConversation={this._onPressConversation}
        />
      </Container>
    );
  }
}
