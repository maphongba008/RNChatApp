import { User } from './User';
import LoadingHud from '@src/navigation/LoadingHud';
import ChatServices from '@src/api/ChatServices';
import { observable } from 'mobx';
import { Message } from './Message';
import Conversation from './Conversation';

class AppStore {
  user?: User | null = null;

  @observable
  users: User[] = [];

  @observable
  conversations: Conversation[] = [];

  userAddedSubscriber: (() => void) | null = null;
  conversationAddedSubscriber: (() => void) | null = null;

  messages: Message[] = [];

  setUser = (user: User) => {
    this.user = user;
  };

  loadUsers = async () => {
    // LoadingHud.show();
    // const users = await ChatServices.loadUsers();
    // this.users = users.filter(t => this.user && t.id !== this.user.id);
    // LoadingHud.hide();
    this.listenForUserAdded();
  };

  loadConversations = async () => {
    if (!this.user) {
      return;
    }
    // LoadingHud.show();
    // // @ts-ignore
    // this.conversations = await ChatServices.loadConversations(this.user);
    // LoadingHud.hide();
    this.listenForConversationAdded();
  };

  unsubscribe = () => {
    this.userAddedSubscriber && this.userAddedSubscriber();
    this.conversationAddedSubscriber && this.conversationAddedSubscriber();
  };

  listenForUserAdded = () => {
    this.userAddedSubscriber && this.userAddedSubscriber();
    this.userAddedSubscriber = ChatServices.listenForUserRegistered(users => {
      const id = this.user ? this.user.id : '';
      this.users = [...this.users, ...users.filter(t => t.id !== id)];
    });
  };

  listenForConversationAdded = () => {
    if (!this.user) {
      return;
    }
    this.conversationAddedSubscriber && this.conversationAddedSubscriber();

    this.conversationAddedSubscriber = ChatServices.listenForConversationAdd(
      this.user,
      conversations => {
        this.conversations = [...conversations, ...this.conversations];
      },
    );
  };

  createConversation = async (user: User) => {
    if (!this.user) {
      return;
    }
    const conversationId =
      user.id > this.user.id
        ? this.user.id + '_' + user.id
        : user.id + this.user.id;
    // check if conversationId exist or not
    let conversation = await ChatServices.loadConversation(
      conversationId,
      this.user,
    );
    if (!conversation) {
      // create new
      console.log('create new');
      conversation = await ChatServices.createConversation(this.user, user);
      // go to Chat Detail
    } else {
      console.log('already exist');
      // go to Chat Detail
    }
    return conversation;
  };
}

export default new AppStore();
