import React from 'react';
import { Container, Header } from '@src/components';
import Iconback from '@src/assets/Path.png';
import NavigationService from '@src/navigation/NavigationService';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import ChatServices from '@src/api/ChatServices';
import Conversation from '@src/stores/Conversation';
import AppStore from '@src/stores/AppStore';
import { NavigationScreenProp } from 'react-navigation';

type ChatScreenProps = {
  navigation: NavigationScreenProp<{}>;
};

type ChatScreenState = {
  messages: IMessage[];
};

export default class ChatScreen extends React.Component<
  ChatScreenProps,
  ChatScreenState
> {
  state = {
    messages: [],
  };
  conversation: Conversation = this.props.navigation.getParam('conversation');

  messageSubscriber: (() => void) | null = null;

  componentDidMount() {
    this.messageSubscriber = ChatServices.listenForMessages(
      this.conversation.id,
      message => {
        //
        if (AppStore.user) {
          ChatServices.markMessageAsRead(
            this.conversation.id,
            message.id,
            AppStore.user.id,
          );
        }
        message.setSender(this.conversation.findUser(message.senderId));
        const newState = GiftedChat.append(this.state.messages, [
          message.toGiftedMessage(),
        ]);
        this.setState({ messages: newState });
      },
    );
  }

  _onSend = (messages: IMessage[]) => {
    if (!messages || messages.length === 0 || !AppStore.user) {
      return;
    }
    const message = messages[0];
    ChatServices.sendMessage(
      this.conversation.id,
      AppStore.user.id,
      message.text,
      'TEXT',
      this.conversation.getDefaultUnreads(AppStore.user.id),
    );
  };

  componentWillUnmount = () => {
    this.messageSubscriber && this.messageSubscriber();
  };

  render() {
    if (!AppStore.user) {
      return null;
    }
    return (
      <Container>
        <Header
          leftIcon={Iconback}
          onPressLeft={NavigationService.goBack}
          title="Chat"
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this._onSend(messages)}
          user={{
            _id: AppStore.user.id,
          }}
        />
      </Container>
    );
  }
}
